"""Doroye - Flask backend: AI camera recognition, drone + robot dashboards, sensor history and Telegram bridge."""
import os, io, re, time, uuid, hmac, sqlite3, random, threading, subprocess, shutil, tempfile, requests
from flask import Flask, request, jsonify, Response
def _load_env():                       # tiny .env reader (no extra package needed)
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    if os.path.exists(p):
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1); os.environ.setdefault(k.strip(), v.strip().strip("\"'"))
_load_env()
import json
BASE = os.path.dirname(os.path.abspath(__file__))
# Active model folder (contains config.json, the model file and labels.txt). Change it with MODEL_DIR in .env
MODEL_DIR = os.path.join(BASE, os.environ.get("MODEL_DIR", "model"))
_cfg_path = os.path.join(MODEL_DIR, "config.json")
CFG = json.load(open(_cfg_path, encoding="utf-8")) if os.path.exists(_cfg_path) else {}
# Teachable Machine .h5 files need legacy Keras 2 (tf-keras); modern .keras files need Keras 3.
os.environ["TF_USE_LEGACY_KERAS"] = "1" if CFG.get("legacy_keras", True) else "0"
os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")
from functools import wraps
import numpy as np
import requests
import tensorflow as tf
from PIL import Image, ImageOps
from flask import Flask, render_template, request, jsonify, session, send_file
from werkzeug.security import generate_password_hash, check_password_hash

UPLOADS = os.path.join(BASE, "static", "uploads")
DB = os.path.join(BASE, "users.db")
ALLOWED = {"png", "jpg", "jpeg", "webp", "bmp", "gif"}

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "change-this-secret-before-deploying")
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024   # 8 MB uploads

# ---------- model (any image-classification model: Keras .h5/.keras or TensorFlow Lite .tflite) ----------
MODEL_FILE = os.path.join(MODEL_DIR, CFG.get("file", "keras_model.h5"))
KIND = CFG.get("type") or ("tflite" if MODEL_FILE.endswith(".tflite") else "keras")
lock = threading.Lock()
if KIND == "tflite":
    try:                                                                   # newer, recommended TFLite runtime (pip install ai-edge-litert)
        from ai_edge_litert.interpreter import Interpreter
    except ImportError:
        Interpreter = tf.lite.Interpreter
    interp = Interpreter(model_path=MODEL_FILE); interp.allocate_tensors()
    IN, OUT = interp.get_input_details()[0], interp.get_output_details()[0]
    shape = list(IN["shape"])
else:
    model = tf.keras.models.load_model(MODEL_FILE, compile=False)
    shape = [1] + list(model.input_shape[1:])
_size = CFG.get("input_size", [224, 224])                                  # [height, width] if the model has no fixed size
dim = lambda v, d: int(v) if v and int(v) > 0 else int(d)
H, W = dim(shape[1], _size[0]), dim(shape[2], _size[1])
C = dim(shape[3] if len(shape) > 3 else 3, 3)

def pretty(s):                                                             # "Tomato___Late_blight" -> "Tomato – Late blight"
    return s.replace("___", " – ").replace("_", " ").strip()
with open(os.path.join(MODEL_DIR, CFG.get("labels_file", "labels.txt")), encoding="utf-8") as f:
    LABELS = [pretty(re.sub(r"^\d+\s+", "", l.strip())) for l in f if l.strip()]

# "good" labels (fresh / healthy ...) are found with a regex; no regex = neutral model (just names + confidence)
GOOD_RE = re.compile(CFG["good_regex"], re.I) if CFG.get("good_regex") else None
is_good = lambda l: None if GOOD_RE is None else bool(GOOD_RE.search(l))
GOODS = [l for l in LABELS if is_good(l) is True]
BADS = [l for l in LABELS if is_good(l) is False]
QUIZ_OK = len(GOODS) >= 2 and len(BADS) >= 1

def scores(img):
    """Picture -> list of probabilities (one per label)."""
    img = ImageOps.fit(img.convert("L" if C == 1 else "RGB"), (W, H), Image.Resampling.LANCZOS)
    a = np.asarray(img, dtype=np.float32)
    if C == 1:
        a = a[..., None]
    mode = CFG.get("normalize", "tm")        # tm: -1..1 | unit: 0..1 | imagenet: mean/std | none: raw 0..255
    if mode == "tm": a = a / 127.5 - 1
    elif mode == "unit": a = a / 255.0
    elif mode == "imagenet": a = (a / 255.0 - np.array([0.485, 0.456, 0.406])) / np.array([0.229, 0.224, 0.225])
    x = a[None].astype(np.float32)
    with lock:
        if KIND == "tflite":
            if IN["dtype"] == np.uint8:
                x = np.asarray(img, dtype=np.uint8).reshape(1, H, W, C)
            interp.set_tensor(IN["index"], x); interp.invoke()
            p = interp.get_tensor(OUT["index"])[0].astype(np.float32)
            sc, zp = OUT["quantization"]
            if OUT["dtype"] == np.uint8 and sc:
                p = (p - zp) * sc
        else:
            p = model.predict(x, verbose=0)[0]
    p = np.asarray(p, dtype=np.float32).ravel()
    if p.size == 1:                                                        # single sigmoid output
        s = float(p[0]); s = s if 0 <= s <= 1 else 1 / (1 + np.exp(-s))
        p = np.array([1 - s, s], dtype=np.float32)
    elif p.min() < 0 or abs(float(p.sum()) - 1) > 0.01:                    # logits -> probabilities
        e = np.exp(p - p.max()); p = e / e.sum()
    return p

def predict_image(src):
    p = scores(Image.open(src))
    top = np.argsort(p)[::-1][:int(CFG.get("top_k", 3))]
    return [{"label": LABELS[i], "confidence": float(p[i]), "good": is_good(LABELS[i])} for i in top]

_n = len(scores(Image.new("RGB", (W, H))))                                  # startup check
if _n != len(LABELS):
    raise RuntimeError(f"The model has {_n} outputs but labels.txt has {len(LABELS)} names. Fix labels.txt (one name per output, same order).")
print(f"[model] {KIND} model loaded: {len(LABELS)} classes, input {W}x{H}x{C}, from {MODEL_DIR}")

# ---------- text shown on the website (comes from config.json) ----------
UI_DEFAULTS = {"app_title": "Doroye", "logo": "🔍", "item_word": "picture", "welcome_sub": "Scan pictures and see what the AI helper finds.",
    "home_text": "Take or choose a picture and let the smart computer helper tell you what it sees!", "library_title": "Library",
    "good_word": "Good", "bad_word": "Problem", "good_icon": "✅", "bad_icon": "⚠️", "good_tip": "", "bad_tip": "",
    "quiz_question": "Which one is a problem?", "default_emoji": "🔹", "emoji": {}, "tips_title": "Tips", "tips": [], "why_title": "", "why_text": "",
    "telegram_good": "✅ Good", "telegram_bad": "⚠️ Problem"}
UI = {k: CFG.get(k, v) for k, v in UI_DEFAULTS.items()}
# Doroye branding (always wins, even if model/config.json still has the old QoraaGrid texts)
UI["app_title"] = os.environ.get("APP_TITLE", "Doroye")
UI["welcome_sub"] = "Smarter Poultry Farming. All in One."
UI["logo"] = "🐔"

# ---------- database ----------
def db():
    c = sqlite3.connect(DB); c.row_factory = sqlite3.Row; return c

with db() as c:
    c.execute("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT UNIQUE, pw TEXT, age INTEGER, stars INTEGER DEFAULT 0)")

def add_stars(uid, n):
    with db() as c:
        c.execute("UPDATE users SET stars=stars+? WHERE id=?", (n, uid))
        return c.execute("SELECT stars FROM users WHERE id=?", (uid,)).fetchone()["stars"]

def login_required(f):
    @wraps(f)
    def w(*a, **k):
        if "uid" not in session:
            return jsonify(error="Please log in first."), 401
        return f(*a, **k)
    return w

# ---------- pages & auth ----------
@app.get("/api/config")
def ui_config():
    return jsonify(**UI, has_good=GOOD_RE is not None, quiz=QUIZ_OK)

@app.route("/")
def index():
    return render_template("index.html")

@app.post("/api/register")
def register():
    d = request.get_json(silent=True) or {}
    name, pw = str(d.get("name", "")).strip(), str(d.get("password", ""))
    if not re.fullmatch(r"[A-Za-z0-9_ ]{2,20}", name) or len(pw) < 4:
        return jsonify(error="Use a name of 2-20 letters/numbers and a password with 4+ characters."), 400
    try:
        age = int(d.get("age") or 0)
    except ValueError:
        age = 0
    try:
        with db() as c:
            cur = c.execute("INSERT INTO users(name,pw,age) VALUES(?,?,?)", (name.lower(), generate_password_hash(pw), age))
    except sqlite3.IntegrityError:
        return jsonify(error="That name is taken. Try another!"), 400
    session["uid"] = cur.lastrowid
    return jsonify(user=name.lower(), stars=0)

@app.post("/api/login")
def login():
    d = request.get_json(silent=True) or {}
    with db() as c:
        u = c.execute("SELECT * FROM users WHERE name=?", (str(d.get("name", "")).strip().lower(),)).fetchone()
    if not u or not check_password_hash(u["pw"], str(d.get("password", ""))):
        return jsonify(error="Name or password is not right."), 400
    session["uid"] = u["id"]
    return jsonify(user=u["name"], stars=u["stars"])

@app.post("/api/logout")
def logout():
    session.clear(); return jsonify(ok=True)

@app.get("/api/me")
@login_required
def me():
    with db() as c:
        u = c.execute("SELECT name,stars FROM users WHERE id=?", (session["uid"],)).fetchone()
    if not u:
        session.clear(); return jsonify(error="Please log in first."), 401
    return jsonify(user=u["name"], stars=u["stars"], labels=LABELS, good={l: is_good(l) for l in LABELS})

# ---------- prediction ----------
@app.post("/predict")
@login_required
def predict():
    f = request.files.get("image")
    ext = (f.filename.rsplit(".", 1)[-1].lower() if f and "." in f.filename else "")
    if not f or ext not in ALLOWED:
        return jsonify(error="Please choose a picture (jpg, png, webp)."), 400
    now = time.time()
    for old in os.listdir(UPLOADS):                      # delete uploads older than 1 hour
        p = os.path.join(UPLOADS, old)
        if old not in KEEP_FILES and now - os.path.getmtime(p) > 3600:
            os.remove(p)
    name = f"{uuid.uuid4().hex}.{ext}"
    path = os.path.join(UPLOADS, name)
    f.save(path)
    try:
        top = predict_image(path)
    except Exception:
        os.remove(path)
        return jsonify(error="I could not read that picture. Try another one."), 400
    earned = top[0]["confidence"] > 0.5
    stars = add_stars(session["uid"], 1) if earned else None
    return jsonify(results=top, image=f"/static/uploads/{name}", earned=earned, stars=stars)

# ---------- quiz ----------
@app.get("/api/quiz")
@login_required
def quiz():
    if not QUIZ_OK:
        return jsonify(error="The quiz is not available for this model."), 404
    bad = random.choice(BADS)
    opts = random.sample(GOODS, 2) + [bad]
    random.shuffle(opts)
    session["quiz"] = bad
    return jsonify(options=opts)

@app.post("/api/quiz/answer")
@login_required
def quiz_answer():
    ans = session.pop("quiz", None)
    choice = (request.get_json(silent=True) or {}).get("choice")
    if not ans:
        return jsonify(error="Start a new question."), 400
    ok = choice == ans
    return jsonify(correct=ok, answer=ans, stars=add_stars(session["uid"], 2) if ok else None)


# ---------- Network cameras (ESP32-CAM, Raspberry Pi) -> recognition -> Telegram ----------
TG_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TG_CHAT = os.environ.get("TELEGRAM_CHAT_ID", "")
ESP_KEY = os.environ.get("ESP_API_KEY", "")
PI_KEY = os.environ.get("PI_API_KEY", "") or ESP_KEY          # Pi can reuse the ESP32 key
NOTIFY_MIN = float(os.environ.get("NOTIFY_MIN_CONFIDENCE", "0.6"))   # ignore unsure guesses
COOLDOWN = int(os.environ.get("NOTIFY_COOLDOWN_SECONDS", "60"))      # same food: message at most once per minute
ONLY_SPOILED = os.environ.get("NOTIFY_ONLY_SPOILED", "0") == "1"
esp_lock = threading.Lock()

SECOND = None      # 2nd camera model (the registry's "Mosquito vs fly" model); loaded further down

def new_state():
    return {"paused": False, "label": None, "confidence": 0, "good": None, "time": 0, "count": 0, "sent_label": None, "sent_time": 0, "top": [], "extra": None, "x_sent_label": None, "x_sent_time": 0}

CAMS = {   # one entry per camera: its own key, picture file and state (pause, last result, ...)
    "esp32": {"name": "ESP32-CAM", "icon": "📷", "key": ESP_KEY, "file": "esp32_latest.jpg", "state": new_state()},
    "pi": {"name": "Raspberry Pi Night Camera", "icon": "🌙", "key": PI_KEY, "file": "pi_latest.jpg", "state": new_state()},
}
KEEP_FILES = (".gitkeep",) + tuple(c["file"] for c in CAMS.values())

def handle_camera(src):
    """Shared by /upload (ESP32) and /upload/pi: raw JPEG body + header X-API-Key."""
    cam, st = CAMS[src], CAMS[src]["state"]
    path = os.path.join(UPLOADS, cam["file"])
    if not cam["key"]:
        return f"Set the API key for {cam['name']} in .env first", 503
    if not hmac.compare_digest(request.headers.get("X-API-Key", ""), cam["key"]):
        return "Unauthorized", 401
    data = request.get_data()
    if not data or "image/jpeg" not in (request.content_type or ""):
        return "Send a JPEG with Content-Type: image/jpeg", 415
    if st["paused"]:                       # recognition switched off from the website
        with open(path, "wb") as f:        # still keep the live picture, but skip the model + Telegram
            f.write(data)
        with esp_lock:
            st["time"] = time.time()
        return jsonify(paused=True)
    try:
        top = predict_image(io.BytesIO(data))
    except Exception:
        return "Invalid image", 400
    best, now = top[0], time.time()
    xtop = None                              # 2nd model (e.g. mosquito vs fly) on the same picture
    if SECOND:
        try:
            xtop = SECOND.predict(Image.open(io.BytesIO(data)))
        except Exception as e:
            print("[second model] error:", e)
    with open(path, "wb") as f:
        f.write(data)
    notify, xnotify, xbest = False, False, (xtop[0] if xtop else None)
    with esp_lock:
        st.update(label=best["label"], confidence=best["confidence"], good=best["good"], time=now, top=top, count=st["count"] + 1)
        wanted = best["confidence"] >= NOTIFY_MIN and (not ONLY_SPOILED or best["good"] is not True)
        if wanted and (best["label"] != st["sent_label"] or now - st["sent_time"] >= COOLDOWN):
            st["sent_label"], st["sent_time"], notify = best["label"], now, True
        if xbest:
            st["extra"] = {"name": SECOND_NAME, "label": xbest["label"], "confidence": xbest["confidence"], "good": xbest["good"], "top": xtop, "word": second_word(xbest["good"])}
            xwanted = xbest["confidence"] >= NOTIFY_MIN and (not ONLY_SPOILED or xbest["good"] is not True)
            if xwanted and (xbest["label"] != st["x_sent_label"] or now - st["x_sent_time"] >= COOLDOWN):
                st["x_sent_label"], st["x_sent_time"], xnotify = xbest["label"], now, True
    if notify:
        status = "" if best["good"] is None else (UI["telegram_good"] if best["good"] else UI["telegram_bad"])
        caption = f"{cam['icon']} {cam['name']}: {best['label']} ({best['confidence']*100:.0f}%)\n{status}\n\nOther guesses: " + ", ".join(f"{x['label']} {x['confidence']*100:.0f}%" for x in top[1:])
        caption = operator_line() + caption + telemetry_line()      # operator name + live drone readings
        threading.Thread(target=send_telegram, args=(data, caption, system["user"]), daemon=True).start()
    if xnotify:
        caption = f"{SECOND_ICON} {cam['name']} – {SECOND_NAME}: {xbest['label']} ({xbest['confidence']*100:.0f}%)\n{second_status(xbest['good'])}\n\nOther guesses: " + ", ".join(f"{x['label']} {x['confidence']*100:.0f}%" for x in xtop[1:])
        caption = operator_line() + caption + telemetry_line()
        threading.Thread(target=send_telegram, args=(data, caption, system["user"]), daemon=True).start()
    return jsonify(label=best["label"], confidence=best["confidence"], good=best["good"], telegram=notify, second=(xbest["label"] if xbest else None), second_telegram=xnotify)

@app.post("/upload")
def upload():                              # ESP32-CAM
    return handle_camera("esp32")

@app.post("/upload/pi")
def upload_pi():                           # Raspberry Pi night camera
    return handle_camera("pi")

@app.post("/api/cam/<src>/pause")
@login_required
def cam_pause(src):
    """Pause / resume automatic recognition for one camera."""
    if src not in CAMS:
        return jsonify(error="Unknown camera."), 404
    paused = bool((request.get_json(silent=True) or {}).get("paused"))
    with esp_lock:
        CAMS[src]["state"]["paused"] = paused
    return jsonify(paused=paused)

@app.get("/api/cam/<src>/latest")
@login_required
def cam_latest(src):
    if src not in CAMS:
        return jsonify(error="Unknown camera."), 404
    with esp_lock:
        d = dict(CAMS[src]["state"])
    d["name"], d["icon"] = CAMS[src]["name"], CAMS[src]["icon"]
    d["age"] = round(time.time() - d["time"]) if d["time"] else None
    d["image"] = f"/static/uploads/{CAMS[src]['file']}?t={int(d['time'])}" if d["time"] else None
    return jsonify(d)

# ---------- Drone / sensor telemetry (ESP32 telemetry board -> dashboard) ----------
import math, csv
from collections import deque
TELE_KEY = os.environ.get("TELEMETRY_API_KEY", "") or ESP_KEY            # reuses ESP_API_KEY if not set
LOG_EVERY = int(os.environ.get("TELEMETRY_LOG_SECONDS", "5"))            # CSV log: one row every N seconds (0 = off)
TELE_LOG = os.path.join(BASE, "telemetry_log.csv")
ONLINE_SECONDS, STALE_SECONDS = 6, 15
# Edit this list to add sensors or change alert limits. warn_/bad_ above or below trigger the colours + alerts.
SENSORS = [
    {"key": "temperature", "label": "Air temperature", "icon": "🌡️", "unit": "°C", "min": -10, "max": 50, "warn_above": 38, "bad_above": 45},
    {"key": "humidity", "label": "Humidity", "icon": "💧", "unit": "%", "min": 0, "max": 100},
    {"key": "pressure", "label": "Air pressure", "icon": "🌀", "unit": "hPa", "min": 950, "max": 1050},
    {"key": "object_temp", "label": "Object temperature", "icon": "🔥", "unit": "°C", "min": -20, "max": 120, "warn_above": 45, "bad_above": 70},
    {"key": "light_level", "label": "Light (OPT101)", "icon": "☀️", "unit": "mV", "min": 0, "max": 3300},
    {"key": "uv_index", "label": "UV index", "icon": "🧴", "unit": "", "min": 0, "max": 12, "warn_above": 6, "bad_above": 8},
    {"key": "air_quality", "label": "Air quality (MQ-135, raw)", "icon": "🌫️", "unit": "", "min": 0, "max": 4095},
    {"key": "soil_moisture", "label": "Soil moisture", "icon": "🌱", "unit": "%", "min": 0, "max": 100, "warn_below": 20},
    {"key": "distance_cm", "label": "Distance below", "icon": "📏", "unit": "cm", "min": 0, "max": 200, "warn_below": 100, "bad_below": 30},
    {"key": "gps_altitude", "label": "GPS altitude", "icon": "⛰️", "unit": "m", "min": 0, "max": 3000},
    {"key": "satellites", "label": "GPS satellites", "icon": "🛰️", "unit": "", "min": 0, "max": 14, "warn_below": 4},
]
ACCEPT = [s["key"] for s in SENSORS] + ["latitude", "longitude"]
tele_lock = threading.Lock()
tele = {"values": {}, "seen": {}, "time": 0, "count": 0, "log_time": 0, "hist": {k: deque(maxlen=120) for k in ACCEPT}}

def level_of(s, v):
    if "bad_above" in s and v >= s["bad_above"]: return "bad"
    if "bad_below" in s and v <= s["bad_below"]: return "bad"
    if "warn_above" in s and v >= s["warn_above"]: return "warn"
    if "warn_below" in s and v <= s["warn_below"]: return "warn"
    return "ok"

@app.post("/api/telemetry")
def telemetry_in():
    """Called by the telemetry ESP32: JSON body with any of the sensor keys + header X-API-Key."""
    if not TELE_KEY:
        return jsonify(error="Set TELEMETRY_API_KEY (or ESP_API_KEY) in .env first"), 503
    if not hmac.compare_digest(request.headers.get("X-API-Key", ""), TELE_KEY):
        return jsonify(error="Unauthorized"), 401
    d = request.get_json(silent=True)
    if not isinstance(d, dict):
        return jsonify(error="Send a JSON object"), 400
    vals = {k: float(d[k]) for k in ACCEPT if isinstance(d.get(k), (int, float)) and not isinstance(d.get(k), bool) and math.isfinite(d[k])}
    if not vals:
        return jsonify(error="No valid sensor values"), 400
    now = time.time()
    with tele_lock:
        for k, v in vals.items():
            tele["values"][k] = v; tele["seen"][k] = now; tele["hist"][k].append(v)
        tele["time"], tele["count"] = now, tele["count"] + 1
        if LOG_EVERY and now - tele["log_time"] >= LOG_EVERY:
            tele["log_time"] = now
            new = not os.path.exists(TELE_LOG)
            with open(TELE_LOG, "a", newline="", encoding="utf-8") as f:
                w = csv.writer(f)
                if new: w.writerow(["time"] + ACCEPT)
                w.writerow([time.strftime("%Y-%m-%d %H:%M:%S")] + [tele["values"].get(k, "") for k in ACCEPT])
    return jsonify(ok=True, stored=len(vals))

@app.get("/api/telemetry/latest")
@login_required
def telemetry_latest():
    now = time.time()
    with tele_lock:
        v, seen, hist, last, count = dict(tele["values"]), dict(tele["seen"]), {k: list(x)[-60:] for k, x in tele["hist"].items()}, tele["time"], tele["count"]
    sensors, alerts = [], []
    for s in SENSORS:
        k = s["key"]; val = v.get(k); age = round(now - seen[k]) if k in seen else None
        lvl = "none" if val is None else ("stale" if age > STALE_SECONDS else level_of(s, val))
        sensors.append({**{x: s[x] for x in ("key", "label", "icon", "unit", "min", "max")}, "value": val, "age": age, "level": lvl, "spark": hist[k]})
        if lvl in ("warn", "bad"):
            alerts.append({"level": lvl, "text": f"{s['icon']} {s['label']}: {val:.1f} {s['unit']}".strip()})
    gps = None
    if "latitude" in v and "longitude" in v and (v["latitude"] or v["longitude"]):
        gps = {"lat": v["latitude"], "lon": v["longitude"], "alt": v.get("gps_altitude"), "sats": v.get("satellites"),
               "link": f"https://www.google.com/maps?q={v['latitude']:.6f},{v['longitude']:.6f}"}
    age = round(now - last) if last else None
    return jsonify(online=bool(last) and now - last <= ONLINE_SECONDS, age=age, count=count, gps=gps, sensors=sensors, alerts=alerts)

@app.get("/api/telemetry/export.csv")
@login_required
def telemetry_export():
    if not os.path.exists(TELE_LOG):
        return "No telemetry logged yet.", 404
    return send_file(TELE_LOG, mimetype="text/csv", as_attachment=True, download_name="drone_telemetry.csv")

def telemetry_line():
    """Short drone summary added to Telegram alerts while telemetry is live."""
    with tele_lock:
        if time.time() - tele["time"] > 10:
            return ""
        v = dict(tele["values"])
    bits = []
    if "latitude" in v and "longitude" in v and (v["latitude"] or v["longitude"]):
        bits.append(f"📍 https://maps.google.com/?q={v['latitude']:.6f},{v['longitude']:.6f}")
    for k, fmt in (("temperature", "🌡️ {:.1f}°C"), ("humidity", "💧 {:.0f}%"), ("object_temp", "🔥 {:.1f}°C"), ("distance_cm", "📏 {:.0f} cm")):
        if k in v: bits.append(fmt.format(v[k]))
    return "\n\n🛰️ Drone: " + "  ".join(bits) if bits else ""

# ---------- ESP8266 sensor station (any numeric readings -> 📟 ESP8266 page) ----------
S8_KEY = os.environ.get("ESP8266_API_KEY", "") or ESP_KEY                 # reuses ESP_API_KEY if not set
S8_OFFLINE = int(os.environ.get("ESP8266_OFFLINE_SECONDS", "20"))         # no data for this long = offline
# Known readings get nice names, icons and alert limits. Any OTHER numeric key the board sends still appears automatically.
S8_KNOWN = {
    "temperature": {"label": "Temperature", "icon": "🌡️", "unit": "°C", "min": -10, "max": 50, "warn_above": 38, "bad_above": 45},
    "humidity": {"label": "Humidity", "icon": "💧", "unit": "%", "min": 0, "max": 100},
    "pressure": {"label": "Air pressure", "icon": "🌀", "unit": "hPa", "min": 950, "max": 1050},
    "light": {"label": "Light", "icon": "☀️", "unit": "", "min": 0, "max": 1024},
    "soil_moisture": {"label": "Soil moisture", "icon": "🌱", "unit": "%", "min": 0, "max": 100, "warn_below": 20},
    "gas": {"label": "Gas / air quality", "icon": "🌫️", "unit": "", "min": 0, "max": 1024},
    "uv_index": {"label": "UV index", "icon": "🧴", "unit": "", "min": 0, "max": 12, "warn_above": 6, "bad_above": 8},
    "distance_cm": {"label": "Distance", "icon": "📏", "unit": "cm", "min": 0, "max": 400},
    "voltage": {"label": "Voltage", "icon": "🔋", "unit": "V", "min": 0, "max": 5},
    "analog": {"label": "Analog input (A0)", "icon": "📈", "unit": "", "min": 0, "max": 1024},
    "rssi": {"label": "Wi-Fi signal", "icon": "📶", "unit": "dBm", "min": -100, "max": -30, "warn_below": -80, "bad_below": -90},
    "uptime_s": {"label": "Uptime", "icon": "⏱️", "unit": "s", "min": 0, "max": 86400},
    # ---- Arduino Mega readings + MQ-135 gases (paste these lines INSIDE the S8_KNOWN = { ... } dictionary in app.py, before its closing brace) ----
    "co2_ppm": {"label": "CO₂ estimate (MQ-135)", "icon": "🌫️", "unit": "ppm", "min": 400, "max": 2000, "warn_above": 1000, "bad_above": 1500},
    "nh3_ppm": {"label": "Ammonia NH₃ (MQ-135)", "icon": "🌫️", "unit": "ppm", "min": 0, "max": 100, "warn_above": 25, "bad_above": 50},
    "co_ppm": {"label": "Carbon monoxide CO (MQ-135)", "icon": "🌫️", "unit": "ppm", "min": 0, "max": 100},
    "alcohol_ppm": {"label": "Alcohol / benzene (MQ-135)", "icon": "🌫️", "unit": "ppm", "min": 0, "max": 200},
    "toluene_ppm": {"label": "Toluene (MQ-135)", "icon": "🌫️", "unit": "ppm", "min": 0, "max": 200},
    "acetone_ppm": {"label": "Acetone (MQ-135)", "icon": "🌫️", "unit": "ppm", "min": 0, "max": 200},
    "mq_ratio": {"label": "Air purity Rs/R0 (MQ-135)", "icon": "🌫️", "unit": "", "min": 0, "max": 4, "warn_below": 2, "bad_below": 1},
    "tds_ppm": {"label": "Water TDS", "icon": "💧", "unit": "ppm", "min": 0, "max": 1000, "warn_above": 500, "bad_above": 900},
    "flame": {"label": "Flame detected (1 = yes)", "icon": "🔥", "unit": "", "min": 0, "max": 1, "bad_above": 1},
    "flame_raw": {"label": "Flame sensor (raw)", "icon": "🔥", "unit": "", "min": 0, "max": 1023},
    "pump": {"label": "Water pump (1 = on)", "icon": "💧", "unit": "", "min": 0, "max": 1},
    "flame_intensity": {"label": "Flame intensity", "icon": "🔥", "unit": "%", "min": 0, "max": 100},
    # ---- robot Uno: MAX30100 + temperature sensor (shown on the Robot page) ----
    "robot_temp": {"label": "Robot temperature", "icon": "🌡️", "unit": "°C", "min": 0, "max": 60, "warn_above": 40, "bad_above": 50},
    "robot_heart_rate": {"label": "Robot heart rate", "icon": "❤️", "unit": "BPM", "min": 40, "max": 180},
    "robot_spo2": {"label": "Robot blood oxygen SpO₂", "icon": "🩸", "unit": "%", "min": 80, "max": 100, "warn_below": 94, "bad_below": 90},
}
s8_lock = threading.Lock()
s8 = {"values": {}, "seen": {}, "hist": {}, "time": 0, "count": 0, "device": "", "log_time": 0}

@app.post("/api/esp8266")
def esp8266_in():
    """Called by the ESP8266: JSON like {"temperature":24.5,"humidity":60} + header X-API-Key. Any number of numeric keys (max 24)."""
    if not S8_KEY:
        return jsonify(error="Set ESP8266_API_KEY (or ESP_API_KEY) in .env first"), 503
    if not hmac.compare_digest(request.headers.get("X-API-Key", ""), S8_KEY):
        return jsonify(error="Unauthorized"), 401
    d = request.get_json(silent=True)
    if not isinstance(d, dict):
        return jsonify(error="Send a JSON object"), 400
    vals = {}
    for k, v in d.items():
        k = str(k).strip().lower()
        if re.fullmatch(r"[a-z][a-z0-9_]{0,23}", k) and isinstance(v, (int, float)) and not isinstance(v, bool) and math.isfinite(v):
            vals[k] = float(v)
    if not vals:
        return jsonify(error="No valid numeric readings. Use keys like temperature, humidity (letters, numbers, _)."), 400
    now = time.time()
    with s8_lock:
        if len(set(s8["values"]) | set(vals)) > 24:
            return jsonify(error="Too many different readings (max 24)."), 400
        for k, v in vals.items():
            s8["values"][k] = v; s8["seen"][k] = now; s8["hist"].setdefault(k, deque(maxlen=120)).append(v)
        s8["time"], s8["count"] = now, s8["count"] + 1
        if isinstance(d.get("device"), str):
            s8["device"] = re.sub(r"[^\w .-]", "", d["device"])[:30]
        dev = s8["device"]
    history_log("drone", vals, dev, now)          # CSV history (date, time, operator, readings)
    return jsonify(ok=True, stored=len(vals))

@app.get("/api/esp8266/latest")
@login_required
def esp8266_latest():
    now = time.time()
    with s8_lock:
        v, seen, hist = dict(s8["values"]), dict(s8["seen"]), {k: list(x)[-60:] for k, x in s8["hist"].items()}
        last, count, device = s8["time"], s8["count"], s8["device"]
    order = list(S8_KNOWN)
    sensors, alerts = [], []
    for k in sorted(v, key=lambda x: (order.index(x) if x in order else 99, x)):
        m = S8_KNOWN.get(k) or {"label": k.replace("_", " ").capitalize(), "icon": "📟", "unit": ""}
        lo, hi = m.get("min"), m.get("max")
        if lo is None:                                           # unknown reading: scale the bar to what has been seen
            lo, hi = min(hist[k]), max(hist[k])
            if lo == hi: lo, hi = lo - 1, hi + 1
        age = round(now - seen[k])
        lvl = "stale" if age > S8_OFFLINE else level_of(m, v[k])
        sensors.append({"key": k, "label": m["label"], "icon": m["icon"], "unit": m["unit"], "min": lo, "max": hi, "value": v[k], "age": age, "level": lvl, "spark": hist[k]})
        if lvl in ("warn", "bad"):
            alerts.append({"level": lvl, "text": f"{m['icon']} {m['label']}: {v[k]:.1f} {m['unit']}".strip()})
    return jsonify(online=bool(last) and now - last <= S8_OFFLINE, age=round(now - last) if last else None, count=count, device=device, sensors=sensors, alerts=alerts)

# ---------- Raspberry Pi sensor station (any numeric readings -> Environment page) ----------
PS_KEY = os.environ.get("PI_SENSOR_API_KEY", "") or PI_KEY                 # reuses PI_API_KEY / ESP_API_KEY if not set
ps_lock = threading.Lock()
ps = {"values": {}, "seen": {}, "hist": {}, "time": 0, "count": 0, "device": ""}

@app.post("/api/pi/sensors")
def pi_sensors_in():
    """Called by the Raspberry Pi: JSON like {"temperature":24.5,"humidity":60,"device":"pi-garden"} + header X-API-Key. Max 24 readings."""
    if not PS_KEY:
        return jsonify(error="Set PI_SENSOR_API_KEY (or PI_API_KEY / ESP_API_KEY) in .env first"), 503
    if not hmac.compare_digest(request.headers.get("X-API-Key", ""), PS_KEY):
        return jsonify(error="Unauthorized"), 401
    d = request.get_json(silent=True)
    if not isinstance(d, dict):
        return jsonify(error="Send a JSON object"), 400
    vals = {}
    for k, v in d.items():
        k = str(k).strip().lower()
        if re.fullmatch(r"[a-z][a-z0-9_]{0,23}", k) and isinstance(v, (int, float)) and not isinstance(v, bool) and math.isfinite(v):
            vals[k] = float(v)
    if not vals:
        return jsonify(error="No valid numeric readings. Use keys like temperature, humidity (letters, numbers, _)."), 400
    now = time.time()
    with ps_lock:
        if len(set(ps["values"]) | set(vals)) > 24:
            return jsonify(error="Too many different readings (max 24)."), 400
        for k, v in vals.items():
            ps["values"][k] = v; ps["seen"][k] = now; ps["hist"].setdefault(k, deque(maxlen=120)).append(v)
        ps["time"], ps["count"] = now, ps["count"] + 1
        if isinstance(d.get("device"), str):
            ps["device"] = re.sub(r"[^\w .-]", "", d["device"])[:30]
        dev = ps["device"]
    history_log("robot", vals, dev, now)          # CSV history (date, time, operator, readings)
    return jsonify(ok=True, stored=len(vals))

@app.get("/api/pi/sensors/latest")
@login_required
def pi_sensors_latest():
    now = time.time()
    with ps_lock:
        v, seen, hist = dict(ps["values"]), dict(ps["seen"]), {k: list(x)[-60:] for k, x in ps["hist"].items()}
        last, count, device = ps["time"], ps["count"], ps["device"]
    order = list(S8_KNOWN)
    sensors, alerts = [], []
    for k in sorted(v, key=lambda x: (order.index(x) if x in order else 99, x)):
        m = S8_KNOWN.get(k) or {"label": k.replace("_", " ").capitalize(), "icon": "📟", "unit": ""}
        lo, hi = m.get("min"), m.get("max")
        if lo is None:
            lo, hi = min(hist[k]), max(hist[k])
            if lo == hi: lo, hi = lo - 1, hi + 1
        age = round(now - seen[k])
        lvl = "stale" if age > S8_OFFLINE else level_of(m, v[k])
        sensors.append({"key": k, "label": m["label"], "icon": m["icon"], "unit": m["unit"], "min": lo, "max": hi, "value": v[k], "age": age, "level": lvl, "spark": hist[k]})
        if lvl in ("warn", "bad"):
            alerts.append({"level": lvl, "text": f"{m['icon']} {m['label']}: {v[k]:.1f} {m['unit']}".strip()})
    return jsonify(online=bool(last) and now - last <= S8_OFFLINE, age=round(now - last) if last else None, count=count, device=device, sensors=sensors, alerts=alerts)

# ======================= Doroye: Telegram bridge, system activation, AI Lab =======================
from collections import OrderedDict
from ai_models import REGISTRY, CATEGORIES, REG_BY_ID, get_classifier, is_installed, Classifier

# ---- 2nd camera model: runs on every ESP32 / Pi picture next to the default model and posts its own Telegram alerts ----
# Default = the "Mosquito vs fly" model in models/mosquito_vs_fly/. Use SECOND_MODEL in .env for another models/ folder (empty = off).
SECOND_DIR = os.environ.get("SECOND_MODEL", "aedes_types")
SECOND_CFG = {}
if SECOND_DIR and is_installed(SECOND_DIR):
    try:
        SECOND = Classifier(SECOND_DIR); SECOND_CFG = SECOND.cfg
        print(f"[second model] models/{SECOND_DIR} loaded: {len(SECOND.labels)} classes")
    except Exception as e:
        print(f"[second model] NOT loaded (models/{SECOND_DIR}): {e}")
elif SECOND_DIR:
    print(f"[second model] models/{SECOND_DIR}/ is not installed (needs keras_model.h5 + labels.txt) - skipped")
SECOND_NAME = SECOND_CFG.get("name") or next((m["name"] for m in REGISTRY if m["dir"] == SECOND_DIR), SECOND_DIR)
SECOND_ICON = SECOND_CFG.get("icon", "🦟")
def second_word(good):                   # text shown next to the result on the website (optional keys in that folder's config.json)
    c = SECOND_CFG
    return f"{c.get('good_word', 'Harmless')} {c.get('good_icon', '✅')}" if good else f"{c.get('bad_word', 'Alert')} {c.get('bad_icon', '🚨')}"
def second_status(good):                 # line added to the Telegram message
    c = SECOND_CFG
    bad = "🦟 MOSQUITO ALERT – check the camera now!" if SECOND_DIR in ("mosquito_vs_fly", "aedes_types") else "🚨 ALERT – check the camera now!"
    return c.get("telegram_good", "✅ Nothing dangerous detected") if good else c.get("telegram_bad", bad)
with db() as c:
    c.execute("CREATE TABLE IF NOT EXISTS tg_messages(id INTEGER PRIMARY KEY, upd INTEGER UNIQUE, who TEXT, text TEXT, targets TEXT, ts INTEGER)")
    c.execute("CREATE TABLE IF NOT EXISTS tg_sent(msg_id INTEGER PRIMARY KEY, user TEXT)")
    try: c.execute("ALTER TABLE users ADD COLUMN inbox_seen INTEGER DEFAULT 0")
    except sqlite3.OperationalError: pass

mention = lambda n: "@" + n.replace(" ", "_")                     # how professionals tag a user in Telegram
def my_name():
    with db() as c:
        r = c.execute("SELECT name FROM users WHERE id=?", (session["uid"],)).fetchone()
    return r["name"] if r else None

def send_telegram(photo_bytes, caption, user=None):
    """Send a photo (or text if no photo) to the Telegram group. Remembers the message so replies reach `user`."""
    if not TG_TOKEN or not TG_CHAT:
        print("[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set - skipping"); return None
    try:
        base = f"https://api.telegram.org/bot{TG_TOKEN}/"
        if photo_bytes:
            r = requests.post(base + "sendPhoto", data={"chat_id": TG_CHAT, "caption": caption[:1000]}, files={"photo": ("doroye.jpg", photo_bytes, "image/jpeg")}, timeout=20)
        else:
            r = requests.post(base + "sendMessage", data={"chat_id": TG_CHAT, "text": caption[:4000]}, timeout=20)
        if not r.ok:
            print("[telegram] error:", r.status_code, r.text[:200]); return None
        mid = r.json().get("result", {}).get("message_id")
        if mid and user:
            with db() as c: c.execute("INSERT OR REPLACE INTO tg_sent VALUES(?,?)", (mid, user))
        return mid
    except (requests.RequestException, ValueError) as e:
        print("[telegram] failed:", e); return None

def tg_store(m):
    """Save a message from the Telegram group; link it to users by reply or by @mention."""
    text = m.get("text") or m.get("caption") or ""
    if not text or (m.get("from") or {}).get("is_bot") or str((m.get("chat") or {}).get("id")) != str(TG_CHAT):
        return
    low, targets, rid = text.lower(), set(), (m.get("reply_to_message") or {}).get("message_id")
    f = m.get("from") or {}
    who = (f.get("first_name", "") + (f" (@{f['username']})" if f.get("username") else "")).strip() or "Professional"
    with db() as c:
        if rid:
            r = c.execute("SELECT user FROM tg_sent WHERE msg_id=?", (rid,)).fetchone()
            if r: targets.add(r["user"])
        for u in c.execute("SELECT name FROM users").fetchall():
            if re.search(re.escape(mention(u["name"]).lower()) + r"(?!\w)", low): targets.add(u["name"])
        c.execute("INSERT OR IGNORE INTO tg_messages(upd,who,text,targets,ts) VALUES(?,?,?,?,?)",
                  (m["message_id"], who, text[:2000], "|" + "|".join(sorted(targets)) + "|" if targets else "", int(time.time())))

def tg_poll():
    offset = 0
    while True:
        try:
            r = requests.get(f"https://api.telegram.org/bot{TG_TOKEN}/getUpdates", params={"offset": offset, "timeout": 25, "allowed_updates": '["message"]'}, timeout=35).json()
            for u in r.get("result", []):
                offset = u["update_id"] + 1
                if u.get("message"): tg_store(u["message"])
            if not r.get("ok"): time.sleep(10)
        except Exception as e:
            print("[telegram] polling error:", e); time.sleep(8)

if TG_TOKEN and os.environ.get("TELEGRAM_POLL", "1") == "1":
    threading.Thread(target=tg_poll, daemon=True).start()

# ---- system activation: while ON, every Telegram message names the operator ----
system = {"on": False, "user": None, "since": 0}
operator_line = lambda: f"👤 Operator: {mention(system['user'])}\n" if system["on"] and system["user"] else ""

@app.get("/api/system")
@login_required
def system_state():
    return jsonify(**system, telegram=bool(TG_TOKEN and TG_CHAT), handle=mention(my_name() or ""))

@app.post("/api/system/activate")
@login_required
def system_activate():
    on, name = bool((request.get_json(silent=True) or {}).get("on")), my_name()
    system.update(on=on, user=name if on else None, since=int(time.time()))
    send_telegram(None, (f"🟢 Doroye ACTIVATED by {mention(name)}\nAI results and sensor alerts will be posted here with this operator's name.\n🩺 Professionals: reply to a message or mention {mention(name)} to respond."
                         if on else f"⚪ Doroye deactivated by {mention(name)}"), name)
    return jsonify(**system)

# ---- Telegram inbox (professionals' replies shown on the Doctors page) ----
def _msgs(rows):
    return [{"id": r["id"], "who": r["who"], "text": r["text"], "ts": r["ts"], "mine": bool(r["targets"])} for r in rows]

@app.get("/api/inbox")
@login_required
def inbox():
    name = my_name()
    with db() as c:
        mine = c.execute("SELECT * FROM tg_messages WHERE targets LIKE ? ORDER BY id DESC LIMIT 50", (f"%|{name}|%",)).fetchall()
        grp = c.execute("SELECT * FROM tg_messages ORDER BY id DESC LIMIT 25").fetchall()
        seen = c.execute("SELECT inbox_seen FROM users WHERE id=?", (session["uid"],)).fetchone()["inbox_seen"] or 0
    return jsonify(mine=_msgs(mine), group=_msgs(grp), unread=sum(1 for r in mine if r["id"] > seen), handle=mention(name), bot=bool(TG_TOKEN and TG_CHAT), polling=bool(TG_TOKEN and os.environ.get("TELEGRAM_POLL", "1") == "1"))

@app.get("/api/inbox/unread")
@login_required
def inbox_unread():
    with db() as c:
        u = c.execute("SELECT name, inbox_seen FROM users WHERE id=?", (session["uid"],)).fetchone()
        n = c.execute("SELECT COUNT(*) n FROM tg_messages WHERE targets LIKE ? AND id > ?", (f"%|{u['name']}|%", u["inbox_seen"] or 0)).fetchone()["n"]
    return jsonify(unread=n)

@app.post("/api/inbox/seen")
@login_required
def inbox_seen():
    with db() as c:
        c.execute("UPDATE users SET inbox_seen=(SELECT COALESCE(MAX(id),0) FROM tg_messages) WHERE id=?", (session["uid"],))
    return jsonify(ok=True)

@app.post("/api/tg/send")
@login_required
def tg_send_case():
    text, name = str((request.get_json(silent=True) or {}).get("text", "")).strip()[:800], my_name()
    if not text: return jsonify(error="Write a message first."), 400
    if not (TG_TOKEN and TG_CHAT): return jsonify(error="Telegram is not set up in .env."), 503
    ok = send_telegram(None, f"💬 Case from {mention(name)} (Doroye)\n\n{text}\n\n🩺 Professionals: reply to this message or mention {mention(name)}.{telemetry_line()}", name)
    return jsonify(ok=True) if ok else (jsonify(error="Telegram did not accept the message."), 502)

# ---- AI Lab: choose one of 24 models, upload an image/frame, optionally send the result to Telegram ----
RESULTS = OrderedDict()

@app.get("/api/ai/models")
@login_required
def ai_models_list():
    return jsonify(categories=[{"id": cid, "name": n, "icon": ic, "models": [{"id": m["id"], "name": m["name"], "installed": is_installed(m["dir"])} for m in REGISTRY if m["cat"] == cid]} for cid, n, ic in CATEGORIES])

@app.post("/api/recognize")
@login_required
def recognize():
    entry, f = REG_BY_ID.get(request.form.get("model", "")), request.files.get("image")
    if not entry: return jsonify(error="Choose a model first."), 400
    ext = f.filename.rsplit(".", 1)[-1].lower() if f and "." in f.filename else ""
    if ext not in ALLOWED: return jsonify(error="Please upload a picture (jpg, png, webp) or a video."), 400
    if not is_installed(entry["dir"]): return jsonify(error=f"Model '{entry['name']}' is not installed yet. Put keras_model.h5 and labels.txt in models/{entry['dir']}/"), 409
    now = time.time()
    for old in os.listdir(UPLOADS):
        p = os.path.join(UPLOADS, old)
        if old not in KEEP_FILES and now - os.path.getmtime(p) > 3600: os.remove(p)
    name = f"{uuid.uuid4().hex}.{ext}"; path = os.path.join(UPLOADS, name); f.save(path)
    try:
        res = get_classifier(entry["dir"]).predict(Image.open(path))
    except Exception as e:
        os.remove(path); print("[ai] error:", e); return jsonify(error="The model could not read this picture or failed to load."), 400
    rid = uuid.uuid4().hex[:12]
    RESULTS[rid] = {"model": entry["name"], "results": res, "path": path, "user": my_name()}
    while len(RESULTS) > 200: RESULTS.popitem(last=False)
    return jsonify(id=rid, model=entry["name"], results=res, image=f"/static/uploads/{name}")

@app.post("/api/recognize/send")
@login_required
def recognize_send():
    r = RESULTS.get(str((request.get_json(silent=True) or {}).get("id", "")))
    if not r: return jsonify(error="Result expired. Analyse again."), 404
    if not (TG_TOKEN and TG_CHAT): return jsonify(error="Telegram is not set up in .env."), 503
    name, t = my_name(), r["results"][0]
    cap = (f"🔬 Doroye – recognition\n👤 Sent by: {mention(name)}\n🧠 Model: {r['model']}\n🎯 Result: {t['label']} ({t['confidence']*100:.0f}%)\n"
           + "Other: " + ", ".join(f"{x['label']} {x['confidence']*100:.0f}%" for x in r["results"][1:]) + f"\n\n🩺 Professionals: reply to this message or mention {mention(name)} to confirm or advise.{telemetry_line()}")
    with open(r["path"], "rb") as fh: ok = send_telegram(fh.read(), cap, name)
    return jsonify(ok=True) if ok else (jsonify(error="Telegram did not accept the message."), 502)

# ---------- Robot controller (proxy to the Pi robot agent) ----------
ROBOT_URL = os.environ.get("ROBOT_URL", "").rstrip("/")
ROBOT_KEY = os.environ.get("ROBOT_API_KEY", "") or PI_KEY
ROBOT_CMDS = {"F", "B", "L", "R", "S", "A", "M"}
rsess = requests.Session()

def robot_call(method, path, **kw):
    if not ROBOT_URL:
        return jsonify(error="Set ROBOT_URL in .env first"), 503
    try:
        r = rsess.request(method, ROBOT_URL + path, headers={"X-API-Key": ROBOT_KEY}, timeout=1.5, **kw)
    except requests.RequestException:
        return jsonify(error="Robot is not reachable."), 502
    try:
        return jsonify(r.json()), r.status_code
    except ValueError:                                   # the Pi answered, but not with JSON (e.g. 404 page from an old script)
        hint = " Copy the new pi_night_camera.py to the Pi and restart nightcam.service." if r.status_code == 404 else ""
        return jsonify(error=f"Robot replied with an unexpected answer (HTTP {r.status_code}).{hint}"), 502

@app.post("/api/robot/cmd")
@login_required
def robot_cmd():
    c = str((request.get_json(silent=True) or {}).get("cmd", "")).upper()
    if c not in ROBOT_CMDS:
        return jsonify(error="Bad command"), 400
    return robot_call("POST", "/cmd", json={"cmd": c})

@app.get("/api/robot/status")
@login_required
def robot_status():
    return robot_call("GET", "/status")

# ---------- Mapping mode: the operator enters steps (direction + cm), the Pi drives the path ----------
DIRN = {"F": "Forward", "B": "Backward", "L": "Left", "R": "Right"}
PATH_MAX_STEPS, PATH_MAX_CM = 30, 500

def clean_steps(raw):
    if not isinstance(raw, list) or not 1 <= len(raw) <= PATH_MAX_STEPS:
        return None, f"Add 1 to {PATH_MAX_STEPS} steps."
    out = []
    for st in raw:
        try:
            d, cm = str(st.get("dir", "")).upper(), float(st.get("cm"))
        except (AttributeError, TypeError, ValueError):
            return None, "Each step needs a direction and a distance in cm."
        if d not in DIRN or not math.isfinite(cm) or not 1 <= cm <= PATH_MAX_CM:
            return None, f"Each step needs a direction and 1 to {PATH_MAX_CM} cm."
        out.append({"dir": d, "cm": round(cm, 1)})
    return out, None

@app.post("/api/robot/path/run")
@login_required
def robot_path_run():
    steps, err = clean_steps((request.get_json(silent=True) or {}).get("steps"))
    if err:
        return jsonify(error=err), 400
    resp, code = robot_call("POST", "/path/run", json={"steps": steps})
    if code == 200:
        name = my_name() or "operator"
        txt = f"🗺️ Doroye robot: mapped path started by {mention(name)}\n" + " → ".join(f"{DIRN[x['dir']]} {x['cm']:g} cm" for x in steps)
        threading.Thread(target=send_telegram, args=(None, txt, name), daemon=True).start()
    return resp, code

@app.post("/api/robot/path/stop")
@login_required
def robot_path_stop():
    return robot_call("POST", "/path/stop", json={})

@app.get("/api/robot/path/status")
@login_required
def robot_path_status():
    return robot_call("GET", "/path/status")

from flask import Response

@app.get("/api/robot/video")
@login_required
def robot_video():
    """Live camera stream, proxied from the Pi so the API key stays on the server."""
    if not ROBOT_URL:
        return "Set ROBOT_URL in .env first", 503
    try:
        r = requests.get(ROBOT_URL + "/video", headers={"X-API-Key": ROBOT_KEY}, stream=True, timeout=(3, 10))
    except requests.RequestException:
        return "Robot camera is not reachable.", 502
    if not r.ok:
        r.close()
        return "Robot camera error.", 502
    def gen():
        try:
            for chunk in r.iter_content(chunk_size=4096):
                if chunk:
                    yield chunk
        finally:
            r.close()
    return Response(gen(), mimetype=r.headers.get("Content-Type", "multipart/x-mixed-replace; boundary=frame"))

@app.post("/api/robot/record/start")
@login_required
def robot_record_start():
    if not ROBOT_URL:
        return jsonify(error="Set ROBOT_URL in .env first"), 503
    try:
        r = requests.post(ROBOT_URL + "/record/start", headers={"X-API-Key": ROBOT_KEY}, timeout=10)
        return jsonify(r.json()), r.status_code
    except Exception:
        return jsonify(error="Robot is not reachable"), 502

@app.post("/api/robot/record/stop")
@login_required
def robot_record_stop():
    if not ROBOT_URL:
        return jsonify(error="Set ROBOT_URL in .env first"), 503
    if not (TG_TOKEN and TG_CHAT):
        return jsonify(error="Telegram is not set up in .env."), 503
    try:
        r = requests.post(ROBOT_URL + "/record/stop", headers={"X-API-Key": ROBOT_KEY}, timeout=(3, 180))
    except Exception:
        return jsonify(error="Robot is not reachable"), 502
    if r.status_code != 200:
        try: return jsonify(r.json()), r.status_code
        except Exception: return jsonify(error="Recording failed"), 502
    video = r.content
    if len(video) > 49 * 1024 * 1024:                      # Telegram bots allow max 50 MB
        return jsonify(error="Video is too big for Telegram"), 413
    try:
        t = requests.post(
            f"https://api.telegram.org/bot{TG_TOKEN}/sendVideo",
            data={"chat_id": TG_CHAT, "caption": f"🎥 Doroye robot recording\n👤 {mention(my_name() or 'operator')}", "supports_streaming": "true"},
            files={"video": ("robot.mp4", video, "video/mp4")}, timeout=120)
        if not t.ok:
            print("[telegram] video error:", t.status_code, t.text[:200])
            return jsonify(error="Telegram error: " + t.text[:150]), 502
    except requests.RequestException as e:
        print("[telegram] video failed:", e)
        return jsonify(error="Could not reach Telegram"), 502
    return jsonify(ok=True, size=len(video))

STREAM_KEY = os.environ.get("STREAM_KEY", "")

@app.get("/api/robot/stream-url")
@login_required
def robot_stream_url():
    if not ROBOT_URL or not STREAM_KEY:
        return jsonify(error="Set ROBOT_URL and STREAM_KEY in .env first"), 503
    return jsonify(url=f"{ROBOT_URL}/video?key={STREAM_KEY}")

# ---------- Pump, detection switches and servo (commands travel Flask -> Pi -> sensor Mega) ----------
# PASTE THIS ABOVE `if __name__ == "__main__":` in app.py, after the Robot controller block (it uses robot_call from there). Then restart Flask.
PUMP_CMDS = {"SOIL ON", "SOIL OFF", "FLAME ON", "FLAME OFF", "PUMP AUTO", "PUMP MANUAL", "PUMP ON", "PUMP OFF", "SERVO UP", "SERVO DOWN", "SERVO2 UP", "SERVO2 DOWN"}

@app.post("/api/pump/cmd")
@login_required
def pump_cmd():
    c = " ".join(str((request.get_json(silent=True) or {}).get("cmd", "")).upper().split())
    if c not in PUMP_CMDS:
        return jsonify(error="Bad command"), 400
    return robot_call("POST", "/mega/cmd", json={"cmd": c})

@app.get("/api/pump/status")
@login_required
def pump_status():
    return robot_call("GET", "/mega/status")

# ---------------- ESP32-CAM live video + recording ----------------
ESP32_STREAM_URL = os.environ.get("ESP32_STREAM_URL", "")
ESP_MAX_REC = 120   # seconds

class Esp32Hub:
    """One connection to the ESP32 stream, shared by all viewers and the recorder."""
    def __init__(self):
        self.cond = threading.Condition()
        self.lock = threading.Lock()
        self.frame, self.seq, self.users, self.running = None, 0, 0, False

    def acquire(self):
        with self.lock:
            self.users += 1
            if not self.running:
                self.running = True
                threading.Thread(target=self._run, daemon=True).start()

    def release(self):
        with self.lock:
            self.users = max(0, self.users - 1)

    def _run(self):
        while True:
            with self.lock:
                if self.users <= 0:
                    self.running = False
                    return
            try:
                r = requests.get(ESP32_STREAM_URL, stream=True, timeout=(4, 10))
                buf = b""
                for chunk in r.iter_content(4096):
                    if self.users <= 0:
                        break
                    buf += chunk
                    while True:
                        a = buf.find(b"\xff\xd8")
                        if a < 0:
                            buf = b""
                            break
                        b = buf.find(b"\xff\xd9", a + 2)
                        if b < 0:
                            buf = buf[a:]
                            break
                        jpg, buf = buf[a:b + 2], buf[b + 2:]
                        with self.cond:
                            self.frame = jpg
                            self.seq += 1
                            self.cond.notify_all()
                r.close()
            except Exception as e:
                print("[esp32] stream problem:", e)
                time.sleep(2)

    def wait(self, last, timeout):
        with self.cond:
            ok = self.cond.wait_for(lambda: self.seq != last, timeout)
            return self.frame, self.seq, ok

esp_hub = Esp32Hub()

@app.get("/api/esp32/video")
@login_required
def esp32_video():
    if not ESP32_STREAM_URL:
        return "Set ESP32_STREAM_URL in .env first", 503
    def gen():
        esp_hub.acquire()
        try:
            last = 0
            while True:
                f, last, ok = esp_hub.wait(last, 10)
                if not ok or not f:
                    break
                yield b"--frame\r\nContent-Type: image/jpeg\r\nContent-Length: " + str(len(f)).encode() + b"\r\n\r\n" + f + b"\r\n"
        finally:
            esp_hub.release()
    return Response(gen(), mimetype="multipart/x-mixed-replace; boundary=frame")

esp_rec = {"proc": None, "thread": None, "stop": None, "path": None}
esp_rlock = threading.Lock()

def _esp_record_loop(proc, stop):
    last, t_end = 0, time.time() + ESP_MAX_REC
    try:
        while not stop.is_set() and time.time() < t_end:
            f, last, ok = esp_hub.wait(last, 2)
            if ok and f:
                proc.stdin.write(f)
    except Exception as e:
        print("[esp32 record] error:", e)
    finally:
        try: proc.stdin.close()
        except Exception: pass

@app.post("/api/esp32/record/start")
@login_required
def esp32_record_start():
    if not ESP32_STREAM_URL:
        return jsonify(error="Set ESP32_STREAM_URL in .env first"), 503
    if not shutil.which("ffmpeg"):
        return jsonify(error="ffmpeg is not installed on this PC"), 503
    with esp_rlock:
        if esp_rec["proc"]:
            return jsonify(error="Already recording"), 409
        path = os.path.join(tempfile.gettempdir(), "doroye_esp32_record.mp4")
        try: os.remove(path)
        except FileNotFoundError: pass
        esp_hub.acquire()
        proc = subprocess.Popen(
            ["ffmpeg", "-y", "-loglevel", "error",
             "-use_wallclock_as_timestamps", "1", "-f", "image2pipe", "-c:v", "mjpeg", "-i", "-",
             "-vf", "fps=10,scale=trunc(iw/2)*2:trunc(ih/2)*2",
             "-c:v", "libx264", "-preset", "ultrafast", "-crf", "28", "-pix_fmt", "yuv420p",
             "-movflags", "+faststart", path],
            stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        stop = threading.Event()
        th = threading.Thread(target=_esp_record_loop, args=(proc, stop), daemon=True)
        esp_rec.update(proc=proc, thread=th, stop=stop, path=path)
        th.start()
    return jsonify(ok=True)

@app.post("/api/esp32/record/stop")
@login_required
def esp32_record_stop():
    if not (TG_TOKEN and TG_CHAT):
        return jsonify(error="Telegram is not set up in .env."), 503
    with esp_rlock:
        proc = esp_rec["proc"]
        if not proc:
            return jsonify(error="Not recording"), 409
        esp_rec["stop"].set()
        esp_rec["thread"].join(timeout=5)
        esp_rec["proc"] = None
        path = esp_rec["path"]
    esp_hub.release()
    try:
        proc.wait(timeout=60)
    except subprocess.TimeoutExpired:
        proc.kill()
        return jsonify(error="Video encoding timed out"), 500
    if not os.path.exists(path) or os.path.getsize(path) < 1000:
        return jsonify(error="Recording was empty (is the ESP32 stream reachable?)"), 500
    with open(path, "rb") as fh:
        video = fh.read()
    if len(video) > 49 * 1024 * 1024:
        return jsonify(error="Video is too big for Telegram"), 413
    try:
        t = requests.post(
            f"https://api.telegram.org/bot{TG_TOKEN}/sendVideo",
            data={"chat_id": TG_CHAT, "caption": f"🎥 Doroye drone camera recording\n👤 {mention(my_name() or 'operator')}", "supports_streaming": "true"},
            files={"video": ("drone.mp4", video, "video/mp4")}, timeout=120)
        if not t.ok:
            print("[telegram] video error:", t.status_code, t.text[:200])
            return jsonify(error="Telegram error: " + t.text[:150]), 502
    except requests.RequestException as e:
        print("[telegram] video failed:", e)
        return jsonify(error="Could not reach Telegram"), 502
    return jsonify(ok=True, size=len(video))


# ---------- Sensor history (robot + drone): one CSV, full download, automatic Telegram report every 2 minutes ----------
HIST_CSV = os.path.join(BASE, "sensor_history.csv")
HIST_COLS = ["datetime", "operator", "source", "device", "reading", "label", "value", "unit", "level"]
HIST_EVERY = int(os.environ.get("HISTORY_LOG_SECONDS", "5"))      # one row per reading every N seconds (0 = every packet)
REPORT_EVERY = int(os.environ.get("REPORT_SECONDS", "120"))       # automatic Telegram CSV report interval (seconds)
SRC_NAME = {"drone": "Drone", "robot": "Robot"}                   # drone = ESP8266 station, robot = Arduino Uno + Mega (via the Pi)
hist_lock = threading.Lock()
hist_last = {}                                                    # (source, reading) -> time of the last logged row
hist_win = {s: deque(maxlen=6000) for s in SRC_NAME}              # (time, row) kept for the next Telegram report
reports = {s: {"on": False, "next": 0.0, "since": 0.0, "last": 0.0, "error": "", "by": None} for s in SRC_NAME}

def history_log(source, vals, device="", now=None):
    """Appends the readings to sensor_history.csv with date/time and the operator who activated the system."""
    now = now or time.time()
    op = system["user"] if system["on"] and system["user"] else "none"
    stamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(now))
    with hist_lock:
        rows = []
        for k, v in vals.items():
            if HIST_EVERY and now - hist_last.get((source, k), 0) < HIST_EVERY:
                continue
            hist_last[(source, k)] = now
            m = S8_KNOWN.get(k) or {"label": k.replace("_", " ").capitalize(), "unit": ""}
            rows.append([stamp, op, source, device, k, m["label"], round(v, 3), m.get("unit", ""), level_of(m, v)])
        if not rows:
            return
        try:
            new = not os.path.exists(HIST_CSV)
            with open(HIST_CSV, "a", newline="", encoding="utf-8") as f:
                w = csv.writer(f)
                if new: w.writerow(HIST_COLS)
                w.writerows(rows)
        except OSError as e:
            print("[history] could not write the CSV:", e)
        for r in rows:
            hist_win[source].append((now, r))

def send_telegram_doc(filename, data, caption, user=None):
    """Sends a file (the CSV report) to the Telegram group; replies are linked to `user`."""
    if not TG_TOKEN or not TG_CHAT:
        print("[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set - skipping"); return None
    try:
        r = requests.post(f"https://api.telegram.org/bot{TG_TOKEN}/sendDocument", data={"chat_id": TG_CHAT, "caption": caption[:1000]},
                          files={"document": (filename, data, "text/csv")}, timeout=30)
        if not r.ok:
            print("[telegram] document error:", r.status_code, r.text[:200]); return None
        mid = r.json().get("result", {}).get("message_id")
        if mid and user:
            with db() as c: c.execute("INSERT OR REPLACE INTO tg_sent VALUES(?,?)", (mid, user))
        return mid or True
    except (requests.RequestException, ValueError) as e:
        print("[telegram] document failed:", e); return None

def latest_snapshot(source):
    """Newest readings of one source as short text pieces + the readings that are outside their limits."""
    st, lk = (s8, s8_lock) if source == "drone" else (ps, ps_lock)
    now = time.time()
    with lk:
        v, seen = dict(st["values"]), dict(st["seen"])
    items, alerts = [], []
    for k in sorted(v):
        if now - seen[k] > S8_OFFLINE:
            continue
        m = S8_KNOWN.get(k) or {"label": k.replace("_", " ").capitalize(), "unit": ""}
        txt = f"{m['label']} {v[k]:.1f}" + (f" {m['unit']}" if m.get("unit") else "")
        items.append(txt)
        lvl = level_of(m, v[k])
        if lvl in ("warn", "bad"):
            alerts.append(("🔴 " if lvl == "bad" else "🟡 ") + txt)
    return items, alerts

def send_report(source):
    """Sends everything logged since the last report (CSV) plus a readable summary to Telegram."""
    r, now = reports[source], time.time()
    with hist_lock:
        rows = [x[1] for x in hist_win[source] if x[0] >= r["since"]]
    items, alerts = latest_snapshot(source)
    op = system["user"] if system["on"] and system["user"] else None
    head = (f"📊 Doroye – {SRC_NAME[source].lower()} sensor report (last {max(1, REPORT_EVERY // 60)} min)\n"
            f"👤 Operator: {mention(op) if op else 'none (system on standby)'}\n🕒 {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
    foot = (f"\n\n🩺 Professionals: please read the readings and reply to this message" + (f" (or mention {mention(op)})" if op else "") + " with the recommended actions.")
    if not rows:
        ok = send_telegram(None, head + f"⚠️ No {source} readings arrived in this window. Is the {source} online?" + foot, op)
    else:
        buf = io.StringIO(); w = csv.writer(buf); w.writerow(HIST_COLS); w.writerows(rows)
        body = ("Latest: " + " · ".join(items) + "\n" if items else "") + ("Alerts: " + " | ".join(alerts) + "\n" if alerts else "✅ All readings inside their limits\n")
        if len(head) + len(body) + len(foot) > 1000:
            body = body[:max(0, 1000 - len(head) - len(foot) - 3)] + "...\n"
        ok = send_telegram_doc(f"doroye_{source}_{time.strftime('%Y%m%d_%H%M%S')}.csv", ("﻿" + buf.getvalue()).encode("utf-8"), head + body + foot, op)
    r["error"] = "" if ok else "Telegram did not accept the report."
    if ok:
        r["last"], r["since"] = now, now

def report_loop():
    while True:
        time.sleep(2)
        now = time.time()
        for src, r in reports.items():
            if r["on"] and now >= r["next"]:
                r["next"] = now + REPORT_EVERY                    # set first, so a slow Telegram call cannot cause a double send
                try:
                    send_report(src)
                except Exception as e:
                    r["error"] = "Report failed: " + str(e)[:100]; print("[report]", src, e)

threading.Thread(target=report_loop, daemon=True).start()

@app.get("/api/history/report")
@login_required
def history_report_state():
    now = time.time()
    out = {s: {"on": r["on"], "next_in": max(0, round(r["next"] - now)) if r["on"] else None,
               "last_age": round(now - r["last"]) if r["last"] else None, "error": r["error"], "by": r["by"]} for s, r in reports.items()}
    return jsonify(sources=out, every=REPORT_EVERY, operator=system["user"] if system["on"] else None, telegram=bool(TG_TOKEN and TG_CHAT))

@app.post("/api/history/report")
@login_required
def history_report_set():
    d = request.get_json(silent=True) or {}
    src, on = d.get("source"), bool(d.get("on"))
    if src not in reports:
        return jsonify(error="Unknown source."), 404
    if on and not (TG_TOKEN and TG_CHAT):
        return jsonify(error="Telegram is not set up in .env."), 503
    r, now = reports[src], time.time()
    if on and not r["on"]:
        r.update(on=True, since=now, next=now + REPORT_EVERY, error="", by=my_name())
    elif not on:
        r.update(on=False, error="")
    return jsonify(ok=True)

@app.get("/api/history/export.csv")
@login_required
def history_export():
    """Whole history (date, time, operator, readings). ?source=drone / robot / all"""
    src = request.args.get("source", "all")
    if not os.path.exists(HIST_CSV):
        return "No sensor history logged yet.", 404
    with hist_lock, open(HIST_CSV, "rb") as f:
        raw = f.read()
    if src in SRC_NAME:
        out = io.StringIO(); w = csv.writer(out)
        for i, row in enumerate(csv.reader(io.StringIO(raw.decode("utf-8")))):
            if i == 0 or (len(row) > 2 and row[2] == src): w.writerow(row)
        raw = out.getvalue().encode("utf-8")
    name = f"doroye_history_{src if src in SRC_NAME else 'all'}_{time.strftime('%Y%m%d')}.csv"
    return Response(b"\xef\xbb\xbf" + raw, mimetype="text/csv", headers={"Content-Disposition": f'attachment; filename="{name}"'})

if __name__ == "__main__":
    # 0.0.0.0 lets the ESP32-CAM (same Wi-Fi) reach this PC. Use 127.0.0.1 if you do not use the camera.
    app.run(host=os.environ.get("HOST", "0.0.0.0"), port=int(os.environ.get("PORT", "5000")), debug=False)