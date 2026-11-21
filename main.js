const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- Professional icon set (inline SVG, inherits text colour) ---------- */
const I = {
  home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  lab:'<path d="M9 3h6"/><path d="M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7.5 14h9"/>',
  doctors:'<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M5 3h2M13 3h2"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
  drone:'<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/><path d="M7 7l2.5 2.5M17 7l-2.5 2.5M7 17l2.5-2.5M17 17l-2.5-2.5"/>',
  chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  cam:'<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
  moon:'<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  play:'<polygon points="6 4 20 12 6 20 6 4"/>',
  stop:'<rect x="6" y="6" width="12" height="12" rx="1.5"/>',
  pause:'<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  power:'<path d="M12 2v10"/><path d="M6.3 6.3a8 8 0 1 0 11.4 0"/>',
  book:'<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 20h16"/>',
  activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  x:'<path d="M18 6L6 18M6 6l12 12"/>',
  warn:'<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  alert:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  star:'<polygon points="12 2 15.1 8.6 22 9.3 16.8 14 18.2 21 12 17.5 5.8 21 7.2 14 2 9.3 8.9 8.6 12 2"/>',
  send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
  download:'<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 21h16"/>',
  pin:'<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  mountain:'<path d="M3 20l6-11 4 7 3-5 5 9z"/>',
  signal:'<path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4"/>',
  hourglass:'<path d="M6 2h12M6 22h12"/><path d="M7 2v4l5 6-5 6v4M17 2v4l-5 6 5 6v4"/>',
  trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  game:'<rect x="2" y="7" width="20" height="10" rx="5"/><path d="M7 10v4M5 12h4M16 12h.01M18 11h.01"/>',
  bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  next:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  dot:'<circle cx="12" cy="12" r="6" fill="currentColor" stroke="none"/>',
  tag:'<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1"/>',
  thermo:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',
  thermoir:'<path d="M12 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M10 9v7"/><path d="M16 6h4M16 10h3M16 14h4"/>',
  drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 15a2.8 2.8 0 0 0 2.5 2"/>',
  gauge:'<path d="M4.2 18a9 9 0 1 1 15.6 0"/><path d="M12 14l4-4"/><circle cx="12" cy="14" r="1.2"/>',
  uv:'<path d="M6 17a6 6 0 0 1 12 0"/><path d="M2 20h20"/><path d="M12 5v3M4.5 9.5l2 2M19.5 9.5l-2 2M2.5 15.5h2M19.5 15.5h2"/>',
  wind:'<path d="M3 8h10a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h7a2.5 2.5 0 1 1-2.5 2.5"/>',
  sprout:'<path d="M12 21v-9"/><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6z"/><path d="M12 14c0-3 2-5 6-5 0 3-2 5-6 5z"/><path d="M6 21h12"/>',
  ruler:'<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
  leaf:'<path d="M5 19c0-8 5-14 15-15 0 10-5 15-13 15"/><path d="M5 19c3-5 7-8 12-10"/>',
  satellite:'<path d="M14 6l4 4-8 8-4-4z"/><path d="M8.5 8.5L5 5M15.5 15.5L19 19"/><path d="M4 12a8 8 0 0 0 8 8"/><path d="M4 16a4 4 0 0 0 4 4"/>'
};
I.robot = '<rect x="5" y="8" width="14" height="11" rx="2"/><path d="M12 8V4M9 13h.01M15 13h.01M9 17h6"/>';
const ic = (n, c = "") => `<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ""}</svg>`;
(() => {
  const s = document.createElement("style");
  s.textContent = `.ic{width:1.15em;height:1.15em;vertical-align:-.2em;margin-right:.35em;flex:none;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
  .ic.fill{fill:currentColor}.e .ic,.big .ic{width:1em;height:1em;margin:0;stroke-width:1.5}
  nav button,#nav button{display:inline-flex;align-items:center;gap:2px}.badge .ic{display:none}
  .sc .ic{width:1.35em;height:1.35em;margin:0;flex:none;stroke-width:1.8}
  .sl{display:flex;align-items:flex-start;gap:9px;line-height:1.3}.sl span{color:var(--tx);font-weight:600}`;
  document.head.appendChild(s);
})();

let CFG = {}, GOOD = {}, camTimer = null, user = null, stars = 0, page = "home", LABELS = [], score = 0, rounds = 0, stream = null;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const emoji = l => { l = l.toLowerCase(); const m = CFG.emoji || {}; for (const k in m) if (l.includes(k)) return m[k]; return CFG.default_emoji || ic("tag"); };
const gtag = g => g == null ? "" : `<span class="tag ${g ? 'f' : 's'}">${esc((g ? CFG.good_word : CFG.bad_word).toUpperCase())} ${g ? CFG.good_icon : CFG.bad_icon}</span>`;
const gcls = g => g === true ? "f" : g === false ? "s" : "n";
const gcol = g => g === true ? "var(--g)" : g === false ? "var(--r)" : "var(--b)";
const gtip = g => g == null ? "" : (g ? CFG.good_tip : CFG.bad_tip);
const bars = list => list.map(x => `<div>${esc(x.label)} – ${Math.round(x.confidence*100)}%<div class="bar"><i style="width:${x.confidence*100}%;background:${gcol(x.good)}"></i></div></div>`).join("");

async function api(url, opt) {
  const r = await fetch(url, opt); let d = {};
  try { d = await r.json(); } catch (e) {}
  if (!r.ok) { const err = new Error(d.error || "Something went wrong"); err.status = r.status; throw err; }
  return d;
}
const post = (u, b) => api(u, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(b)});

async function init() {
  try { CFG = await api("/api/config"); document.title = CFG.app_title; $("header h1").textContent = CFG.app_title; } catch (e) {}
  try { const d = await api("/api/me"); user = d.user; stars = d.stars; LABELS = d.labels; GOOD = d.good; } catch (e) { user = null; }
  render();
  if (user && !unreadTimer) { unreadTimer = setInterval(pollUnread, 15000); pollUnread(); }
}
let unread = 0, unreadTimer = null;
async function pollUnread() { try { unread = (await api("/api/inbox/unread")).unread; nav(); } catch (e) {} }
function nav() {
  $("#nav").innerHTML = !user ? "" : [["home",ic("home")+"Home"],["lab",ic("lab")+"AI Lab"],["doctors",ic("doctors")+"Professionals" + (unread && page != "doctors" ? `<span class="badge">${unread}</span>` : "")],["drone",ic("drone")+"Drone"],["robot",ic("robot")+"Robot"],["env",ic("leaf")+"Environment"],["cam",ic("cam")+"ESP32 Cam"],["pi",ic("moon")+"Pi Cam"],["me",ic("user")+"Me"]]
    .map(([k,t]) => `<button class="${page==k?'on':''}" onclick="go('${k}')">${t}</button>`).join("") + `<button onclick="logout()">${ic("logout")}Exit</button>`;
}
function go(p) { stopCam(); clearInterval(camTimer); page = p; render(); }
async function logout() { stopCam(); clearInterval(camTimer); await post("/api/logout", {}); user = null; page = "home"; render(); }
function render() {
  nav(); window.scrollTo(0, 0); const a = $("#app");
  if (!user) return authView(a, false);
  ({home, lab, doctors, learn, scan, cam, pi, drone, env, robot, quiz, tips, me})[page](a);
}

function authView(a, reg) {
  a.innerHTML = `<div class="card"><img class="hero" src="/static/img/logo.gif" alt="Doroye"><h2 style="text-align:center">${reg?"Join "+esc(CFG.app_title)+"!":"Operator sign-in"}</h2>
  <p class="mut" style="text-align:center">${esc(CFG.welcome_sub || "")}</p>
  <input id="u" placeholder="Your name" autocomplete="username">${reg?'<input id="age" type="number" min="4" max="18" placeholder="Your age">':''}
  <input id="p" type="password" placeholder="Secret password (4+ letters)" autocomplete="current-password">
  <p id="err" style="color:var(--r)"></p><button class="btn g" style="width:100%" id="go">${reg?"Create my account":"Log in"}</button>
  <p style="text-align:center"><a href="#" id="sw">${reg?"I already have an account":"I am new – make an account"}</a></p></div>`;
  $("#sw").onclick = e => { e.preventDefault(); authView(a, !reg); };
  $("#go").onclick = async () => {
    try {
      const d = await post(reg ? "/api/register" : "/api/login", {name:$("#u").value, password:$("#p").value, age: reg ? $("#age").value : undefined});
      user = d.user; stars = d.stars; await init();
    } catch (e) { $("#err").textContent = e.message; }
  };
}
async function home(a) {
  const s = await api("/api/system");
  a.innerHTML = `<div class="card" style="text-align:center"><img class="hero" src="/static/img/logo.gif" alt="Doroye"><h2>Hello, ${esc(user)}</h2>
  <p><span class="pill" style="background:${s.on ? 'var(--g)' : '#555'}">${s.on ? ic("dot","fill") + "SYSTEM ACTIVE · operator " + esc(s.user) : ic("dot","fill") + "System standby"}</span></p>
  <button class="btn ${s.on ? 'r' : 'g'}" id="act">${s.on ? ic("stop") + "Deactivate system" : ic("play") + "Activate system"}</button>
  <p class="mut">${s.telegram ? "Telegram bridge connected." : ic("warn") + "Telegram is not set up in .env."} While the system is active, camera alerts and sensor data posted to Telegram carry your name (<b>${esc(s.handle)}</b>), so professionals can answer you directly.</p></div>
  <div class="grid">${[["lab","lab","AI Lab"],["doctors","doctors","Professionals"],["drone","drone","Drone"],["robot","robot","Robot"],["env","leaf","Environment"],["cam","cam","ESP32 camera"],["pi","moon","Pi camera"]].map(([k,i,t]) => `<button class="food n" style="cursor:pointer" onclick="go('${k}')"><div class="e">${ic(i)}</div>${t}</button>`).join("")}</div>`;
  $("#act").onclick = async () => { await post("/api/system/activate", {on: !s.on}); home(a); };
}
function learn(a) {
  a.innerHTML = `<div class="card"><h2>${ic("book")}${esc(CFG.library_title)}</h2><input id="q" placeholder="Search...">${CFG.has_good ? `<div class="row"><button class="btn g" data-f="all">All</button><button class="btn g" data-f="t">${CFG.good_icon} ${esc(CFG.good_word)}</button><button class="btn r" data-f="f">${CFG.bad_icon} ${esc(CFG.bad_word)}</button></div>` : ""}</div><div class="grid" id="gr"></div>`;
  let f = "all";
  const draw = () => {
    const q = $("#q").value.toLowerCase();
    const list = LABELS.filter(l => (f == "all" || (f == "t") === GOOD[l]) && l.toLowerCase().includes(q));
    $("#gr").innerHTML = list.slice(0, 300).map(l => `<div class="food ${gcls(GOOD[l])}" data-l="${esc(l)}"><div class="e">${emoji(l)}</div><div>${esc(l)}</div>${gtag(GOOD[l])}</div>`).join("") + (list.length > 300 ? "<p class='mut'>Showing the first 300. Use search to find more.</p>" : "");
    document.querySelectorAll("#gr .food").forEach(c => c.onclick = () => alert(c.dataset.l + (gtip(GOOD[c.dataset.l]) ? "\n\n" + gtip(GOOD[c.dataset.l]) : "")));
  };
  a.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { f = b.dataset.f; draw(); });
  $("#q").oninput = draw; draw();
}

function stopCam() { if (labTimer) { clearInterval(labTimer); labTimer = null; } if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; } }
function scan(a) {
  a.innerHTML = `<div class="card"><h2>${ic("cam")}Scan a ${esc(CFG.item_word)}</h2><p>Drop a ${esc(CFG.item_word)} picture here, choose one, or use the camera.</p>
  <div class="drop" id="drop">${ic("image")}Drag a picture here or tap to choose<input type="file" accept="image/*" id="fi" hidden></div>
  <div class="row" style="margin-top:10px"><button class="btn b" id="cam">${ic("cam")}Use camera</button></div>
  <div id="box" style="margin-top:12px"></div><div id="res"></div></div>`;
  const drop = $("#drop"), fi = $("#fi");
  drop.onclick = () => fi.click();
  fi.onchange = () => fi.files[0] && send(fi.files[0]);
  drop.ondragover = e => { e.preventDefault(); drop.classList.add("over"); };
  drop.ondragleave = () => drop.classList.remove("over");
  drop.ondrop = e => { e.preventDefault(); drop.classList.remove("over"); e.dataTransfer.files[0] && send(e.dataTransfer.files[0]); };
  $("#cam").onclick = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});
      $("#box").innerHTML = `<video id="v" autoplay playsinline></video><br><button class="btn g" id="snap" style="margin-top:8px">${ic("cam")}Snap!</button>`;
      $("#v").srcObject = stream;
      $("#snap").onclick = () => {
        const v = $("#v"), c = document.createElement("canvas"); c.width = v.videoWidth; c.height = v.videoHeight;
        c.getContext("2d").drawImage(v, 0, 0); stopCam();
        c.toBlob(b => send(new File([b], "photo.jpg", {type:"image/jpeg"})), "image/jpeg", 0.9);
      };
    } catch (e) { $("#res").innerHTML = '<p style="color:var(--r)">Camera is not available. Please choose a picture instead.</p>'; }
  };
}
async function send(file) {
  const r = $("#res"); r.innerHTML = `<p>${ic("activity")}Thinking...</p>`;
  $("#box").innerHTML = `<img id="pv" src="${URL.createObjectURL(file)}" style="max-width:100%;max-height:320px">`;
  const fd = new FormData(); fd.append("image", file);
  try {
    const d = await api("/predict", {method:"POST", body:fd}), t = d.results[0];
    if (d.stars != null) stars = d.stars;
    r.innerHTML = `<div class="big">${emoji(t.label)}</div><h2 style="text-align:center">${esc(t.label)} ${gtag(t.good)}</h2><p style="text-align:center">${esc(gtip(t.good))}</p>` + bars(d.results) + infoCard(t.label) +
      (d.earned ? `<p><span style="color:var(--y)">${ic("star","fill")}</span>+1 star!</p>` : '<p class="mut">Not very sure. Try a clearer photo in good light.</p>');
  } catch (e) {
    if (e.status === 401) { user = null; return render(); }
    r.innerHTML = `<p style="color:var(--r)">Oops! ${esc(e.message)}</p>`;
  }
}
const cam = a => camPage(a, "esp32"), pi = a => camPage(a, "pi");
function camPage(a, src) {
  const title = src === "pi" ? ic("moon") + "Raspberry Pi Night Camera" : ic("cam") + "ESP32 Camera", dev = src === "pi" ? "Raspberry Pi" : "ESP32-CAM";
  a.innerHTML = `<div class="card"><h2>${title}</h2><p class="mut">Pictures sent by your ${dev} appear here and are checked automatically.</p><button class="btn" id="pz">...</button><div id="cam" style="margin-top:12px"></div></div>` + '<div id="dual"></div>';
  let dualStep = null; dualInit(src).then(f => { dualStep = f; });
  const tick = async () => {
    try {
      const d = await api(`/api/cam/${src}/latest`), el = $("#cam"), pz = $("#pz"); if (!el) return;
      pz.innerHTML = d.paused ? ic("play") + "Resume recognition" : ic("pause") + "Pause recognition";
      pz.className = "btn " + (d.paused ? "g" : "r");
      pz.onclick = async () => { await post(`/api/cam/${src}/pause`, {paused: !d.paused}); tick(); };
      if (!d.image) { el.innerHTML = `<p>${ic("hourglass")}Waiting for the first picture from the ${dev}...</p>`; return; }
      if (dualStep && !d.paused) dualStep(d);
      const has = d.label !== null;
      el.innerHTML = (d.paused ? `<p style="color:var(--r);font-weight:bold">${ic("pause")}Recognition is paused. New pictures are shown but not checked, and no Telegram messages are sent.</p>` : "") + `<img src="${d.image}" style="max-width:100%;max-height:320px">` +
        (has ? `<div class="big">${emoji(d.label)}</div><h2 style="text-align:center">${esc(d.label)} ${gtag(d.good)}</h2>` + bars(d.top) + infoCard(d.label) : "") +
        `<p class="mut">Checked pictures: ${d.count} · last picture ${d.age}s ago${d.age > 60 ? " (camera may be offline)" : ""}</p>`;
    } catch (e) { if (e.status === 401) { user = null; render(); } }
  };
  tick(); camTimer = setInterval(tick, 3000);
}
/* ---------- ESP32-CAM and Raspberry Pi camera: two models at the same time (e.g. mosquito/fly + fire). ---------- */
const imgKey = d => (String(d.image).startsWith("data:") ? d.image.length + ":" + d.image.slice(-80) : d.image) + "|" + d.count;
const imgFile = async (src, name = "esp32cam.jpg") => { const b = await (await fetch(src)).blob(); return new File([b], name, {type: b.type || "image/jpeg"}); };
const recogFile = (model, file) => { const fd = new FormData(); fd.append("model", model); fd.append("image", file, file.name || "frame.jpg"); return api("/api/recognize", {method: "POST", body: fd}); };
/* Fired once when a model starts reporting an alert. kind = "a" or "b". Listen with window.addEventListener("dy-alert", e => ...) to switch the robot mode / turn on the pump. */
const fireAlert = (kind, top, res, cam = "esp32") => window.dispatchEvent(new CustomEvent("dy-alert", {detail: {kind, cam, label: top.label, confidence: top.confidence, model: res.model}}));
async function dualInit(src = "esp32") {
  const box = $("#dual"); if (!box) return null;
  const DEV = src === "pi" ? "Pi camera" : "ESP32-CAM", STORE = src === "pi" ? "dy-dual-pi" : "dy-dual";   // each camera keeps its own settings
  const DEF2 = "__second";   // the server's 2nd camera model (model_insect/), already run by the server
  const DEF = "__default";   // the ESP32-CAM's own default model (the fire model from model/config.json), already run by the server
  let models = [];
  try { models = (await api("/api/ai/models")).categories.flatMap(c => c.models.filter(m => m.installed)); } catch (e) {}
  let saved = {}; try { saved = JSON.parse(localStorage.getItem(STORE) || "{}"); } catch (e) {}
  const pick = (k, re, dflt = "") => (k in saved && (saved[k] === "" || saved[k] === DEF || saved[k] === DEF2 || models.some(m => m.id === saved[k]))) ? saved[k] : ((re && models.find(m => re.test(m.name)) || {}).id || dflt);
  const cfg = {on: saved.on !== false, a: pick("a", null, DEF2), b: pick("b", null, DEF),
               ka: saved.ka ?? "mosquito", kb: saved.kb ?? "fire,flame,smoke", th: +saved.th || 60, tg: saved.tg !== false};
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(cfg)); } catch (e) {} };
  const opts = (sel, defs = []) => `<option value="">(off)</option>` + defs.map(([id, name]) => `<option value="${id}" ${sel === id ? "selected" : ""}>${name}</option>`).join("") + models.map(m => `<option value="${esc(m.id)}" ${m.id === sel ? "selected" : ""}>${esc(m.name)}</option>`).join("");
  box.innerHTML = `<div class="card"><h2>${ic("zap")}Simultaneous detection</h2>
    <p class="mut">Every new ${DEV} picture is checked by both models at the same time. Alerts from the two camera models are sent to Telegram by the server; alerts from any other model you pick here are sent by this page.</p>
    <label class="chk"><input type="checkbox" id="dOn" ${cfg.on ? "checked" : ""}> Detection on</label>
    <label class="chk"><input type="checkbox" id="dTg" ${cfg.tg ? "checked" : ""}> Send alerts to Telegram</label>
    <div class="row">
      <div><div class="mut">Model A (2nd model: Aedes mosquito types)</div><select id="dA">${opts(cfg.a, [[DEF2, DEV + " 2nd model (Aedes mosquito)"]])}</select><input id="dKA" value="${esc(cfg.ka)}" placeholder="alert on labels containing..."></div>
      <div><div class="mut">Model B (default fire model)</div><select id="dB">${opts(cfg.b, [[DEF, DEV + " default model (fire)"]])}</select><input id="dKB" value="${esc(cfg.kb)}" placeholder="alert on labels containing..."></div>
      <div><div class="mut">Alert at confidence &ge; <b id="dThV">${cfg.th}</b>%</div><input type="range" id="dTh" min="10" max="99" value="${cfg.th}"></div>
    </div>
    <div id="dAlert"></div><div class="row" id="dRes" style="margin-top:10px"></div></div>`;
  let busy = false, lastKey = null; const active = {a: false, b: false}, lastSent = {a: 0, b: 0};
  const changed = () => { lastKey = null; save(); };
  $("#dOn").onchange = e => { cfg.on = e.target.checked; changed(); };
  $("#dTg").onchange = e => { cfg.tg = e.target.checked; save(); };
  $("#dA").onchange = e => { cfg.a = e.target.value; kbShow(); changed(); };
  const kbShow = () => { $("#dKB").style.display = cfg.b === DEF ? "none" : ""; $("#dKA").style.display = cfg.a === DEF2 ? "none" : ""; };
  $("#dB").onchange = e => { cfg.b = e.target.value; kbShow(); changed(); };
  kbShow();
  $("#dKA").oninput = e => { cfg.ka = e.target.value; changed(); };
  $("#dKB").oninput = e => { cfg.kb = e.target.value; changed(); };
  $("#dTh").oninput = e => { cfg.th = +e.target.value; $("#dThV").textContent = cfg.th; changed(); };
  const hit = (label, keys) => keys.split(",").map(k => k.trim().toLowerCase()).filter(Boolean).some(k => String(label).toLowerCase().includes(k));
  let extraName = DEV + " 2nd model";
  const nameOf = id => id === DEF ? DEV + " default model" : id === DEF2 ? extraName : ((models.find(m => m.id === id) || {}).name || id);
  return async function step(d) {
    if (!cfg.on || busy || !$("#dRes")) return;
    if (d.extra) extraName = d.extra.name;
    const k = imgKey(d) + "|" + d.label + "|" + (d.extra ? d.extra.label : ""); if (k === lastKey) return; lastKey = k; busy = true;
    try {
      const jobs = [["a", cfg.a, cfg.ka], ["b", cfg.b, cfg.kb]].filter(j => j[1]);
      const file = jobs.some(j => j[1] !== DEF && j[1] !== DEF2) ? await imgFile(d.image, src + "-cam.jpg") : null;
      const defRes = () => d.label == null ? Promise.reject(new Error("Waiting for the default model's result...")) : Promise.resolve({results: d.top, model: DEV + " default model", def: true});
      const defRes2 = () => !d.extra ? Promise.reject(new Error("The server has no 2nd model. Put keras_model.h5 and labels.txt in models/aedes_types/ and restart.")) : Promise.resolve({results: d.extra.top, model: d.extra.name, def: true, word: d.extra.word});
      const out = await Promise.allSettled(jobs.map(j => j[1] === DEF ? defRes() : j[1] === DEF2 ? defRes2() : recogFile(j[1], file)));   // both models run in parallel
      let cards = "", alerts = "";
      for (const [i, o] of out.entries()) {
        const [kind, id, keys] = jobs[i];
        if (o.status !== "fulfilled") { cards += `<div class="card" style="margin:0"><b>${esc(nameOf(id))}</b><p style="color:var(--r)">${ic("warn")}${esc(o.reason && o.reason.message || "failed")}</p></div>`; active[kind] = false; continue; }
        const x = o.value, t = x.results[0], pct = Math.round(t.confidence * 100), alert = pct >= cfg.th && (x.def ? t.good === false : hit(t.label, keys));
        let note = x.def && alert ? " · sent to Telegram by the server" : "";
        if (alert && !x.def && cfg.tg && x.id != null && (!active[kind] || Date.now() - lastSent[kind] > 60000)) {   // first alert, then at most once a minute
          lastSent[kind] = Date.now();
          try { await post("/api/recognize/send", {id: x.id}); note = " · sent to Telegram"; }
          catch (e) { note = " · Telegram failed: " + e.message; }
        } else if (alert && !x.def && cfg.tg && active[kind]) note = " · already sent to Telegram";
        cards += `<div class="card" style="margin:0;border-color:${alert ? "var(--r)" : "var(--line)"}"><b>${esc(nameOf(id))}</b><h3 style="margin:.4rem 0">${esc(t.label)} <span class="mut">${pct}%</span> ${x.def ? (x.word ? `<span class="tag ${t.good ? "f" : "s"}">${esc(x.word)}</span>` : gtag(t.good)) : ""}</h3>${bars(x.results)}${infoCard(t.label)}</div>`;
        if (alert) alerts += `<p class="msg" style="border-color:var(--r);color:var(--r);font-weight:700">${ic("alert")}ALERT: ${esc(t.label)} ${pct}% &middot; ${esc(nameOf(id))}${esc(note)}</p>`;
        if (alert && !active[kind]) fireAlert(kind, t, x, src);
        active[kind] = alert;
      }
      if (!$("#dRes")) return;
      $("#dRes").innerHTML = cards || '<p class="mut">Choose at least one model.</p>'; $("#dAlert").innerHTML = alerts;
    } catch (e) { if (e.status === 401) { user = null; render(); } }
    finally { busy = false; }
  };
}
const fmt = v => Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(1);
const lvCol = l => ({ok:"var(--g)", warn:"var(--y)", bad:"var(--r)"})[l] || "#999";
function spark(v) {
  if (v.length < 2) return "";
  const lo = Math.min(...v), hi = Math.max(...v), r = (hi - lo) || 1;
  const pts = v.map((y, i) => `${(i/(v.length-1)*100).toFixed(1)},${(26-(y-lo)/r*24).toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 100 28" preserveAspectRatio="none" style="width:100%;height:28px;margin-top:6px"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>`;
}
/* sensor icons: choose a clean SVG by sensor name (server emoji only used as a fallback) */
const SENS = {"🌡️":"thermo","🌡":"thermo","💧":"drop","🔋":"zap","⚡":"zap","⛰️":"mountain","⛰":"mountain","📍":"pin","🛰️":"satellite","🛰":"satellite"};
const SLAB = [["object","thermoir"],["temp","thermo"],["humid","drop"],["pressure","gauge"],["uv","uv"],["light","bulb"],["air quality","wind"],["mq-","wind"],["gas","wind"],["soil","sprout"],["moist","sprout"],["distance","ruler"],["altitude","mountain"],["satellite","satellite"],["volt","zap"],["batt","zap"],["rssi","signal"],["signal","signal"]];
const sicon = s => {
  const l = String(s.label || "").toLowerCase();
  for (const [k, n] of SLAB) if (l.includes(k)) return ic(n);
  return ic(SENS[s.icon] || "activity");
};
function drone(a) {
  a.innerHTML = `<div class="card"><h2>${ic("drone")}Drone Sensors</h2><div id="s8stat"></div><div id="s8al"></div></div><div class="sg" id="s8sg"></div>
  <div id="dhist"></div>
  <div class="card"><h3>${ic("cam")}Drone camera</h3>
    <div class="row"><button class="btn g" id="dlive">${ic("play")}Live video</button><button class="btn b" id="dphoto">${ic("image")}Photo</button><button class="btn b" id="drec">Start recording</button></div>
    <img id="dcam" alt="" style="max-width:100%;max-height:360px;margin-top:10px;display:none">
    <p id="dcamt" class="mut"></p><p id="drect" class="mut"></p></div>`;
  historyPanel("#dhist", "drone");
  const tick = async () => {
    try {
      const d = await api("/api/esp8266/latest"); if (!$("#s8sg")) return;
      $("#s8stat").innerHTML = d.count ? `<span class="pill" style="background:${d.online ? 'var(--g)' : 'var(--r)'}">${ic("dot","fill")}${d.online ? "Live" : "Offline"}</span> <span class="mut">${d.device ? esc(d.device) + " · " : ""}last data ${d.age}s ago · ${d.count} packets</span>` : `<p>${ic("hourglass")}Waiting for the first data from the drone...</p>`;
      $("#s8al").innerHTML = d.alerts.map(x => `<p style="color:${lvCol(x.level)};font-weight:bold">${x.level == "bad" ? ic("alert") : ic("warn")}${esc(x.text)}</p>`).join("");
      $("#s8sg").innerHTML = d.sensors.map(s => {
        const pct = Math.max(0, Math.min(100, (s.value - s.min) / ((s.max - s.min) || 1) * 100));
        return `<div class="sc" style="border-color:${lvCol(s.level)};color:${lvCol(s.level)}"><div class="sl">${sicon(s)}<span>${esc(s.label)}</span></div>
          <div class="sv">${fmt(s.value)} <small>${esc(s.unit)}</small></div>
          <div class="bar"><i style="width:${pct}%;background:${lvCol(s.level)}"></i></div>${spark(s.spark)}${s.level == "stale" ? '<div class="mut" style="font-size:13px">no recent data</div>' : ""}</div>`;
      }).join("");
    } catch (e) { if (e.status === 401) { user = null; render(); } }

    try {
      if (dlive || !$("#dcam")) return;
      const c = await api("/api/cam/esp32/latest"), img = $("#dcam");
      if (c.image) { if (img.dataset.s !== c.image) { img.src = c.image; img.dataset.s = c.image; } img.style.display = ""; $("#dcamt").textContent = `Last picture ${c.age}s ago`; }
    } catch (e) {}
  };

  let dlive = true, dRecOn = false;
  const dSetMode = m => {
    dlive = m === "live"; const img = $("#dcam");
    $("#dlive").className = "btn " + (dlive ? "g" : "b"); $("#dphoto").className = "btn " + (dlive ? "b" : "g");
    img.dataset.s = "";
    if (dlive) { img.src = "/api/esp32/video?t=" + Date.now(); img.style.display = ""; $("#dcamt").textContent = "Live video"; }
    else { img.removeAttribute("src"); img.style.display = "none"; $("#dcamt").innerHTML = `${ic("hourglass")}Waiting for a picture...`; }
  };
  $("#dcam").onerror = () => { if (dlive) { $("#dcam").style.display = "none"; $("#dcamt").innerHTML = `${ic("warn")}Live video is not available. Check the ESP32-CAM, then press Live video again.`; } };
  $("#dlive").onclick = () => dSetMode("live");
  $("#dphoto").onclick = () => dSetMode("photo");
  dSetMode("live");

  $("#drec").onclick = async () => {
    const b = $("#drec"), t = $("#drect"); b.disabled = true;
    try {
      if (!dRecOn) {
        const r = await fetch("/api/esp32/record/start", { method: "POST" });
        const j = await r.json().catch(() => ({}));
        if (!r.ok && r.status !== 409) throw new Error(j.error || "Could not start");
        dRecOn = true; b.textContent = "Stop recording"; b.className = "btn g";
        t.textContent = "Recording... (max 2 minutes)";
      } else {
        t.textContent = "Stopping and sending to Telegram...";
        const r = await fetch("/api/esp32/record/stop", { method: "POST" });
        const j = await r.json().catch(() => ({}));
        dRecOn = false; b.textContent = "Start recording"; b.className = "btn b";
        if (!r.ok) throw new Error(j.error || "Failed");
        t.textContent = "Video sent to Telegram.";
      }
    } catch (e) { t.textContent = "Error: " + e.message; }
    b.disabled = false;
  };

  tick(); camTimer = setInterval(tick, 2000);
}

/* ---------- Environment analysis: drone (ESP8266) + Raspberry Pi sensors, combined, compared and evaluated ---------- */
const ENV_ORDER = ["temperature", "humidity", "pressure", "light", "soil_moisture", "gas", "uv_index", "distance_cm"];
const ENV_SKIP = new Set(["rssi", "uptime_s", "voltage", "analog"]);            // technical readings, not environment
const ENV_TOL = {temperature: 2, humidity: 8, pressure: 3, soil_moisture: 10, uv_index: 1.5};   // allowed difference between the two stations
const LVN = {none: 0, ok: 0, warn: 1, bad: 2};
const lvCls = l => l === "bad" ? "var(--r)" : l === "warn" ? "var(--y)" : l === "ok" ? "var(--g)" : "var(--mut)";
const worstOf = (...l) => l.reduce((a, b) => LVN[b] > LVN[a] ? b : a, "ok");
function envRate(k, v) {
  const r = (level, text) => ({level, text});
  switch (k) {
    case "temperature": return v < 5 ? r("bad", "Very cold") : v < 15 ? r("warn", "Cool") : v <= 28 ? r("ok", "Comfortable") : v <= 35 ? r("warn", "Hot") : r("bad", "Extreme heat");
    case "humidity": return v < 20 ? r("bad", "Very dry") : v < 30 ? r("warn", "Dry") : v <= 60 ? r("ok", "Comfortable") : v <= 75 ? r("warn", "Humid") : r("bad", "Very humid");
    case "pressure": return v < 990 ? r("bad", "Very low – stormy weather likely") : v < 1005 ? r("warn", "Low – unsettled weather") : v <= 1025 ? r("ok", "Normal") : r("ok", "High – settled weather");
    case "uv_index": return v <= 2 ? r("ok", "Low") : v <= 5 ? r("warn", "Moderate – cover up at midday") : v <= 7 ? r("warn", "High – sun protection needed") : r("bad", "Very high – avoid the sun");
    case "soil_moisture": return v < 20 ? r("bad", "Very dry – irrigate") : v < 35 ? r("warn", "Dry") : v <= 70 ? r("ok", "Good") : v <= 85 ? r("warn", "Wet") : r("bad", "Waterlogged");
    default: return null;
  }
}
const dewPoint = (t, rh) => { const g = Math.log(Math.max(rh, 1) / 100) + 17.62 * t / (243.12 + t); return 243.12 * g / (17.62 - g); };
function heatIndex(tc, rh) {                                                       // NWS Rothfusz regression, only meaningful from 27 °C
  const t = tc * 9 / 5 + 32; if (t < 80) return null;
  const hi = -42.379 + 2.04901523 * t + 10.14333127 * rh - 0.22475541 * t * rh - 0.00683783 * t * t - 0.05481717 * rh * rh + 0.00122874 * t * t * rh + 0.00085282 * t * rh * rh - 0.00000199 * t * t * rh * rh;
  return (hi - 32) * 5 / 9;
}
function env(a) {
  a.innerHTML = `<div class="card"><h2>${ic("leaf")}Environment analysis</h2>
    <p class="mut">Readings from the drone (ESP8266) and the Raspberry Pi are combined, compared with each other and evaluated.</p><div id="esrc"></div></div>
    <div class="card"><h2>Assessment</h2><div id="esum"></div></div>
    <div class="sg" id="ederv"></div>
    <h2 style="margin:20px 0 6px">Readings</h2><div class="sg" id="eread"></div>`;
  const tick = async () => {
    const res = await Promise.allSettled([api("/api/esp8266/latest"), api("/api/pi/sensors/latest")]);
    if (!$("#eread")) return;
    if (res.some(x => x.status === "rejected" && x.reason && x.reason.status === 401)) { user = null; render(); return; }
    const src = [["Drone (ESP8266)", "Drone", "drone"], ["Raspberry Pi", "Pi", "chip"]].map(([name, short, icon], i) => {
      const r = res[i], d = r.status === "fulfilled" ? r.value : null;
      const vals = {}; (d ? d.sensors : []).forEach(s => { if (s.value != null && s.level !== "stale") vals[s.key] = s; });
      return {name, short, icon, d, err: r.status === "rejected" ? (r.reason && r.reason.message) : "", vals, on: !!(d && d.count && d.online)};
    });
    $("#esrc").innerHTML = src.map(x => `<p>${ic(x.icon)}<b>${x.name}</b> &nbsp;` + (x.d && x.d.count
      ? `<span class="pill" style="background:${x.on ? "var(--g)" : "var(--r)"}">${ic("dot", "fill")}${x.on ? "Live" : "Offline"}</span> <span class="mut">${x.d.device ? esc(x.d.device) + " · " : ""}last data ${x.d.age}s ago</span>`
      : `<span class="mut">${ic("hourglass")}${x.err ? esc(x.err) : "no data yet"}</span>`) + "</p>").join("");

    const keys = [...new Set(src.flatMap(x => Object.keys(x.vals)))].filter(k => !ENV_SKIP.has(k))
      .sort((p, q) => (ENV_ORDER.includes(p) ? ENV_ORDER.indexOf(p) : 99) - (ENV_ORDER.includes(q) ? ENV_ORDER.indexOf(q) : 99) || p.localeCompare(q));
    const findings = [], comb = {};
    src.forEach(x => { if (!x.on) findings.push({level: "warn", text: `${x.name} is ${x.d && x.d.count ? "offline" : "not sending data"} – its readings are missing from the analysis.`}); });

    $("#eread").innerHTML = keys.map(k => {
      const have = src.filter(x => x.vals[k]), vs = have.map(x => x.vals[k].value), avg = vs.reduce((p, q) => p + q, 0) / vs.length;
      comb[k] = avg; const s0 = have[0].vals[k], unit = esc(s0.unit || ""), rate = envRate(k, avg);
      let lvl = rate ? rate.level : worstOf(...have.map(x => x.vals[k].level === "bad" ? "bad" : x.vals[k].level === "warn" ? "warn" : "ok"));
      let note = rate ? rate.text : (lvl === "ok" ? "" : "Outside the set limits");
      let agree = "";
      if (have.length === 2) {
        const diff = Math.abs(vs[0] - vs[1]), tol = ENV_TOL[k];
        if (tol != null) {
          if (diff > tol) { agree = `<div style="color:var(--y);font-size:13px">${ic("warn")}Stations differ by ${fmt(diff)} ${unit} – check the sensors</div>`; findings.push({level: "warn", text: `${s0.label}: the drone and the Pi differ by ${fmt(diff)} ${s0.unit || ""} – check both sensors.`.replace("  ", " ")}); }
          else agree = `<div class="mut" style="font-size:13px">${ic("check")}Stations agree (Δ ${fmt(diff)} ${unit})</div>`;
        }
      } else agree = `<div class="mut" style="font-size:13px">only ${have[0].short} reports this</div>`;
      if (lvl !== "ok" && lvl !== "none") findings.push({level: lvl, text: `${s0.label}: ${fmt(avg)} ${s0.unit || ""} – ${note || "outside the set limits"}`});
      return `<div class="sc" style="border-color:${lvCls(lvl)};color:${lvCls(lvl)}"><div class="sl">${sicon(s0)}<span>${esc(s0.label)}</span></div>
        <div class="sv">${fmt(avg)} <small>${unit}</small></div>
        <div style="color:var(--tx);font-size:13px">${src.map(x => x.vals[k] ? `${x.short} <b>${fmt(x.vals[k].value)}</b>` : `${x.short} –`).join(" · ")}</div>
        ${note ? `<div style="font-weight:600">${esc(note)}</div>` : ""}${agree}</div>`;
    }).join("") || `<p class="mut">${ic("hourglass")}Waiting for sensor data...</p>`;

    const T = comb.temperature, RH = comb.humidity, cards = [];
    if (T != null && RH != null) {
      const td = dewPoint(T, RH), tdr = td < 16 ? ["ok", td < 10 ? "Dry air" : "Comfortable"] : td < 21 ? ["warn", "Muggy"] : ["bad", "Oppressive"];
      cards.push(["Dew point", `${fmt(td)} <small>°C</small>`, tdr[0], tdr[1], "The temperature at which water starts to condense. Higher means stickier air."]);
      const hi = heatIndex(T, RH);
      if (hi == null) cards.push(["Heat index", "–", "ok", "Not needed", "Applies from about 27 °C. Below that the air temperature is what you feel."]);
      else { const hr = hi < 32 ? ["warn", "Caution"] : hi < 41 ? ["warn", "Extreme caution"] : hi < 54 ? ["bad", "Danger"] : ["bad", "Extreme danger"]; cards.push(["Heat index", `${fmt(hi)} <small>°C</small>`, hr[0], hr[1], "How hot it feels for people and animals when humidity is included."]); if (hr[0] === "bad") findings.push({level: "bad", text: `Heat index ${fmt(hi)} °C – ${hr[1]}.`}); }
      const mos = T >= 20 && T <= 32 && RH >= 60 ? ["bad", "High", "Warm and humid air favours mosquito activity and breeding."] : T >= 15 && T <= 35 && RH >= 50 ? ["warn", "Moderate", "Conditions allow mosquitoes. Watch standing water."] : ["ok", "Low", "Too cold or too dry for much mosquito activity."];
      cards.push(["Mosquito activity risk", mos[1], mos[0], "", mos[2] + " Rule of thumb."]);
      if (mos[0] !== "ok") findings.push({level: mos[0], text: `Mosquito activity risk is ${mos[1].toLowerCase()} (${fmt(T)} °C, ${fmt(RH)} % humidity).`});
      const fire = T >= 30 && RH < 30 ? ["bad", "High", "Hot, very dry air dries vegetation and lets fires spread fast."] : T >= 25 && RH < 40 ? ["warn", "Moderate", "Warm and dry. Be careful with open flames."] : ["ok", "Low", "Air is not hot and dry enough for elevated fire weather."];
      cards.push(["Fire-weather risk", fire[1], fire[0], "", fire[2] + " Rule of thumb."]);
      if (fire[0] !== "ok") findings.push({level: fire[0], text: `Fire-weather risk is ${fire[1].toLowerCase()} (${fmt(T)} °C, ${fmt(RH)} % humidity).`});
    } else cards.push(["Derived indicators", "–", "none", "", "Needs both temperature and humidity (dew point, heat index, mosquito and fire-weather risk)."]);
    $("#ederv").innerHTML = cards.map(([t, v, l, n, h]) => `<div class="sc" style="border-color:${lvCls(l)};color:${lvCls(l)}"><div style="color:var(--tx);font-weight:600">${t}</div><div class="sv">${v}</div>${n ? `<div style="font-weight:600">${n}</div>` : ""}<div class="mut" style="font-size:13px">${h}</div></div>`).join("");

    const overall = findings.length ? worstOf(...findings.map(f => f.level)) : "ok", any = keys.length > 0;
    findings.sort((p, q) => LVN[q.level] - LVN[p.level]);
    $("#esum").innerHTML = !any ? `<p class="mut">${ic("hourglass")}Waiting for data from the drone and the Raspberry Pi...</p>`
      : `<p class="msg" style="border-color:${lvCls(overall)};color:${lvCls(overall)};font-weight:700">${overall === "ok" ? ic("check") + "Conditions look normal" : overall === "warn" ? ic("warn") + "Needs attention" : ic("alert") + "Alert"}</p>` +
        (findings.length ? findings.map(f => `<p style="color:${lvCls(f.level)}">${f.level === "bad" ? ic("alert") : ic("warn")}${esc(f.text)}</p>`).join("") : `<p class="mut">No problems found in the current readings.</p>`) +
        `<p class="mut" style="font-size:13px">Values are the average of the stations that report them. Ratings use common comfort and safety ranges; risk indicators are simple rules of thumb from temperature and humidity.</p>`;
  };
  tick(); camTimer = setInterval(tick, 3000);
}

let labBest = null, labTimer = null, labBusy = false;
async function frames(file, n = 8) {                              // pick n evenly spaced frames from a video
  const v = document.createElement("video"); v.muted = true; v.src = URL.createObjectURL(file);
  await new Promise((ok, no) => { v.onloadedmetadata = ok; v.onerror = () => no(new Error("Could not read this video")); });
  const out = [];
  for (let i = 0; i < n; i++) {
    v.currentTime = v.duration * (i + .5) / n; await new Promise(r => v.onseeked = r);
    const c = document.createElement("canvas"); c.width = v.videoWidth; c.height = v.videoHeight; c.getContext("2d").drawImage(v, 0, 0);
    out.push(await new Promise(r => c.toBlob(r, "image/jpeg", .9)));
  }
  return out;
}
async function lab(a) {
  const d = await api("/api/ai/models");
  a.innerHTML = `<div class="card"><h2>${ic("lab")}AI Lab – manual recognition</h2>
  <select id="mdl">${d.categories.map(c => `<optgroup label="${c.icon} ${esc(c.name)}">${c.models.map(m => `<option value="${m.id}" ${m.installed ? "" : "disabled"}>${esc(m.name)}${m.installed ? "" : " (not installed)"}</option>`).join("")}</optgroup>`).join("")}</select>
  <div class="drop" id="drop">${ic("upload")}Drop an image or a video here, or tap to choose<input type="file" id="fi" accept="image/*,video/*" hidden></div>
  <div class="row" style="margin-top:10px"><button class="btn b" id="wcOn" type="button">${ic("cam")}Use webcam</button><button class="btn b" id="esOn" type="button">${ic("chip")}Use ESP32-CAM</button></div>
  <div id="wcbox" style="margin-top:12px"></div><div id="esbox" style="margin-top:12px"></div>
  <label class="chk"><input type="checkbox" id="auto"> ${ic("zap")}Send the result to the Telegram professionals automatically</label>
  <div id="prev"></div><div id="res"></div></div>`;
  const drop = $("#drop"), fi = $("#fi");
  drop.onclick = () => fi.click(); fi.onchange = () => fi.files[0] && analyse(fi.files[0]);
  drop.ondragover = e => { e.preventDefault(); drop.classList.add("over"); }; drop.ondragleave = () => drop.classList.remove("over");
  drop.ondrop = e => { e.preventDefault(); drop.classList.remove("over"); e.dataTransfer.files[0] && analyse(e.dataTransfer.files[0]); };
  $("#wcOn").onclick = startLabCam;
  $("#esOn").onclick = startEspCam;
}

/* ---------- AI Lab webcam: capture one frame, or analyse live every 3 s ---------- */
async function startLabCam() {
  const box = $("#wcbox");
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    box.innerHTML = `<p style="color:var(--r)">${ic("warn")}The webcam needs a secure page (https:// or localhost). Open the site that way, or upload a picture instead.</p>`; return;
  }
  stopCam(); $("#esbox").innerHTML = "";
  try {
    stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: {ideal: "environment"}, width: {ideal: 1280}}, audio: false});
  } catch (e) {
    box.innerHTML = `<p style="color:var(--r)">${ic("warn")}Webcam is not available or access was blocked. Allow the camera in your browser, or upload a picture instead.</p>`; return;
  }
  box.innerHTML = `<video id="wv" autoplay playsinline muted></video>
    <div class="row" style="margin-top:8px"><button class="btn g" id="wcSnap" type="button">${ic("cam")}Capture &amp; analyse</button><button class="btn" id="wcLive" type="button">${ic("play")}Start live</button><button class="btn r" id="wcOff" type="button">${ic("stop")}Turn off</button></div>`;
  $("#wv").srcObject = stream;
  const grab = () => new Promise(res => {
    const v = $("#wv"); if (!v || !v.videoWidth) return res(null);
    const c = document.createElement("canvas"); c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    c.toBlob(b => res(b ? new File([b], "webcam.jpg", {type: "image/jpeg"}) : null), "image/jpeg", 0.9);
  });
  $("#wcSnap").onclick = async () => { const f = await grab(); if (f) analyse(f, {cam: true}); };
  $("#wcLive").onclick = () => {
    const b = $("#wcLive");
    if (labTimer) { clearInterval(labTimer); labTimer = null; b.innerHTML = ic("play") + "Start live"; return; }
    b.innerHTML = ic("pause") + "Stop live";
    const step = async () => { if (labBusy) return; const f = await grab(); if (f) await analyse(f, {cam: true, live: true}); };
    step(); labTimer = setInterval(step, 3000);
  };
  $("#wcOff").onclick = () => { stopCam(); box.innerHTML = ""; };
}
/* ---------- AI Lab source 3: latest picture sent by the ESP32-CAM ---------- */
async function startEspCam() {
  const box = $("#esbox"); stopCam(); $("#wcbox").innerHTML = "";
  box.innerHTML = `<div class="row"><button class="btn g" id="esSnap" type="button">${ic("activity")}Analyse latest picture</button><button class="btn" id="esLive" type="button">${ic("play")}Auto-analyse new pictures</button><button class="btn r" id="esOff" type="button">${ic("stop")}Close</button></div>
    <p class="mut" id="esinfo">${ic("hourglass")}Connecting to the ESP32-CAM...</p><img id="esimg" alt="" style="max-width:100%;max-height:240px;display:none">`;
  let latest = null, auto = false, lastKey = null;
  const toFile = async src => { const b = await (await fetch(src)).blob(); return new File([b], "esp32cam.jpg", {type: b.type || "image/jpeg"}); };
  const key = d => (String(d.image).startsWith("data:") ? d.image.length + ":" + d.image.slice(-80) : d.image) + "|" + d.count;
  const poll = async () => {
    try {
      const d = await api("/api/cam/esp32/latest"), info = $("#esinfo"), img = $("#esimg"); if (!info) return;
      if (!d.image) { latest = null; img.style.display = "none"; info.innerHTML = `${ic("hourglass")}Waiting for the first picture from the ESP32-CAM...`; return; }
      latest = d; const k = key(d);
      if (img.dataset.k !== k) { img.src = d.image; img.dataset.k = k; }
      img.style.display = "";
      info.innerHTML = `Latest ESP32-CAM picture · ${d.age}s ago${d.age > 60 ? " (camera may be offline)" : ""}`;
      if (auto && !labBusy && k !== lastKey) { lastKey = k; await analyse(await toFile(d.image), {cam: true, live: true, tag: "ESP32-CAM"}); }
    } catch (e) { if (e.status === 401) { stopCam(); user = null; render(); } }
  };
  $("#esSnap").onclick = async () => {
    if (!latest) { $("#res").innerHTML = `<p style="color:var(--r)">${ic("warn")}No picture from the ESP32-CAM yet.</p>`; return; }
    try { await analyse(await toFile(latest.image), {cam: true, tag: "ESP32-CAM"}); }
    catch (e) { $("#res").innerHTML = `<p style="color:var(--r)">${ic("warn")}${esc(e.message)}</p>`; }
  };
  $("#esLive").onclick = () => {
    auto = !auto; lastKey = null;
    $("#esLive").innerHTML = auto ? ic("pause") + "Stop auto-analyse" : ic("play") + "Auto-analyse new pictures";
    if (auto) poll();
  };
  $("#esOff").onclick = () => { stopCam(); box.innerHTML = ""; };
  poll(); labTimer = setInterval(poll, 2500);
}
async function analyse(file, opts = {}) {
  if (labBusy) return; labBusy = true;
  const r = $("#res"), model = $("#mdl").value, vid = file.type.startsWith("video"); labBest = null;
  if (!opts.cam) $("#prev").innerHTML = vid ? `<video src="${URL.createObjectURL(file)}" controls muted style="max-width:100%;max-height:240px"></video>` : `<img src="${URL.createObjectURL(file)}" style="max-width:100%;max-height:240px">`;
  try {
    const blobs = vid ? await frames(file) : [file]; let best = null;
    for (const [i, b] of blobs.entries()) {
      if (!opts.live) r.innerHTML = `<p>${ic("activity")}Analysing ${i + 1}/${blobs.length}...</p>`;
      const fd = new FormData(); fd.append("model", model); fd.append("image", b, b.name || "frame.jpg");
      const x = await api("/api/recognize", {method: "POST", body: fd});
      if (!best || x.results[0].confidence > best.results[0].confidence) best = x;
    }
    labBest = best; const t = best.results[0];
    r.innerHTML = `<img src="${best.image}" style="max-width:100%;max-height:240px"><h2>${esc(t.label)} <span class="mut">${Math.round(t.confidence * 100)}%</span></h2><p class="mut">Model: ${esc(best.model)}${vid ? " · best of " + blobs.length + " frames" : ""}${opts.live ? " · live" : ""}${opts.tag ? " · " + esc(opts.tag) : ""}</p>` + bars(best.results) + infoCard(t.label) +
      `<button class="btn b" id="snd" style="margin-top:10px">${ic("send")}Send to Telegram professionals</button><p id="sfb"></p>`;
    $("#snd").onclick = () => sendBest();
    if ($("#auto").checked && !opts.live) await sendBest();   // live mode never auto-sends (would spam Telegram)
  } catch (e) {
    if (e.status === 401) { user = null; stopCam(); return render(); }
    r.innerHTML = `<p style="color:var(--r)">${ic("warn")}${esc(e.message)}</p>`;
  } finally { labBusy = false; }
}
async function sendBest() {
  const f = $("#sfb"); f.textContent = "Sending...";
  try { await post("/api/recognize/send", {id: labBest.id}); f.innerHTML = `${ic("check")}Sent. Professionals can reply on Telegram; see their answers on the ${ic("doctors")}Professionals page.`; }
  catch (e) { f.innerHTML = `<span style="color:var(--r)">${ic("warn")}${esc(e.message)}</span>`; }
}
const when = ts => new Date(ts * 1000).toLocaleString();
const msgs = (l, mine) => l.length ? l.map(m => `<div class="msg ${mine ? "mine" : ""}"><b>${esc(m.who)}</b> <span class="mut">${when(m.ts)}</span><br>${esc(m.text)}</div>`).join("") : '<p class="mut">Nothing yet.</p>';
function doctors(a) {
  a.innerHTML = `<div class="card"><h2>${ic("doctors")}Replies to you</h2><p class="mut" id="dnote"></p><div id="dmine"></div></div>
  <div class="card"><h3>${ic("mail")}Send a case to the professionals</h3><textarea id="dtxt" rows="3" placeholder="Describe the patient, bird, flock or situation (symptoms, first-level lab results...)"></textarea>
  <button class="btn g" id="dsend">${ic("send")}Send to Telegram</button><p id="dfb"></p></div>
  <div class="card"><h3>${ic("chat")}Group conversation</h3><div id="dgrp"></div></div>`;
  $("#dsend").onclick = async () => {
    try { await post("/api/tg/send", {text: $("#dtxt").value}); $("#dtxt").value = ""; $("#dfb").innerHTML = `${ic("check")}Sent.`; }
    catch (e) { $("#dfb").innerHTML = `<span style="color:var(--r)">${ic("warn")}${esc(e.message)}</span>`; }
  };
  const tick = async () => {
    try {
      const d = await api("/api/inbox"); if (!$("#dmine")) return;
      $("#dnote").innerHTML = `Professionals reach you by replying to your messages or writing <b>${esc(d.handle)}</b> in the Telegram group.` + (d.polling ? "" : ` ${ic("warn")}Telegram polling is off (TELEGRAM_POLL=0).`);
      $("#dmine").innerHTML = msgs(d.mine, true); $("#dgrp").innerHTML = msgs(d.group, false);
      if (d.unread) { await post("/api/inbox/seen", {}); unread = 0; nav(); }
    } catch (e) { if (e.status === 401) { user = null; render(); } }
  };
  tick(); camTimer = setInterval(tick, 8000);
}
async function quiz(a) {
  const d = await api("/api/quiz");
  a.innerHTML = `<div class="card"><h2>${ic("game")}Quiz time! Round ${rounds+1}</h2><p>Score: ${score} <span style="color:var(--y)">${ic("star","fill")}</span> &nbsp; <b>${esc(CFG.quiz_question)}</b></p>
  <div class="grid">${d.options.map(o => `<button class="food" style="cursor:pointer" data-o="${esc(o)}"><div class="e">${emoji(o)}</div>${esc(o)}</button>`).join("")}</div><p id="fb"></p></div>`;
  document.querySelectorAll("#app .grid button").forEach(b => b.onclick = async () => {
    document.querySelectorAll("#app .grid button").forEach(x => x.disabled = true);
    const r = await post("/api/quiz/answer", {choice:b.dataset.o}); rounds++;
    if (r.correct) { score++; stars = r.stars; }
    $("#fb").innerHTML = (r.correct ? `${ic("check")}Correct! +2 stars` : `${ic("x")}Not quite. The answer was <b>${esc(r.answer)}</b>.`) + `<br><button class="btn g" style="margin-top:8px" onclick="go('quiz')">Next${ic("next")}</button>`;
  });
}
function tips(a) {
  a.innerHTML = `<div class="card"><h2>${ic("bulb")}${esc(CFG.tips_title)}</h2><div style="line-height:1.7">${(CFG.tips || []).map(esc).join("<br>")}</div></div>` +
    (CFG.why_text ? `<div class="card"><h2>${esc(CFG.why_title)}</h2><p>${esc(CFG.why_text)}</p></div>` : "");
}
function me(a) {
  a.innerHTML = `<div class="card"><div class="big">${ic("user")}</div><h2 style="text-align:center">${esc(user)}</h2><p style="text-align:center;font-size:28px"><span style="color:var(--y)">${ic("star","fill")}</span>${stars} stars</p>
  <p class="mut" style="text-align:center">${stars>=20?ic("trophy")+"Master Poultry Keeper!":stars>=8?ic("star")+"Great Explorer!":"Keep exploring!"}</p>
  <div class="row"><button class="btn r" onclick="logout()">${ic("logout")}Log out</button><button class="btn b" onclick="document.getElementById('themeBtn').click()">${ic("moon")}Dark / ${ic("sun")}Light</button><button class="btn b" onclick="document.getElementById('langBtn').click()">${ic("globe")}English / አማርኛ / Afaan Oromoo</button></div></div>`;
}

/* ---------- Robot controller: hold to move, release to stop, autonomous toggle ---------- */
function robot(a) {
  a.innerHTML = `<div class="card"><h2>${ic("robot")}Robot control</h2>
    <p id="rst" class="mut">${ic("hourglass")}Connecting to the robot...</p>
    <p id="rwarn" style="color:var(--r);font-weight:bold"></p>
    <div id="rob" style="display:grid;grid-template-columns:repeat(3,84px);gap:10px;justify-content:center;margin:16px 0;touch-action:none;user-select:none">
      <span></span><button class="btn b rb" data-c="F" style="height:84px;font-size:28px">▲</button><span></span>
      <button class="btn b rb" data-c="L" style="height:84px;font-size:28px">◀</button>
      <button class="btn r" id="rstop" style="height:84px;font-size:28px">■</button>
      <button class="btn b rb" data-c="R" style="height:84px;font-size:28px">▶</button>
      <span></span><button class="btn b rb" data-c="B" style="height:84px;font-size:28px">▼</button><span></span>
    </div>
    <p class="mut" style="text-align:center">Hold a button (or arrow keys / WASD) to move. Release to stop. The robot will not drive forward into an obstacle.</p>
    <button class="btn g" id="rauto" style="width:100%">${ic("play")}Start autonomous mode</button></div>
    <div id="rmap"></div>
    <div class="card"><h3>${ic("cam")}Robot camera</h3>
      <div class="row"><button class="btn g" id="rlive">${ic("play")}Live video</button><button class="btn b" id="rphoto">${ic("image")}Photo</button><button class="btn b" id="rrec">Start recording</button></div>
      <img id="rcam" alt="" style="max-width:100%;max-height:360px;margin-top:10px;display:none">
      <p id="rcamt" class="mut"></p><p id="rrect" class="mut"></p><p id="rai" class="mut"></p></div>
    <div id="rpump"></div>
    <div id="rsens"></div>
    <div id="rhist"></div>`;
  
  mapPanel();
  pumpPanel();
  robotSensors();
  historyPanel("#rhist", "robot");

  let hold = null, busy = false, autoOn = false;

  let live = true;
  const setMode = m => {
    live = m === "live"; const img = $("#rcam");
    $("#rlive").className = "btn " + (live ? "g" : "b"); $("#rphoto").className = "btn " + (live ? "b" : "g");
    img.dataset.s = "";
    if (live) { img.src = "/api/robot/video?t=" + Date.now(); img.style.display = ""; $("#rcamt").textContent = "Live video"; }
    else { img.removeAttribute("src"); img.style.display = "none"; $("#rcamt").innerHTML = `${ic("hourglass")}Waiting for a picture...`; }
  };
  $("#rcam").onerror = () => { if (live) { $("#rcam").style.display = "none"; $("#rcamt").innerHTML = `${ic("warn")}Live video is not available. Check the Pi script, then press Live video again.`; } };
  $("#rlive").onclick = () => setMode("live");
  $("#rphoto").onclick = () => setMode("photo");
  setMode("live");

  let recOn = false;
  $("#rrec").onclick = async () => {
    const b = $("#rrec"), t = $("#rrect"); b.disabled = true;
    try {
      if (!recOn) {
        const r = await fetch("/api/robot/record/start", { method: "POST" });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || "Could not start");
        recOn = true; b.textContent = "Stop recording"; b.className = "btn g";
        t.textContent = "Recording... (max 2 minutes)";
      } else {
        t.textContent = "Stopping and sending to Telegram...";
        const r = await fetch("/api/robot/record/stop", { method: "POST" });
        const j = await r.json().catch(() => ({}));
        recOn = false; b.textContent = "Start recording"; b.className = "btn b";
        if (!r.ok) throw new Error(j.error || "Failed");
        t.textContent = "Video sent to Telegram.";
      }
    } catch (e) { t.textContent = "Error: " + e.message; }
    b.disabled = false;
  };

  const send = async c => {
    if (busy && c !== "S") return; busy = true;
    try { await post("/api/robot/cmd", {cmd: c}); if ($("#rwarn") && c !== "S") $("#rwarn").textContent = ""; }
    catch (e) { if (e.status === 401) { user = null; render(); } else if ($("#rwarn")) $("#rwarn").textContent = e.message; }
    finally { busy = false; }
  };
  const stopHold_ = () => { if (hold) { clearInterval(hold); hold = null; } };
  const stopHold = () => { if (hold) { stopHold_(); send("S"); } };
  const startHold = c => {
    if (autoOn) return; stopHold_(); send(c);
    hold = setInterval(() => $("#rob") ? send(c) : stopHold(), 150);   // keep-alive: the Arduino stops if this stops
  };

  document.querySelectorAll(".rb").forEach(b => {
    b.onpointerdown = e => { e.preventDefault(); startHold(b.dataset.c); };
    b.onpointerup = b.onpointerleave = b.onpointercancel = stopHold;
    b.oncontextmenu = e => e.preventDefault();
  });
  $("#rstop").onclick = () => { stopHold_(); send("S"); };

  const KEYS = {ArrowUp:"F", w:"F", ArrowDown:"B", s:"B", ArrowLeft:"L", a:"L", ArrowRight:"R", d:"R"};
  let keyHeld = null;
  const cleanup = () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  const kd = e => { if (!$("#rob")) return cleanup(); if (/^(INPUT|SELECT|TEXTAREA)$/.test((e.target || {}).tagName)) return; const c = KEYS[e.key]; if (c && keyHeld !== e.key) { e.preventDefault(); keyHeld = e.key; startHold(c); } };
  const ku = e => { if (e.key === keyHeld) { keyHeld = null; stopHold(); } };
  window.addEventListener("keydown", kd); window.addEventListener("keyup", ku);

  $("#rauto").onclick = async () => { stopHold_(); await send(autoOn ? "M" : "A"); tick(); };

  const tick = async () => {
    const st = $("#rst"); if (!st) return;
    try {
      const d = await api("/api/robot/status");
      autoOn = d.mode === "A";
      st.innerHTML = `<span class="pill" style="background:${d.online ? "var(--g)" : "var(--r)"}">${ic("dot","fill")}${d.online ? "Robot online" : "Robot offline"}</span> <span class="mut">Mode: <b>${autoOn ? "Autonomous" : "Manual"}</b> · Obstacle distance: <b>${d.distance ?? "–"} cm</b></span>`;
      $("#rwarn").innerHTML = d.online && d.distance != null && d.distance <= 10 ? `${ic("warn")}Obstacle ahead – forward is blocked` : "";
      $("#rauto").className = "btn " + (autoOn ? "r" : "g");
      $("#rauto").innerHTML = autoOn ? ic("stop") + "Stop autonomous mode" : ic("play") + "Start autonomous mode";
      document.querySelectorAll(".rb").forEach(b => b.disabled = autoOn);
    } catch (e) {
      if (e.status === 401) { user = null; render(); return; }
      st.innerHTML = `<span class="pill" style="background:var(--r)">${ic("dot","fill")}Robot offline</span> <span class="mut">${esc(e.message)}</span>`;
    }
    try {                                                      // AI result + photo mode
      const c = await api("/api/cam/pi/latest"), img = $("#rcam"); if (!img) return;
      $("#rai").textContent = c.label ? `AI sees: ${c.label} ${Math.round(c.confidence * 100)}%` : "";
      if (!live && c.image) { if (img.dataset.s !== c.image) { img.src = c.image; img.dataset.s = c.image; } img.style.display = ""; $("#rcamt").textContent = `Last picture ${c.age}s ago`; }
    } catch (e) {}
  };
  tick(); camTimer = setInterval(tick, 1000);
}

/* ---------- Robot page sensors: robot Uno (temperature + MAX30100 vitals) + Arduino Mega (sensors, MQ-135 gases) ----------
   REPLACE the whole existing block in app.js that starts with the comment "Robot page: Arduino Mega sensors ..." and ends with the
   closing } of function robotSensors() (just above init();) by this code. Needs the helpers already in app.js: fmt, spark, sicon, lvCol. */
const GAS_KEYS = ["co2_ppm", "nh3_ppm", "co_ppm", "alcohol_ppm", "toluene_ppm", "acetone_ppm", "mq_ratio", "gas"];
const ROBOT_KEYS = ["robot_temp", "robot_heart_rate", "robot_spo2"];

const sensorCard = s => {
  const pct = Math.max(0, Math.min(100, (s.value - s.min) / ((s.max - s.min) || 1) * 100));
  return `<div class="sc" style="border-color:${lvCol(s.level)};color:${lvCol(s.level)}"><div class="sl">${sicon(s)}<span>${esc(s.label)}</span></div>
    <div class="sv">${fmt(s.value)} <small>${esc(s.unit)}</small></div>
    <div class="bar"><i style="width:${pct}%;background:${lvCol(s.level)}"></i></div>${spark(s.spark)}${s.level == "stale" ? '<div class="mut" style="font-size:13px">no recent data</div>' : ""}</div>`;
};

function robotSensors() {
  const box = $("#rsens"); if (!box) return;
  box.innerHTML = `<div class="card"><h2>${ic("robot")}Robot sensors (Arduino Uno)</h2><div id="rrnote"></div></div>
    <div class="sg" id="rrg"></div>
    <div class="card"><h2>${ic("leaf")}Sensors (Arduino Mega)</h2><div id="rsst"></div><div id="rsal"></div></div>
    <div class="sg" id="rssg"></div>
    <div class="card"><h3>${ic("wind")}Gases (MQ-135)</h3>
      <p class="mut" style="margin-top:0">Estimates from one cross-sensitive sensor. Good for trends and alerts, not lab-grade numbers.</p><div id="rgnote"></div></div>
    <div class="sg" id="rsgg"></div>`;
  let timer = null;
  const tick = async () => {
    if (!$("#rsens")) { clearInterval(timer); return; }          // left the page
    try {
      const d = await api("/api/pi/sensors/latest"); if (!$("#rssg")) return;
      $("#rsst").innerHTML = d.count
        ? `<span class="pill" style="background:${d.online ? "var(--g)" : "var(--r)"}">${ic("dot", "fill")}${d.online ? "Live" : "Offline"}</span> <span class="mut">${d.device ? esc(d.device) + " · " : ""}last data ${d.age}s ago</span>`
        : `<p>${ic("hourglass")}Waiting for data from the Arduino boards...</p>`;
      $("#rsal").innerHTML = d.alerts.map(x => `<p style="color:${lvCol(x.level)};font-weight:bold">${x.level == "bad" ? ic("alert") : ic("warn")}${esc(x.text)}</p>`).join("");

      const pick = keys => keys.map(k => d.sensors.find(s => s.key === k)).filter(Boolean);
      const rob = pick(ROBOT_KEYS), gas = pick(GAS_KEYS);
      const other = d.sensors.filter(s => ![...ROBOT_KEYS, ...GAS_KEYS].includes(s.key));
      $("#rrg").innerHTML = rob.map(sensorCard).join("");
      $("#rssg").innerHTML = other.map(sensorCard).join("");
      $("#rsgg").innerHTML = gas.map(sensorCard).join("");

      // robot Uno: temperature always, heart rate + SpO2 only while a finger is on the MAX30100
      const robVit = rob.filter(s => s.key !== "robot_temp");
      $("#rrnote").innerHTML = !rob.length ? `<p class="mut">${ic("hourglass")}No data from the robot's Uno yet. Flash the new sketch and restart the Pi script.</p>`
        : robVit.some(s => s.level !== "stale") ? ""
        : `<p class="mut">${ic("hourglass")}Place a finger gently on the robot's MAX30100 and keep still. Heart rate and SpO2 appear after 10 to 20 seconds.</p>`;

      $("#rgnote").innerHTML = !gas.length ? `<p class="mut">${ic("hourglass")}No MQ-135 data yet.</p>`
        : gas.some(s => s.key === "co2_ppm") ? ""
        : `<p class="mut">${ic("hourglass")}Calibrating: the sensor warms up for 2 minutes, then measures clean air for 1 minute. Keep it in fresh air. Gas estimates appear after that.</p>`;
    } catch (e) {
      if (e.status === 401) { clearInterval(timer); user = null; render(); }
    }
  };
  tick(); timer = setInterval(tick, 2000);
}

/* ---------- Robot page: water pump, detection switches and servo (Arduino Mega) ----------
   1) PASTE this function above the last line of app.js (init();).
   2) In robot(), add  <div id="rpump"></div>  just before  <div id="rsens"></div>  in the template,
      and add the call  pumpPanel();  on the line before  robotSensors();  */
function pumpPanel() {
  const box = $("#rpump"); if (!box) return;
  box.innerHTML = `<div class="card"><h2>${ic("drop")}Water pump &amp; fire control</h2>
    <p id="pst" class="mut">${ic("hourglass")}Connecting to the sensor board...</p>
    <p id="pwarn" style="font-weight:bold"></p>
    <h3>Detection</h3>
    <p class="mut" style="margin-top:0">Detection only watches. The pump reacts to dry soil or fire only in Autonomous mode.</p>
    <div class="row"><button class="btn" id="psoil" type="button">Moisture detection</button><button class="btn" id="pflame" type="button">Flame detection</button></div>
    <h3>Pump mode</h3>
    <div class="row"><button class="btn" id="pauto" type="button">${ic("zap")}Autonomous</button><button class="btn" id="pman" type="button">${ic("user")}Manual</button></div>
    <div class="row" style="margin-top:10px"><button class="btn g" id="pon" type="button">${ic("play")}Pump ON</button><button class="btn r" id="poff" type="button">${ic("stop")}Pump OFF</button></div>
    <p class="mut" id="phint"></p>
    <h3>Servo (nozzle)</h3>
    <div class="row"><button class="btn" id="sup" type="button">▲ Up (90°)</button><button class="btn" id="sdown" type="button">▼ Down (0°)</button></div>
    <h3>Servo 2</h3>
    <div class="row"><button class="btn" id="s2up" type="button">▲ Up (90°)</button><button class="btn" id="s2down" type="button">▼ Down (0°)</button></div>
    <p id="perr" style="color:var(--r)"></p></div>`;

  let st = null, busy = false, timer = null;

  const send = async c => {
    if (busy) return; busy = true; $("#perr").textContent = "";
    try { await post("/api/pump/cmd", {cmd: c}); }
    catch (e) {
      if (e.status === 401) { clearInterval(timer); user = null; render(); return; }
      if ($("#perr")) $("#perr").textContent = e.message;
    }
    finally { busy = false; }
    setTimeout(poll, 700);                                   // the board reports its new state twice a second
  };
  $("#psoil").onclick = () => st && send(st.soil ? "SOIL OFF" : "SOIL ON");
  $("#pflame").onclick = () => st && send(st.flame ? "FLAME OFF" : "FLAME ON");
  $("#pauto").onclick = () => send("PUMP AUTO");
  $("#pman").onclick = () => send("PUMP MANUAL");
  $("#pon").onclick = () => send("PUMP ON");
  $("#poff").onclick = () => send("PUMP OFF");
  $("#sup").onclick = () => send("SERVO UP");
  $("#sdown").onclick = () => send("SERVO DOWN");
  $("#s2up").onclick = () => send("SERVO2 UP");
  $("#s2down").onclick = () => send("SERVO2 DOWN");

  const draw = () => {
    if (!$("#pst")) return;
    const on = !!(st && st.online), auto = !!(st && st.mode === "A");
    const dot = ic("dot", "fill");
    $("#pst").innerHTML = !st ? `${ic("hourglass")}Connecting to the sensor board...`
      : `<span class="pill" style="background:${on ? "var(--g)" : "var(--r)"}">${dot}${on ? "Sensor board online" : "Sensor board offline"}</span> ` +
        (on ? `<span class="pill" style="background:${st.pump ? "var(--g)" : "#555"}">${dot}Pump ${st.pump ? "ON" : "OFF"}</span> <span class="mut">Mode: <b>${auto ? "Autonomous" : "Manual"}</b> · Servo: <b>${st.servo === "U" ? "Up (90°)" : "Down (0°)"}</b> · Servo 2: <b>${st.servo2 === "U" ? "Up (90°)" : "Down (0°)"}</b></span>`
              : `<span class="mut">${esc(st.error || "Waiting for the Arduino Mega...")}</span>`);
    $("#pwarn").innerHTML = on && st.fire ? `<span style="color:var(--r)">${ic("alert")}Fire detected${auto ? " – the pump is started" : " – Manual mode, no automatic water"}</span>`
      : on && st.dry ? `<span style="color:var(--y)">${ic("warn")}Soil is dry${auto ? "" : " – Manual mode, no automatic water"}</span>` : "";

    const paint = (id, active, label, disabled) => {
      const b = $(id); if (!b) return;
      b.className = "btn " + (active ? "g" : "b"); b.disabled = disabled;
      if (label) b.innerHTML = label;
    };
    paint("#psoil", on && st.soil, `Moisture detection: ${on && st.soil ? "ON" : "OFF"}`, !on);
    paint("#pflame", on && st.flame, `Flame detection: ${on && st.flame ? "ON" : "OFF"}`, !on);
    paint("#pauto", on && auto, null, !on);
    paint("#pman", on && !auto, null, !on);
    $("#pon").disabled = !on || auto; $("#poff").disabled = !on || auto;
    paint("#sup", on && st.servo === "U", null, !on);
    paint("#sdown", on && st.servo === "D", null, !on);
    paint("#s2up", on && st.servo2 === "U", null, !on);
    paint("#s2down", on && st.servo2 === "D", null, !on);
    $("#phint").textContent = !on ? "" : auto
      ? "Autonomous: the pump starts by itself on dry soil or fire (only for detections that are ON). Switch to Manual to use Pump ON / OFF."
      : "Manual: use Pump ON / OFF for fire fighting or fertilizer. The pump stops by itself after 2 minutes. Detection still shows dry soil and fire, but nothing starts the pump.";
  };

  const poll = async () => {
    if (!$("#rpump")) { clearInterval(timer); return; }       // left the page
    try { st = await api("/api/pump/status"); }
    catch (e) {
      if (e.status === 401) { clearInterval(timer); user = null; render(); return; }
      st = {online: false, error: e.message};
    }
    draw();
  };
  poll(); timer = setInterval(poll, 1000);
}

/* ---------- Sensor history panel (CSV): full download + automatic Telegram report every 2 minutes ----------
   Used on the Drone page (src = "drone") and the Robot page (src = "robot", Arduino Uno + Mega together). */
const histTimers = {};
function historyPanel(sel, src) {
  const box = $(sel); if (!box) return;
  clearInterval(histTimers[src]);
  const name = src === "drone" ? "Drone" : "Robot", what = src === "drone" ? "drone (ESP8266)" : "robot (Arduino Uno + Mega)";
  box.innerHTML = `<div class="card"><h3>${ic("download")}${name} sensor history (CSV)</h3>
    <p class="mut" style="margin-top:0">Every reading of the ${what} sensors is saved with the date, time and the operator who activated the system. Download the whole history, or send the newest readings to the Telegram professionals automatically every 2 minutes so they can recommend actions.</p>
    <p id="hop-${src}" class="mut"></p>
    <div class="row"><a class="btn b" href="/api/history/export.csv?source=${src}" style="text-decoration:none;display:inline-block">${ic("download")}Download full history</a>
    <button class="btn" id="hrep-${src}" type="button">...</button></div>
    <p id="hst-${src}" class="mut"></p><p id="her-${src}" style="color:var(--r)"></p></div>`;
  let st = null, every = 120, op = null, busy = false;
  const draw = () => {
    if (!$("#hrep-" + src)) return;
    const on = !!(st && st.on);
    $("#hop-" + src).innerHTML = op ? `${ic("user")}Rows are tagged with operator <b>${esc(op)}</b>.` : `${ic("warn")}System on standby: rows are tagged "none". Activate the system on the Home page to record the operator name.`;
    $("#hrep-" + src).className = "btn " + (on ? "r" : "g");
    $("#hrep-" + src).innerHTML = on ? ic("stop") + "Stop automatic Telegram report" : ic("send") + `Send CSV to Telegram every ${Math.round(every / 60)} min`;
    $("#hst-" + src).innerHTML = !st ? "" : on
      ? `${ic("hourglass")}Next report in <b>${st.next_in}s</b>${st.last_age != null ? ` · last sent ${st.last_age}s ago` : ""}`
      : `Automatic report is off${st.last_age != null ? ` · last sent ${st.last_age}s ago` : ""}.`;
    $("#her-" + src).innerHTML = st && st.error ? ic("warn") + esc(st.error) : "";
  };
  const poll = async () => {
    if (!$("#hrep-" + src)) { clearInterval(histTimers[src]); return; }
    try { const d = await api("/api/history/report"); st = d.sources[src]; every = d.every; op = d.operator; }
    catch (e) { if (e.status === 401) { clearInterval(histTimers[src]); user = null; render(); return; } }
    draw();
  };
  $("#hrep-" + src).onclick = async () => {
    if (busy) return; busy = true; $("#her-" + src).textContent = "";
    try { await post("/api/history/report", {source: src, on: !(st && st.on)}); }
    catch (e) { if ($("#her-" + src)) $("#her-" + src).innerHTML = ic("warn") + esc(e.message); }
    finally { busy = false; }
    poll();
  };
  poll(); histTimers[src] = setInterval(poll, 2000);
}

/* ---------- Robot page: Mapping mode (operator enters direction + cm, robot drives the path) ---------- */
function mapPanel() {
  const box = $("#rmap"); if (!box) return;
  const DIR = {F: "Forward", B: "Backward", L: "Left", R: "Right"}, ARW = {F: "▲", B: "▼", L: "◀", R: "▶"};
  let steps = [], st = null, timer = null, busy = false;
  try { const x = JSON.parse(localStorage.getItem("dy-path") || "[]"); if (Array.isArray(x)) steps = x.filter(s => DIR[s.dir] && s.cm >= 1 && s.cm <= 500).slice(0, 30); } catch (e) {}
  const save = () => { try { localStorage.setItem("dy-path", JSON.stringify(steps)); } catch (e) {} };
  box.innerHTML = `<div class="card"><h2>${ic("pin")}Mapping mode</h2>
    <p class="mut" style="margin-top:0">Build a route: choose a direction and a distance, add the step, then press Run. Forward and Backward drive straight. Left and Right turn 90° on the spot and then drive the distance. The robot cancels a forward move if an obstacle blocks it. Works in Manual mode.</p>
    <div class="row"><select id="mdir">${Object.keys(DIR).map(k => `<option value="${k}">${ARW[k]} ${DIR[k]}</option>`).join("")}</select>
      <input id="mcm" type="number" min="1" max="500" step="1" placeholder="Distance (cm)">
      <button class="btn b" id="madd" type="button">${ic("check")}Add step</button></div>
    <div id="mlist"></div><div id="mprev"></div>
    <div class="row" style="margin-top:10px"><button class="btn g" id="mrun" type="button">${ic("play")}Run path</button><button class="btn r" id="mstop" type="button">${ic("stop")}Stop</button><button class="btn" id="mclr" type="button">${ic("x")}Clear</button></div>
    <p id="mst" class="mut"></p><p id="merr" style="color:var(--r)"></p>
    <p class="mut" style="font-size:13px">Accuracy depends on calibration: set ROBOT_CM_PER_SEC and ROBOT_TURN90_SEC in the Pi script.</p></div>`;

  const preview = () => {                                       // top-down sketch of the route; the robot starts at the green dot facing up
    if (!steps.length) return "";
    const dx = [0, 1, 0, -1], dy = [-1, 0, 1, 0]; let x = 0, y = 0, h = 0, total = 0; const pts = [[0, 0]];
    for (const s of steps) { if (s.dir === "L") h = (h + 3) % 4; if (s.dir === "R") h = (h + 1) % 4; const k = s.dir === "B" ? -1 : 1; x += dx[h] * k * s.cm; y += dy[h] * k * s.cm; total += s.cm; pts.push([x, y]); }
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys);
    const w = Math.max(Math.max(...xs) - x0, 1), hh = Math.max(Math.max(...ys) - y0, 1), sc = Math.min(260 / w, 160 / hh);
    const P = pts.map(([a, b]) => [(20 + (a - x0) * sc).toFixed(1), (20 + (b - y0) * sc).toFixed(1)]);
    return `<svg viewBox="0 0 300 200" style="width:100%;max-width:360px;display:block;margin:10px auto 0"><polyline points="${P.map(p => p.join(",")).join(" ")}" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="${P[0][0]}" cy="${P[0][1]}" r="5" fill="var(--g)"/><circle cx="${P[P.length - 1][0]}" cy="${P[P.length - 1][1]}" r="5" fill="var(--r)"/></svg>
      <p class="mut" style="text-align:center;margin:4px 0 0">${steps.length} steps · ${Math.round(total)} cm driven in total</p>`;
  };
  const draw = () => {
    if (!$("#mlist")) return;
    const r = !!(st && st.running);
    $("#mlist").innerHTML = steps.length ? steps.map((s, i) => `<div class="msg" style="display:flex;align-items:center;gap:10px"><b>${i + 1}.</b><span style="flex:1">${ARW[s.dir]} ${DIR[s.dir]} · ${s.cm} cm</span><button class="btn" data-del="${i}" type="button" ${r ? "disabled" : ""}>${ic("x")}</button></div>`).join("") : `<p class="mut">No steps yet.</p>`;
    $("#mlist").querySelectorAll("[data-del]").forEach(b => b.onclick = () => { steps.splice(+b.dataset.del, 1); save(); draw(); });
    $("#mprev").innerHTML = preview();
    $("#mrun").disabled = r || !steps.length; $("#mclr").disabled = r; $("#madd").disabled = r || steps.length >= 30;
    $("#mst").innerHTML = !st ? "" : r ? `<span class="pill" style="background:var(--g)">${ic("dot", "fill")}Running</span> ${esc(st.message)}`
      : st.result === "done" ? `${ic("check")}${esc(st.message)}`
      : st.result === "failed" || st.result === "stopped" ? `<span style="color:var(--y)">${ic("warn")}${esc(st.message)}</span>` : "";
  };
  const poll = async () => {
    if (!$("#rmap")) { clearInterval(timer); return; }
    try { st = await api("/api/robot/path/status"); }
    catch (e) { if (e.status === 401) { clearInterval(timer); user = null; render(); return; } st = null; }
    draw();
  };
  const call = async (url, body) => {
    if (busy) return; busy = true; $("#merr").textContent = "";
    try { await post(url, body || {}); }
    catch (e) { if (e.status === 401) { clearInterval(timer); user = null; render(); return; } if ($("#merr")) $("#merr").textContent = e.message; }
    finally { busy = false; }
    setTimeout(poll, 300);
  };
  $("#madd").onclick = () => {
    const cm = Math.round(+$("#mcm").value * 10) / 10;
    if (!(cm >= 1 && cm <= 500)) { $("#merr").textContent = "Enter a distance from 1 to 500 cm."; return; }
    $("#merr").textContent = ""; steps.push({dir: $("#mdir").value, cm}); save(); $("#mcm").value = ""; draw();
  };
  $("#mcm").onkeydown = e => { if (e.key === "Enter") $("#madd").click(); };
  $("#mrun").onclick = () => call("/api/robot/path/run", {steps});
  $("#mstop").onclick = () => call("/api/robot/path/stop");
  $("#mclr").onclick = () => { steps = []; save(); draw(); };
  draw(); poll(); timer = setInterval(poll, 1000);
}

/* ====================== Problem knowledge base: what it is / why it happens / how to handle it ======================
   Matched by words in the class name (regex, first match wins), so it works with any model's labels.
   Each language: [name, what it is, why it happens, how to handle it]. Add your own classes by adding entries. */
const KBU = {
  what:   {en: "What it is:", am: "ምንድን ነው፦", om: "Maal akka ta'e:"},
  cause:  {en: "Why it happens:", am: "ለምን ይከሰታል፦", om: "Maaliif akka ta'u:"},
  handle: {en: "How to handle it:", am: "እንዴት መቆጣጠር ይቻላል፦", om: "Akkamitti to'atamu:"},
  note:   {en: "Advice only. For doses and approved products, ask your local veterinary or agricultural office, Development Agent or a doctor.",
           am: "ይህ ምክር ብቻ ነው። ስለ መጠንና ስለተፈቀዱ ምርቶች የአካባቢዎን የእንስሳት ሕክምና ወይም የግብርና ጽሕፈት ቤት፣ የልማት ሠራተኛ ወይም ሐኪም ይጠይቁ።",
           om: "Gorsa qofa dha. Madaala fi oomisha eeyyamame waajjira fayyaa horii/qonnaa naannoo kee, Hojjetaa Misooma (DA) ykn doktara gaafadhaa."}
};
const KB = [
  {re: /healthy|fresh|normal|no[ _-]?(fire|smoke|flame|disease)|\bsafe\b/i, icon: "check", t: {
    en: ["Looks healthy / normal", "No problem was found in this picture.", "The plant, animal or area looks in good condition because of good care and suitable weather, soil and water.", "Keep checking regularly. Keep the area clean, give water and nutrients on time, and take a new clear photo in good daylight if you are not sure."],
    am: ["ጤናማ / መደበኛ ይመስላል", "በዚህ ፎቶ ላይ ምንም ችግር አልተገኘም።", "ጥሩ እንክብካቤና ተስማሚ የአየር ሁኔታ፣ አፈርና ውሃ በመኖሩ ተክሉ፣ እንስሳው ወይም አካባቢው በጥሩ ሁኔታ ላይ ይመስላል።", "በየጊዜው ይመልከቱ። አካባቢውን ንጹህ ያድርጉ፣ ውሃና ንጥረ ነገር በጊዜው ይስጡ፤ እርግጠኛ ካልሆኑ በጥሩ የቀን ብርሃን ግልጽ ፎቶ እንደገና ያንሱ።"],
    om: ["Fayyaa qabeessa / Idilee fakkaata", "Suuraa kana keessatti rakkoon tokko hin argamne.", "Biqiltuun, horiin ykn naannoon kun kunuunsa gaarii fi haala qilleensaa, biyyoo fi bishaan ga'aa waan qabuuf haala gaarii irra jira.", "Yeroo yeroon ilaalaa. Naannoo qulqulluu eegaa, bishaan fi nyaata biqiltuu yeroon kennaa; yoo mirkaneeffachuu baatan, suuraa ifaa ifa guyyaa keessatti irra deebi'ee kaasaa."]}},
  {re: /fire|flame|smoke|burn/i, icon: "alert", t: {
    en: ["Fire / smoke danger", "The picture shows fire, flames or smoke. This is an emergency.", "Fires start from open flames, sparks, hot dry weather with dry grass or crops, electrical faults, or burning waste.", "Keep people and animals away and call the emergency services or the kebele/local leaders now. If it is small, smother it with soil, sand or a wet cloth; do not use water on an oil or electrical fire. Never put yourself in danger."],
    am: ["የእሳት / ጭስ አደጋ", "ፎቶው እሳት፣ ነበልባል ወይም ጭስ ያሳያል። ይህ አስቸኳይ ሁኔታ ነው።", "እሳት የሚነሳው ከክፍት እሳት፣ ከፍንጣሪ፣ ደረቅ ሳርና ሰብል ካለበት ሞቃትና ደረቅ የአየር ሁኔታ፣ ከኤሌክትሪክ ብልሽት ወይም ቆሻሻ በማቃጠል ነው።", "ሰዎችንና እንስሳትን ከቦታው ያርቁ፤ ወዲያውኑ የአደጋ ጊዜ አገልግሎትን ወይም የቀበሌ/የአካባቢ መሪዎችን ያስጠሩ። እሳቱ ትንሽ ከሆነ በአፈር፣ በአሸዋ ወይም በርጥብ ጨርቅ ያንቁት፤ በዘይት ወይም በኤሌክትሪክ እሳት ላይ ውሃ አያፍሱ። ራስዎን ለአደጋ አያጋልጡ።"],
    om: ["Balaa ibiddaa / aaraa", "Suuraan kun ibidda, arraba ibiddaa ykn aara agarsiisa. Kun haala hatattamaa dha.", "Ibiddi kan jalqabu ibidda banaa, qilleensa hoo'aa fi gogaa marga ykn midhaan goge waliin, balleessaa elektirikii ykn qabeenya gubuu irraati.", "Namoota fi horii fageessaa; battaluma sana tajaajila hatattamaa ykn geggeessitoota gandaa waamaa. Yoo xiqqaa ta'e biyyoo, cirracha ykn huccuu jiidhaan cuqaasaa; ibidda zayitaa ykn elektirikii irratti bishaan hin naquun. Of balaa irra hin kaa'inaa."]}},
  {re: /mosquito|aedes|anopheles|culex/i, icon: "warn", t: {
    en: ["Mosquito detected", "A mosquito was found. Some mosquitoes spread malaria, dengue and other diseases through their bites.", "Mosquitoes breed in standing water such as puddles, old containers, tyres, blocked drains and water tanks, especially in warm, humid weather.", "Remove or empty standing water every few days, cover water containers, clear drains, sleep under an insecticide-treated net, and use window screens. If someone has fever, chills or headache, go to the nearest health centre for a malaria test."],
    am: ["ትንኝ ተገኝቷል", "ትንኝ ተገኝቷል። አንዳንድ ትንኞች በንክሻቸው ወባንና ሌሎች በሽታዎችን ያሰራጫሉ።", "ትንኞች የሚራቡት በቆመ ውሃ ውስጥ ነው፤ ለምሳሌ በኩሬ፣ በአሮጌ ዕቃዎች፣ በጎማ፣ በተደፈነ ቦይና በውሃ ታንክ፣ በተለይ ሞቃትና እርጥበት ባለው የአየር ሁኔታ።", "የቆመ ውሃን በየጥቂት ቀናት ያስወግዱ ወይም ያፍስሱ፤ የውሃ መያዣዎችን ይሸፍኑ፤ ቦዮችን ያጽዱ፤ በፀረ ተባይ በተነከረ አጎበር ውስጥ ይተኙ፤ የመስኮት መከላከያ መረብ ይጠቀሙ። ትኩሳት፣ ብርድ ብርድ ማለት ወይም ራስ ምታት ያለበት ሰው ለወባ ምርመራ በአቅራቢያው ወደሚገኝ ጤና ጣቢያ ይሂድ።"],
    om: ["Hantuutni argameera", "Hantuutni tokko argameera. Hantuutonni tokko tokko ciniinsa isaaniin busaa (malaariyaa) fi dhukkuboota biroo facaasu.", "Hantuutonni bishaan dhaabbataa keessatti horatu: boolla bishaanii, qodaa duraanii, taayirii, daandii bishaanii cufame fi tankii bishaanii keessatti; keessumaa yeroo hoo'aa fi jiidhaa.", "Bishaan dhaabbatu guyyaa muraasa muraasaan dhangalaasaa; qodaa bishaanii haguugaa; daandii bishaanii qulqulleessaa; kidoo qoricha ajjeesaan dhiqame jala rafaa; foddaa foddaa mana irra kaa'aa. Namni qorraa qaamaa, hoo'a ykn mataa dhukkubbii qabu qorannoo busaaf buufata fayyaa dhiyootti haa deemu."]}},
  {re: /\bfly\b|flies|housefly|tsetse/i, icon: "warn", t: {
    en: ["Fly detected", "A fly was found. Flies are not as dangerous as mosquitoes, but they carry germs from dirt and waste to food, water and animals.", "Flies gather and breed around rubbish, animal dung, rotting food and open waste.", "Cover food and water, keep rubbish in closed bins, clean animal pens and remove dung often, and keep toilets clean. Wash hands before eating."],
    am: ["ዝንብ ተገኝቷል", "ዝንብ ተገኝቷል። ዝንብ እንደ ትንኝ አደገኛ አይደለም፤ ሆኖም ከቆሻሻና ከሰገራ ጀርሞችን ወደ ምግብ፣ ውሃና እንስሳት ያስተላልፋል።", "ዝንቦች የሚሰበሰቡትና የሚራቡት በቆሻሻ፣ በእንስሳት ፍግ፣ በሚበሰብስ ምግብና ክፍት በሆነ ቆሻሻ አካባቢ ነው።", "ምግብና ውሃ ይሸፍኑ፤ ቆሻሻን በተዘጋ መጣያ ያስቀምጡ፤ የእንስሳት በረትን ያጽዱ፤ ፍግን በየጊዜው ያስወግዱ፤ መጸዳጃ ቤትን ንጹህ ያድርጉ። ከመመገብ በፊት እጅዎን ይታጠቡ።"],
    om: ["Kileen argameera", "Kileen tokko argameera. Kileen akka hantuutaa hamaa miti, garuu xuraa'aa fi kosii irraa maashaa nyaata, bishaan fi horii irratti fida.", "Kileen naannoo kosii, citaa horii, nyaata ruqate fi kosii banaa irratti walitti qabamtee horatti.", "Nyaata fi bishaan haguugaa; kosii mukaa cufaa keessa kaa'aa; dhaaba horii qulqulleessaa; citaa yeroo yeroon baasaa; mana fincaanii qulqulluu eegaa. Osoo nyaachuu hin jalqabin harka dhiqadhaa."]}},
  {re: /cocci|eimeria/i, icon: "warn", t: {
    en: ["Coccidiosis (Cocci)", "A gut disease of chickens caused by tiny parasites (Eimeria). Birds pass bloody or watery droppings, look weak with ruffled feathers, eat less and grow slowly. Chicks can die quickly if untreated.", "Birds swallow parasite eggs from wet, dirty litter, feed or water. It spreads fast in damp, crowded houses, especially among young chicks.", "Separate the sick birds and ask a veterinarian or animal-health worker for an anticoccidial drug (such as amprolium or toltrazuril in the drinking water) and vitamins. Keep the litter dry, replace wet litter, avoid crowding, raise the drinkers so they do not spill, and clean the house between flocks."],
    am: ["ኮክሲዲዮሲስ (Cocci)", "በጥቃቅን ጥገኛ ተሕዋስያን (Eimeria) የሚመጣ የዶሮ አንጀት በሽታ ነው። ዶሮዎች ደም የቀላቀለ ወይም ውሃማ ሰገራ ያወጣሉ፣ ደካማ ይሆናሉ፣ ላባቸው ይቆማል፣ ምግብ ያንሳሉ፣ በዝግታ ያድጋሉ። ሳይታከሙ ከቀሩ ጫጩቶች በፍጥነት ይሞታሉ።", "ዶሮዎች የጥገኛ ተሕዋስያን እንቁላሎችን ከእርጥብና ከቆሸሸ አልጋ (ሊተር)፣ ምግብ ወይም ውሃ ይውጣሉ። በእርጥብና በተጨናነቀ ቤት፣ በተለይ በጫጩቶች መካከል በፍጥነት ይሰራጫል።", "የታመሙትን ለይተው የእንስሳት ሐኪም ወይም የእንስሳት ጤና ባለሙያ ያማክሩ፤ ፀረ-ኮክሲዲያ መድኃኒት (እንደ አምፕሮሊየም ወይም ቶልትራዙሪል በመጠጥ ውሃ) እና ቫይታሚን ይሰጣሉ። አልጋውን ደረቅ ያድርጉ፣ የረጠበውን ይቀይሩ፣ መጨናነቅን ያስወግዱ፣ የውሃ እቃውን ከፍ ያድርጉ፣ በእያንዳንዱ መንጋ መካከል ቤቱን ያጽዱ።"],
    om: ["Dhukkuba Koksiidiyoosisii (Cocci)", "Dhukkuba mormaa lukkuu raammoo xixiqqaa (Eimeria) irraa dhufuu dha. Lukkuun fix dhiiga qabu ykn bishaan fakkaatu baasti, dadhabdi, baallii ishee ni ol-qabsiifti, nyaata hir'ifti, suuta guddatti. Yoo hin ricitamne ceeraan ariitiin du'a.", "Lukkuun hanqaaquu raammoo laga (liitarii) jiidhaa fi xuraa'aa, nyaata ykn bishaan irraa liqimsiti. Mana jiidhaa fi guutame keessatti, keessumaa ceera irratti, saffisaan babal'ata.", "Kan dhukkubsate adda baasaa; ogeessa fayyaa horii ykn doktara bineensaa waliin mari'adhaa; qoricha koksiidiyaa (fkn amprooliyeemii ykn toltraazuriil bishaan dhugaatii keessa) fi vitaamiinii kennaa. Laga gogaa eegaa, kan jiidhe jijjiiraa, guutamuu irraa of eegaa, qodaa bishaanii ol kaa'aa, tuuta tokko booda tokko mana qulqulleessaa."]}},
  {re: /\bncd\b|newcastle/i, icon: "alert", t: {
    en: ["Newcastle disease (NCD)", "A very contagious virus disease of chickens. Signs: gasping and coughing, green watery droppings, twisted neck, paralysis, fewer or soft-shelled eggs and sudden deaths of many birds.", "It is caused by a virus that spreads through the air, droppings, people's shoes and hands, cages and equipment, wild birds and new birds brought into the flock.", "There is no cure. Isolate sick birds at once, tell the veterinary office, do not sell or move birds, and bury or burn dead birds. Vaccinate the whole flock on schedule (LaSota or Hitchner B1) and keep strong biosecurity: footbath, no visitors, and keep new birds apart for 2 weeks before mixing."],
    am: ["ፈንግል በሽታ (NCD / ኒውካስል)", "በጣም ተላላፊ የዶሮ ቫይረስ በሽታ ነው። ምልክቶች፦ ትንፋሽ ማጠር፣ ማሳል፣ አረንጓዴ ውሃማ ሰገራ፣ የተጠማዘዘ አንገት፣ ሽባነት፣ የእንቁላል መቀነስ ወይም ለስላሳ ቅርፊት ያላቸው እንቁላሎችና በድንገት ብዙ ዶሮ መሞት።", "በአየር፣ በሰገራ፣ በሰዎች ጫማና እጅ፣ በቅርጫትና በመሳሪያ፣ እንዲሁም በዱር አእዋፍና ወደ መንጋው በሚገቡ አዳዲስ ዶሮዎች በሚተላለፍ ቫይረስ ይከሰታል።", "ፈውስ የለውም። የታመሙትን ወዲያውኑ ይለዩ፣ ለእንስሳት ጤና ጽሕፈት ቤት ያሳውቁ፣ ዶሮ አይሽጡ አያዘዋውሩ፣ የሞቱትን ይቅበሩ ወይም ያቃጥሉ። መላውን መንጋ በጊዜ ሰሌዳ ይከትቡ (ላሶታ ወይም ሂችነር B1) እና ጥብቅ የንጽህና ጥበቃ ያድርጉ፦ የእግር መታጠቢያ፣ ጎብኚዎችን መከልከል፣ አዲስ ዶሮ ለ2 ሳምንት ለይቶ ማቆየት።"],
    om: ["Dhukkuba Niikaasil (NCD)", "Dhukkuba vaayirasii lukkuu baay'ee ittiin walqabatu. Mallattoon: hargansuu fi qufaa, fix magariisa bishaan fakkaatu, morma maxxanaa'e, cinqamuu, hanqina uumaa ykn uumaa qola laaffisaa qabu, fi lukkuu baay'ee tasa du'uu.", "Vaayirasii qilleensa, fix, kophee fi harka namaa, meeshaalee, simbirroota bosonaa fi lukkuu haaraa tuuta keessa galchamuun babal'atuun dhufa.", "Qoricha hin qabu. Kan dhukkubsate battalumatti adda baasaa, waajjira fayyaa horii beeksisaa, lukkuu hin gurguraninaa hin geejjibsiisinaa, kan du'e awwaalaa ykn gubaa. Tuuta guutuu sagantaa irratti talaalaa (LaSota ykn Hitchner B1) fi eegumsa nageenyaa cimaa gochaa: bishaan miila dhiqachuu, daawwattoota dhorkuu, lukkuu haaraa torban 2 adda baasanii eegaa."]}},
  {re: /salmo|pullorum|typhoid/i, icon: "warn", t: {
    en: ["Salmonellosis / Pullorum (Salmo)", "A bacterial disease. Chicks have chalky white droppings stuck to the vent, are sleepy and huddle together, and many die in the first weeks. Older birds can show swollen joints and lay fewer eggs.", "It passes from the hen to the egg and through dirty feed and water, rodents and wild birds. Recovered birds may stay carriers.", "Isolate sick birds and ask a veterinarian for the right antibiotic after testing. Buy chicks only from clean, certified hatcheries, protect feed and water from rats and wild birds, keep the house clean and dry, wash your hands, and do not breed from carrier birds. Salmonella can also infect people, so cook eggs and meat well."],
    am: ["ሳልሞኔሎሲስ / ፑሎረም (Salmo)", "በባክቴሪያ የሚመጣ በሽታ ነው። ጫጩቶች ፊንጢጣቸው ላይ የሚጣበቅ ኖራ መሰል ነጭ ሰገራ ያወጣሉ፣ ይተኛሉ፣ ይኮለኮላሉ፣ በመጀመሪያዎቹ ሳምንታት ብዙዎቹ ይሞታሉ። ትላልቅ ዶሮዎች የተነፉ መገጣጠሚያዎችና የእንቁላል መቀነስ ሊታይባቸው ይችላል።", "ከዶሮዋ ወደ እንቁላል፣ እንዲሁም በቆሸሸ ምግብና ውሃ፣ በአይጦችና በዱር አእዋፍ ይተላለፋል። ያገገሙ ዶሮዎች አስተላላፊ ሆነው ሊቀጥሉ ይችላሉ።", "የታመሙትን ይለዩና ከምርመራ በኋላ ትክክለኛ አንቲባዮቲክ ለማግኘት የእንስሳት ሐኪም ያማክሩ። ጫጩቶችን ከንጹህና ከተረጋገጡ ማስፈልፈያዎች ብቻ ይግዙ፣ ምግብና ውሃን ከአይጥና ከዱር አእዋፍ ይጠብቁ፣ ቤቱን ንጹህና ደረቅ ያድርጉ፣ እጅ ይታጠቡ፣ አስተላላፊ ዶሮዎችን ለዘር አይጠቀሙ። ሳልሞኔላ ሰውንም ሊይዝ ስለሚችል እንቁላልና ስጋ በደንብ ያብስሉ።"],
    om: ["Dhukkuba Saalmoonelaa / Pulloorum (Salmo)", "Dhukkuba baakteeriyaan dhufuu dha. Ceeraan fix adii daakuu fakkaatu iddoo fix baasan irratti maxxanu baasu, rafu, walitti tuta, torban jalqabaa keessatti baay'een isaanii du'u. Lukkuun guddattuu cinaacha bobba'aa fi hanqina uumaa agarsiisuu mala.", "Lukkuu irraa gara uumaatti, akkasumas nyaata fi bishaan xuraa'aa, bineensota xixiqqaa fi simbirroota bosonaa dhaan dabarfama. Lukkuun fayyite baatu ta'uu mala.", "Kan dhukkubsate adda baasaa; qorannoo booda qoricha antiibaayootikii sirrii doktara bineensaa gaafadhaa. Ceera naannoo qulqulluu fi mirkanaa'e irraa qofa bitaa, nyaata fi bishaan bineensota xixiqqaa fi simbirroo irraa eegaa, mana qulqulluu fi gogaa taasisaa, harka dhiqadhaa, lukkuu baatu sanyiif hin fayyadaminaa. Saalmoonelaan namas qabuu waan danda'uuf, uumaa fi foon gaarii bilcheessaa."]}},
];
const kbFind = label => KB.find(e => e.re.test(String(label))) || null;
function kbHtml(label) {
  const e = kbFind(label); if (!e) return "";
  const [name, what, cause, handle] = e.t[lang] || e.t.en;
  return `<h3 style="margin:0 0 8px">${ic(e.icon)}${esc(name)}</h3>
    <p><b>${KBU.what[lang]}</b> ${esc(what)}</p><p><b>${KBU.cause[lang]}</b> ${esc(cause)}</p><p><b>${KBU.handle[lang]}</b> ${esc(handle)}</p>
    <p class="mut" style="font-size:13px;margin-bottom:0">${esc(KBU.note[lang] || KBU.note.en)}</p>`;
}
/* put <div class="kb"> under a result; it is (re)filled in the current language, also when the language is switched */
const infoCard = label => kbFind(label) ? `<div class="card kb" data-l="${esc(label)}" style="margin:12px 0 0;text-align:left"></div>` : "";
function fillKb(root) {
  const els = [];
  if (root.matches && root.matches(".kb")) els.push(root);
  if (root.querySelectorAll) els.push(...root.querySelectorAll(".kb"));
  els.forEach(el => { if (el.dataset.lang === lang) return; el.innerHTML = kbHtml(el.dataset.l); el.dataset.lang = lang; });
}

/* ====================== Languages: English / አማርኛ (Amharic) / Afaan Oromoo ======================
   The page is written in English. This layer translates every piece of text on screen (also text that changes every
   second) from the tables below, so it works on all pages. Anything not in a table simply stays in English.
   To fix or add a translation: add or edit a row in DICT  ["English text", "Amharic", "Afaan Oromoo"]. */
const LANGS = {
  en: ["EN", "English"],
  am: ["አማ", "አማርኛ"],
  om: ["OM", "Afaan Oromoo"],
  so: ["SO", "Soomaali"],
  ar: ["ع", "العربية"],
  ti: ["ትግ", "ትግርኛ"]
};
let lang = "en"; try { lang = localStorage.getItem("dy-lang") || "en"; } catch (e) {}
if (!LANGS[lang]) lang = "en";
I.globe = '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>';

const DICT = new Map();
[
  /* ---- menu + home ---- */
  ["Home", "መነሻ", "Jalqaba"], ["AI Lab", "የኤአይ ላብራቶሪ", "Laabii AI"], ["Professionals", "ባለሙያዎች", "Ogeessota"], ["Drone", "ድሮን", "Dirooni"],
  ["Robot", "ሮቦት", "Roobotii"], ["Environment", "አካባቢ", "Naannoo"], ["ESP32 Cam", "ESP32 ካሜራ", "Kaameraa ESP32"], ["Pi Cam", "Pi ካሜራ", "Kaameraa Pi"],
  ["Me", "የእኔ", "Kiyya"], ["Exit", "ውጣ", "Ba'i"], ["ESP32 camera", "ESP32 ካሜራ", "Kaameraa ESP32"], ["Pi camera", "Pi ካሜራ", "Kaameraa Pi"],
  ["System standby", "ስርዓቱ በተጠባባቂ ላይ ነው", "Sirnichi eegumsa irra jira"], ["Deactivate system", "ስርዓቱን አጥፋ", "Sirna dhaabsisi"], ["Activate system", "ስርዓቱን አስጀምር", "Sirna hojjechiisi"],
  ["), so professionals can answer you directly.", ") ይይዛሉ፤ ስለዚህ ባለሙያዎች በቀጥታ ሊመልሱልዎት ይችላሉ።", ") qabu; kanaaf ogeessonni kallattiin deebii siif kennuu danda'u."],
  /* ---- sign in ---- */
  ["Operator sign-in", "የኦፕሬተር መግቢያ", "Seensa hojjetaa"], ["Your name", "ስምዎ", "Maqaa kee"], ["Your age", "ዕድሜዎ", "Umurii kee"],
  ["Secret password (4+ letters)", "ሚስጥራዊ የይለፍ ቃል (ከ4 ፊደላት በላይ)", "Jecha icciitii (qubee 4 ol)"], ["Log in", "ግባ", "Seeni"],
  ["Create my account", "አካውንት ክፈት", "Akkaawuntii koo banuu"], ["I already have an account", "አካውንት አለኝ", "Akkaawuntii qaba"],
  ["I am new – make an account", "አዲስ ነኝ – አካውንት ክፈት", "Haaraa dha – akkaawuntii banuu"],
  ["Please log in first.", "እባክዎ መጀመሪያ ይግቡ።", "Maaloo duraan seenaa."], ["Name or password is not right.", "ስሙ ወይም የይለፍ ቃሉ ትክክል አይደለም።", "Maqaan ykn jechi icciitii sirrii miti."],
  ["That name is taken. Try another!", "ይህ ስም ተይዟል። ሌላ ይሞክሩ!", "Maqaan kun fudhatameera. Kan biraa yaalaa!"],
  ["Use a name of 2-20 letters/numbers and a password with 4+ characters.", "ከ2-20 ፊደላት/ቁጥሮች ያለው ስምና ከ4 በላይ ቁምፊዎች ያለው የይለፍ ቃል ይጠቀሙ።", "Maqaa qubee/lakkoofsa 2-20 fi jecha icciitii qubee 4 ol fayyadamaa."],
  ["Something went wrong", "የሆነ ችግር ተፈጥሯል", "Rakkoon tokko uumameera"],
  /* ---- shared words ---- */
  ["Live", "ቀጥታ", "Kallattiin"], ["Offline", "ከመስመር ውጭ", "Toora irra hin jiru"], ["Manual", "በእጅ", "Harkaan"], ["Autonomous", "ራሱን የቻለ", "Ofumaa"],
  ["Live video", "ቀጥታ ቪዲዮ", "Viidiyoo kallattii"], ["Photo", "ፎቶ", "Suuraa"], ["Start recording", "ቀረጻ ጀምር", "Waraabuu jalqabi"], ["Stop recording", "ቀረጻ አቁም", "Waraabuu dhaabi"],
  ["Stop", "አቁም", "Dhaabi"], ["Clear", "አጽዳ", "Qulqulleessi"], ["Close", "ዝጋ", "Cufi"], ["Turn off", "አጥፋ", "Dhaabi"], ["Sending...", "በመላክ ላይ...", "Ergamaa jira..."],
  ["Sent.", "ተልኳል።", "Ergameera."], ["Nothing yet.", "እስካሁን ምንም የለም።", "Hamma ammaatti homtuu hin jiru."], ["no recent data", "የቅርብ ጊዜ መረጃ የለም", "daataan dhiyoo hin jiru"],
  ["no data yet", "እስካሁን መረጃ የለም", "daataan hin jiru"], ["Waiting for a picture...", "ፎቶ በመጠበቅ ላይ...", "Suuraa eegaa jira..."],
  ["Video sent to Telegram.", "ቪዲዮው ወደ ቴሌግራም ተልኳል።", "Viidiyoon gara Teelegiraamii ergameera."], ["Recording... (max 2 minutes)", "በመቅረጽ ላይ... (ቢበዛ 2 ደቂቃ)", "Waraabaa jira... (dheeraa dha daqiiqaa 2)"],
  ["Stopping and sending to Telegram...", "በማቆምና ወደ ቴሌግራም በመላክ ላይ...", "Dhaabaa fi gara Teelegiraamii ergaa jira..."],
  ["Live video is not available. Check the ESP32-CAM, then press Live video again.", "ቀጥታ ቪዲዮ የለም። ESP32-CAMን ይመልከቱ፣ ከዚያ ቀጥታ ቪዲዮን እንደገና ይጫኑ።", "Viidiyoon kallattii hin argamu. ESP32-CAM ilaalaa, itti aansuun Viidiyoo kallattii irra deebi'ii tuqaa."],
  ["Live video is not available. Check the Pi script, then press Live video again.", "ቀጥታ ቪዲዮ የለም። የPi ስክሪፕቱን ይመልከቱ፣ ከዚያ ቀጥታ ቪዲዮን እንደገና ይጫኑ።", "Viidiyoon kallattii hin argamu. Iskiriiptii Pi ilaalaa, itti aansuun Viidiyoo kallattii irra deebi'ii tuqaa."],
  ["Robot is not reachable.", "ሮቦቱ ሊደረስበት አልቻለም።", "Roobotiin hin argamu."], ["Robot camera is not reachable.", "የሮቦቱ ካሜራ ሊደረስበት አልቻለም።", "Kaameraan roobotii hin argamu."],
  ["Telegram is not set up in .env.", "ቴሌግራም በ .env ውስጥ አልተዘጋጀም።", "Teelegiraamiin .env keessatti hin qophaa'in."], ["Telegram bridge connected.", "የቴሌግራም ግንኙነት ተገናኝቷል።", "Walqunnamtiin Teelegiraamii hojii irra jira."],
  /* ---- camera pages ---- */
  ["Raspberry Pi Night Camera", "የራስበሪ ፓይ የሌሊት ካሜራ", "Kaameraa Halkanii Raspberry Pi"], ["ESP32 Camera", "ESP32 ካሜራ", "Kaameraa ESP32"],
  ["Pause recognition", "ልየታን አቁም", "Adda baasuu dhaabi"], ["Resume recognition", "ልየታን ቀጥል", "Adda baasuu itti fufi"],
  ["Recognition is paused. New pictures are shown but not checked, and no Telegram messages are sent.", "ልየታ ቆሟል። አዳዲስ ፎቶዎች ይታያሉ ግን አይመረመሩም፤ የቴሌግራም መልዕክትም አይላክም።", "Adda baasuun dhaabbateera. Suuraan haaraan ni mul'ata, garuu hin qoratamu; ergaan Teelegiraamiis hin ergamu."],
  ["Simultaneous detection", "በአንድ ጊዜ መለየት", "Wal-simatee adda baasuu"],
  ["Every new Pi camera picture is checked by both models at the same time. Alerts from the two camera models are sent to Telegram by the server; alerts from any other model you pick here are sent by this page.", "እያንዳንዱ አዲስ የPi ካሜራ ፎቶ በሁለቱም ሞዴሎች በአንድ ጊዜ ይመረመራል። ከሁለቱ የካሜራ ሞዴሎች ማንቂያዎች በአገልጋዩ ወደ ቴሌግራም ይላካሉ፤ እዚህ ከሚመርጡት ሌላ ሞዴል ማንቂያዎች በዚህ ገጽ ይላካሉ።", "Suuraan Pi kaameraa haaraan hundi moodeloota lamaan yeruma tokkotti ni qoratama. Akeekkachiisni moodeloota kaameraa lamaanii sarvariin gara Teelegiraamii ergama; kan moodeela biraa as filattanii fuula kanaan ergama."],
  ["Every new ESP32-CAM picture is checked by both models at the same time. Alerts from the two camera models are sent to Telegram by the server; alerts from any other model you pick here are sent by this page.", "እያንዳንዱ አዲስ የESP32-CAM ፎቶ በሁለቱም ሞዴሎች በአንድ ጊዜ ይመረመራል። ከሁለቱ የካሜራ ሞዴሎች ማንቂያዎች በአገልጋዩ ወደ ቴሌግራም ይላካሉ፤ እዚህ ከሚመርጡት ሌላ ሞዴል ማንቂያዎች በዚህ ገጽ ይላካሉ።", "Suuraan ESP32-CAM haaraan hundi moodeloota lamaan yeruma tokkotti ni qoratama. Akeekkachiisni moodeloota kaameraa lamaanii sarvariin gara Teelegiraamii ergama; kan moodeela biraa as filattanii fuula kanaan ergama."],
  ["Detection on", "መለየት በርቷል", "Adda baasuun banameera"], ["Send alerts to Telegram", "ማንቂያዎችን ወደ ቴሌግራም ላክ", "Akeekkachiisa gara Teelegiraamii ergi"],
  ["Model A (2nd model: Aedes mosquito types)", "ሞዴል A (2ኛ ሞዴል፦ የኤዲስ ትንኝ ዓይነቶች)", "Moodeela A (moodeela 2ffaa: gosoota hantuuta Aedes)"], ["Model B (default fire model)", "ሞዴል B (መደበኛ የእሳት ሞዴል)", "Moodeela B (moodeela ibiddaa idilee)"],
  ["(off)", "(ጠፍቷል)", "(dhaabbateera)"], ["Alert at confidence ≥", "ማንቂያ በእምነት መጠን ≥", "Akeekkachiisa amantaa ≥"], ["alert on labels containing...", "ከሚከተሉት ቃላት ያላቸው ስሞች ላይ አስጠንቅቅ...", "maqaa kan kana qabu irratti akeekkachiisi..."],
  ["Choose at least one model.", "ቢያንስ አንድ ሞዴል ይምረጡ።", "Yoo xiqqaate moodeela tokko filadhaa."], ["Waiting for the default model's result...", "የመደበኛው ሞዴል ውጤት በመጠበቅ ላይ...", "Bu'aa moodeela idileetiif eegaa jira..."],
  ["ESP32-CAM 2nd model (Aedes mosquito)", "ESP32-CAM 2ኛ ሞዴል (የኤዲስ ትንኝ ዓይነቶች)", "Moodeela 2ffaa ESP32-CAM (gosoota hantuuta Aedes)"], ["Pi camera 2nd model (Aedes mosquito)", "Pi ካሜራ 2ኛ ሞዴል (የኤዲስ ትንኝ ዓይነቶች)", "Moodeela 2ffaa Pi kaameraa (gosoota hantuuta Aedes)"],
  ["ESP32-CAM default model (fire)", "ESP32-CAM መደበኛ ሞዴል (እሳት)", "Moodeela idilee ESP32-CAM (ibidda)"], ["Pi camera default model (fire)", "Pi ካሜራ መደበኛ ሞዴል (እሳት)", "Moodeela idilee Pi kaameraa (ibidda)"],
  [" · sent to Telegram by the server", " · በአገልጋዩ ወደ ቴሌግራም ተልኳል", " · sarvariin gara Teelegiraamii ergameera"], [" · sent to Telegram", " · ወደ ቴሌግራም ተልኳል", " · gara Teelegiraamii ergameera"], [" · already sent to Telegram", " · ቀድሞ ወደ ቴሌግራም ተልኳል", " · duraan gara Teelegiraamii ergameera"],
  /* ---- AI Lab ---- */
  ["AI Lab – manual recognition", "የኤአይ ላብራቶሪ – በእጅ መለየት", "Laabii AI – adda baasuu harkaan"], ["Drop an image or a video here, or tap to choose", "ምስል ወይም ቪዲዮ እዚህ ይጣሉ፣ ወይም ለመምረጥ ይንኩ", "Suuraa ykn viidiyoo as buusaa, ykn filachuuf tuqaa"],
  ["Use webcam", "ዌብካም ተጠቀም", "Weebkaamii fayyadami"], ["Use ESP32-CAM", "ESP32-CAM ተጠቀም", "ESP32-CAM fayyadami"], ["Send the result to the Telegram professionals automatically", "ውጤቱን በራስ-ሰር ለቴሌግራም ባለሙያዎች ላክ", "Bu'aa ofumaan ogeessota Teelegiraamiitiif ergi"],
  ["Capture & analyse", "አንሳ እና ተንትን", "Kaasii xiinxali"], ["Start live", "ቀጥታ ጀምር", "Kallattiin jalqabi"], ["Stop live", "ቀጥታ አቁም", "Kallattii dhaabi"],
  ["Send to Telegram professionals", "ለቴሌግራም ባለሙያዎች ላክ", "Ogeessota Teelegiraamiitiif ergi"], ["Analyse latest picture", "የቅርብ ጊዜውን ፎቶ ተንትን", "Suuraa dhiyoo xiinxali"],
  ["Auto-analyse new pictures", "አዳዲስ ፎቶዎችን በራስ-ሰር ተንትን", "Suuraa haaraa ofumaan xiinxali"], ["Stop auto-analyse", "ራስ-ሰር ትንተናን አቁም", "Xiinxala ofumaa dhaabi"],
  ["Connecting to the ESP32-CAM...", "ከESP32-CAM ጋር በመገናኘት ላይ...", "ESP32-CAM waliin walqunnamaa jira..."], ["Waiting for the first picture from the ESP32-CAM...", "ከESP32-CAM የመጀመሪያውን ፎቶ በመጠበቅ ላይ...", "Suuraa jalqabaa ESP32-CAM irraa eegaa jira..."],
  ["No picture from the ESP32-CAM yet.", "ከESP32-CAM እስካሁን ፎቶ የለም።", "Suuraan ESP32-CAM irraa hamma ammaatti hin jiru."],
  ["Sent. Professionals can reply on Telegram; see their answers on the", "ተልኳል። ባለሙያዎች በቴሌግራም ሊመልሱ ይችላሉ፤ መልሶቻቸውን በ", "Ergameera. Ogeessonni Teelegiraamii irratti deebisuu danda'u; deebii isaanii"], ["Professionals page.", "የባለሙያዎች ገጽ ይመልከቱ።", "fuula Ogeessotaa irratti ilaalaa."],
  ["The webcam needs a secure page (https:// or localhost). Open the site that way, or upload a picture instead.", "ዌብካሙ ደህንነቱ የተጠበቀ ገጽ (https:// ወይም localhost) ይፈልጋል። ድረ ገጹን በዚያ መንገድ ይክፈቱ፣ ወይም ምትኩ ፎቶ ይጫኑ።", "Weebkaamiin fuula nageenya qabu (https:// ykn localhost) barbaada. Fuula sana akkas banaa, ykn suuraa olkaa'aa."],
  ["Webcam is not available or access was blocked. Allow the camera in your browser, or upload a picture instead.", "ዌብካም የለም ወይም መዳረሻ ታግዷል። በአሳሽዎ ውስጥ ካሜራን ይፍቀዱ፣ ወይም ምትኩ ፎቶ ይጫኑ።", "Weebkaamiin hin argamu ykn seensi dhoorkameera. Biraawzara keessatti kaameraa eyyamaa, ykn suuraa olkaa'aa."],
  /* ---- Doctors ---- */
  ["Replies to you", "ለእርስዎ የተሰጡ መልሶች", "Deebii siif kennaman"], ["Send a case to the professionals", "ጉዳይ ለባለሙያዎች ላክ", "Dhimma ogeessotaaf ergi"],
  ["Describe the patient, bird, flock or situation (symptoms, first-level lab results...)", "ታካሚውን፣ ዶሮውን፣ መንጋውን ወይም ሁኔታውን ይግለጹ (ምልክቶች፣ የመጀመሪያ ደረጃ የላብ ውጤቶች...)", "Dhukkubsataa, lukkuu, tuuta lukkuu ykn haala ibsaa (mallattoolee, bu'aa laaboratoorii jalqabaa...)"],
  ["Send to Telegram", "ወደ ቴሌግራም ላክ", "Gara Teelegiraamii ergi"], ["Group conversation", "የቡድን ውይይት", "Marii garee"],
  ["Professionals reach you by replying to your messages or writing", "ባለሙያዎች የሚደርሱልዎት ለመልዕክቶችዎ በመመለስ ወይም በመጻፍ ነው", "Ogeessonni ergaa kee deebisuudhaan ykn barreessuudhaan si qaqqabu"], ["in the Telegram group.", "በቴሌግራም ቡድኑ ውስጥ።", "garee Teelegiraamii keessatti."],
  /* ---- Me ---- */
  ["Master Poultry Keeper!", "ምርጥ የዶሮ አርቢ!", "Horsiisaa Lukkuu Ogeessa!"], ["Great Explorer!", "ጥሩ አሳሽ!", "Qorataa Gaarii!"], ["Keep exploring!", "ማሰስዎን ይቀጥሉ!", "Qorachuu itti fufaa!"], ["Log out", "ውጣ", "Ba'i"], ["Dark /", "ጨለማ /", "Dukkana /"], ["Light", "ብርሃን", "Ifa"],
  /* ---- Drone / sensors ---- */
  ["Drone Sensors", "የድሮን ዳሳሾች", "Sensaroota Dirooni"], ["Waiting for the first data from the drone...", "ከድሮኑ የመጀመሪያውን መረጃ በመጠበቅ ላይ...", "Daataa jalqabaa dirooniin irraa eegaa jira..."], ["Drone camera", "የድሮን ካሜራ", "Kaameraa dirooni"],
  ["Download CSV log", "የCSV መዝገብ አውርድ", "Galmee CSV buufadhu"],
  /* sensor names */
  ["Air temperature", "የአየር ሙቀት", "Ho'a qilleensaa"], ["Temperature", "ሙቀት", "Ho'a"], ["Humidity", "እርጥበት", "Jiidhina"], ["Air pressure", "የአየር ግፊት", "Dhiibbaa qilleensaa"], ["Light", "ብርሃን", "Ifa"],
  ["Soil moisture", "የአፈር እርጥበት", "Jiidhina biyyoo"], ["Gas / air quality", "ጋዝ / የአየር ጥራት", "Gaasii / qulqullina qilleensaa"], ["UV index", "የUV መረጃ ጠቋሚ", "Ibsaa UV"], ["Distance", "ርቀት", "Fageenya"],
  ["Voltage", "ቮልቴጅ", "Voolteejii"], ["Wi-Fi signal", "የWi-Fi ምልክት", "Mallattoo Wi-Fi"], ["Uptime", "የስራ ጊዜ", "Yeroo hojjetame"], ["Water TDS", "የውሃ TDS", "TDS bishaanii"], ["Water pump (1 = on)", "የውሃ ፓምፕ (1 = በርቷል)", "Pampii bishaanii (1 = banaa)"],
  ["Flame detected (1 = yes)", "ነበልባል ተገኝቷል (1 = አዎ)", "Arraba ibiddaa argameera (1 = eeyyee)"], ["Flame sensor (raw)", "የነበልባል ዳሳሽ (ጥሬ)", "Sensara ibiddaa (ujummoo)"], ["Flame intensity", "የነበልባል ጥንካሬ", "Cimina ibiddaa"],
  ["CO₂ estimate (MQ-135)", "የCO₂ ግምት (MQ-135)", "Tilmaama CO₂ (MQ-135)"], ["Ammonia NH₃ (MQ-135)", "አሞኒያ NH₃ (MQ-135)", "Amooniyaa NH₃ (MQ-135)"], ["Carbon monoxide CO (MQ-135)", "ካርቦን ሞኖክሳይድ CO (MQ-135)", "Kaarboon mooniiksaayidii CO (MQ-135)"],
  ["Alcohol / benzene (MQ-135)", "አልኮል / ቤንዚን (MQ-135)", "Alkoolii / beenziinii (MQ-135)"], ["Toluene (MQ-135)", "ቶሉዊን (MQ-135)", "Toluwiinii (MQ-135)"], ["Acetone (MQ-135)", "አሴቶን (MQ-135)", "Aasetoonii (MQ-135)"], ["Air purity Rs/R0 (MQ-135)", "የአየር ንጽህና Rs/R0 (MQ-135)", "Qulqullina qilleensaa Rs/R0 (MQ-135)"],
  ["Robot temperature", "የሮቦት ሙቀት", "Ho'a roobotii"], ["Robot heart rate", "የሮቦት የልብ ምት", "Dhahannaa onnee roobotii"], ["Robot blood oxygen SpO₂", "የሮቦት የደም ኦክሲጅን SpO₂", "Oksijiinii dhiigaa roobotii SpO₂"],
  /* ---- Robot ---- */
  ["Robot control", "የሮቦት መቆጣጠሪያ", "To'annoo roobotii"], ["Connecting to the robot...", "ከሮቦቱ ጋር በመገናኘት ላይ...", "Roobotii waliin walqunnamaa jira..."],
  ["Hold a button (or arrow keys / WASD) to move. Release to stop. The robot will not drive forward into an obstacle.", "ለመንቀሳቀስ አዝራር (ወይም የቀስት ቁልፎች / WASD) ይያዙ። ለማቆም ይልቀቁ። ሮቦቱ ወደ እንቅፋት አይነዳም።", "Sochiisuuf button (ykn xiyyoota / WASD) qabaa. Dhaabuuf gadi dhiisaa. Roobotiin gufuutti hin deemu."],
  ["Start autonomous mode", "ራሱን የቻለ ሁነታ ጀምር", "Haala ofumaa jalqabi"], ["Stop autonomous mode", "ራሱን የቻለ ሁነታ አቁም", "Haala ofumaa dhaabi"], ["Robot camera", "የሮቦት ካሜራ", "Kaameraa roobotii"],
  ["Robot online", "ሮቦቱ በመስመር ላይ ነው", "Roobotiin toora irra jira"], ["Robot offline", "ሮቦቱ ከመስመር ውጭ ነው", "Roobotiin toora irra hin jiru"], ["Obstacle ahead – forward is blocked", "ፊት ለፊት እንቅፋት አለ – ወደፊት መሄድ ታግዷል", "Fuuldura gufuun jira – gara fuulduraa deemuun dhorkameera"],
  ["· Obstacle distance:", "· የእንቅፋት ርቀት፦", "· Fageenya gufuu:"], ["Mode:", "ሁነታ፦", "Haala:"],
  /* pump + fire */
  ["Water pump & fire control", "የውሃ ፓምፕ እና የእሳት መቆጣጠሪያ", "Pampii bishaanii fi to'annoo ibiddaa"], ["Connecting to the sensor board...", "ከሴንሰር ቦርዱ ጋር በመገናኘት ላይ...", "Boordii sensaraa waliin walqunnamaa jira..."],
  ["Detection", "መለየት", "Adda baasuu"], ["Detection only watches. The pump reacts to dry soil or fire only in Autonomous mode.", "መለየት ይከታተላል ብቻ ነው። ፓምፑ ለደረቅ አፈር ወይም ለእሳት የሚሰራው በራሱ የቻለ ሁነታ ብቻ ነው።", "Adda baasuun ilaala qofa. Pampiin biyyoo goge ykn ibiddaaf kan hojjetu haala ofumaa keessatti qofa."],
  ["Moisture detection", "የእርጥበት መለየት", "Adda baasuu jiidhinaa"], ["Flame detection", "የነበልባል መለየት", "Adda baasuu ibiddaa"], ["Pump mode", "የፓምፕ ሁነታ", "Haala pampii"],
  ["Pump ON", "ፓምፕ አብራ", "Pampii banaa"], ["Pump OFF", "ፓምፕ አጥፋ", "Pampii cufaa"], ["Servo (nozzle)", "ሰርቮ (አፍንጫ)", "Sarvoo (fooyyaa)"], ["▲ Up (90°)", "▲ ላይ (90°)", "▲ Ol (90°)"], ["▼ Down (0°)", "▼ ታች (0°)", "▼ Gad (0°)"],
  ["Sensor board online", "የሴንሰር ቦርድ በመስመር ላይ ነው", "Boordiin sensaraa toora irra jira"], ["Sensor board offline", "የሴንሰር ቦርድ ከመስመር ውጭ ነው", "Boordiin sensaraa toora irra hin jiru"],
  ["Up (90°)", "ላይ (90°)", "Ol (90°)"], ["Down (0°)", "ታች (0°)", "Gad (0°)"], ["Waiting for the Arduino Mega...", "አርዱዪኖ ሜጋን በመጠበቅ ላይ...", "Arduino Mega eegaa jira..."],
  ["Autonomous: the pump starts by itself on dry soil or fire (only for detections that are ON). Switch to Manual to use Pump ON / OFF.", "ራሱን የቻለ፦ ፓምፑ በደረቅ አፈር ወይም በእሳት ላይ በራሱ ይጀምራል (ለበራ መለየት ብቻ)። ፓምፕ አብራ / አጥፋን ለመጠቀም ወደ በእጅ ይቀይሩ።", "Ofumaa: pampiin biyyoo goge ykn ibiddaan ofumaan jalqaba (adda baasuu banamaniif qofa). Pampii banuu / cufuuf gara Harkaan jijjiiraa."],
  ["Manual: use Pump ON / OFF for fire fighting or fertilizer. The pump stops by itself after 2 minutes. Detection still shows dry soil and fire, but nothing starts the pump.", "በእጅ፦ ለእሳት ማጥፋት ወይም ለማዳበሪያ ፓምፕ አብራ / አጥፋን ይጠቀሙ። ፓምፑ ከ2 ደቂቃ በኋላ በራሱ ይቆማል። መለየት አሁንም ደረቅ አፈርንና እሳትን ያሳያል፣ ነገር ግን ፓምፑን የሚያስጀምር ነገር የለም።", "Harkaan: ibidda dhaamsuuf ykn xaa'oof Pampii banuu / cufuu fayyadamaa. Pampiin daqiiqaa 2 booda ofumaan dhaabata. Adda baasuun ammallee biyyoo goge fi ibidda agarsiisa, garuu homtuu pampii hin jalqabsiisu."],
  ["Soil is dry", "አፈሩ ደረቅ ነው", "Biyyoon goge"], ["Fire detected – the pump is started", "እሳት ተገኝቷል – ፓምፑ ተጀምሯል", "Ibiddi argameera – pampiin jalqabeera"], ["Fire detected – Manual mode, no automatic water", "እሳት ተገኝቷል – በእጅ ሁነታ፣ ራስ-ሰር ውሃ የለም", "Ibiddi argameera – Haala harkaa, bishaan ofumaa hin jiru"],
  ["Soil is dry – Manual mode, no automatic water", "አፈሩ ደረቅ ነው – በእጅ ሁነታ፣ ራስ-ሰር ውሃ የለም", "Biyyoon goge – Haala harkaa, bishaan ofumaa hin jiru"],
  /* robot sensors */
  ["Robot sensors (Arduino Uno)", "የሮቦት ዳሳሾች (Arduino Uno)", "Sensaroota roobotii (Arduino Uno)"], ["Sensors (Arduino Mega)", "ዳሳሾች (Arduino Mega)", "Sensaroota (Arduino Mega)"], ["Gases (MQ-135)", "ጋዞች (MQ-135)", "Gaasota (MQ-135)"],
  ["Estimates from one cross-sensitive sensor. Good for trends and alerts, not lab-grade numbers.", "ከአንድ ሴንሰር የሚገኝ ግምት። ለአዝማሚያና ለማንቂያ ጥሩ ነው፤ የላብራቶሪ ደረጃ ቁጥር አይደለም።", "Tilmaama sensara tokko irraa. Adeemsaa fi akeekkachiisaaf gaarii dha; lakkoofsa laaboratoorii miti."],
  ["Waiting for data from the Arduino boards...", "ከArduino ቦርዶች መረጃ በመጠበቅ ላይ...", "Daataa boordii Arduino irraa eegaa jira..."], ["No MQ-135 data yet.", "እስካሁን የMQ-135 መረጃ የለም።", "Daataan MQ-135 hamma ammaatti hin jiru."],
  ["No data from the robot's Uno yet. Flash the new sketch and restart the Pi script.", "ከሮቦቱ Uno እስካሁን መረጃ የለም። አዲሱን ስኬች ጫኑና የPi ስክሪፕቱን እንደገና ያስጀምሩ።", "Daataan Uno roobotii irraa hamma ammaatti hin jiru. Iskeechii haaraa fe'aa fi iskiriiptii Pi irra deebi'ii jalqabsiisaa."],
  ["Place a finger gently on the robot's MAX30100 and keep still. Heart rate and SpO2 appear after 10 to 20 seconds.", "ጣትዎን በቀስታ በሮቦቱ MAX30100 ላይ ያስቀምጡና ሳይንቀሳቀሱ ይቆዩ። የልብ ምትና SpO2 ከ10 እስከ 20 ሰከንድ በኋላ ይታያሉ።", "Quba kee MAX30100 roobotii irra mal'ifaan kaa'ii hin sosootin. Dhahannaan onnee fi SpO2 sekondii 10 hanga 20 booda mul'atu."],
  ["Calibrating: the sensor warms up for 2 minutes, then measures clean air for 1 minute. Keep it in fresh air. Gas estimates appear after that.", "በማስተካከል ላይ፦ ሴንሰሩ ለ2 ደቂቃ ይሞቃል፣ ከዚያ ንጹህ አየርን ለ1 ደቂቃ ይለካል። በንጹህ አየር ውስጥ ያቆዩት። ከዚያ በኋላ የጋዝ ግምቶች ይታያሉ።", "Sirreessaa jira: sensaraan daqiiqaa 2 ho'a, itti aansuun qilleensa qulqulluu daqiiqaa 1 safara. Qilleensa qulqulluu keessa kaa'aa. Ergasii tilmaamni gaasii ni mul'ata."],
  /* ---- Environment ---- */
  ["Environment analysis", "የአካባቢ ትንተና", "Xiinxala naannoo"], ["Readings from the drone (ESP8266) and the Raspberry Pi are combined, compared with each other and evaluated.", "ከድሮኑ (ESP8266) እና ከራስበሪ ፓይ የሚመጡ ንባቦች ተጣምረው፣ እርስ በርስ ተነጻጽረውና ተገምግመው ይታያሉ።", "Dubbisni dirooni (ESP8266) fi Raspberry Pi irraa walitti makamee, wal-bira qabamee, madaalama."],
  ["Drone (ESP8266)", "ድሮን (ESP8266)", "Dirooni (ESP8266)"], ["Raspberry Pi", "ራስበሪ ፓይ", "Raspberry Pi"], ["Assessment", "ግምገማ", "Madaallii"], ["Readings", "ንባቦች", "Dubbisaalee"],
  ["Waiting for data from the drone and the Raspberry Pi...", "ከድሮኑና ከራስበሪ ፓይ መረጃ በመጠበቅ ላይ...", "Daataa dirooni fi Raspberry Pi irraa eegaa jira..."], ["Waiting for sensor data...", "የሴንሰር መረጃ በመጠበቅ ላይ...", "Daataa sensaraa eegaa jira..."],
  ["Conditions look normal", "ሁኔታዎች መደበኛ ይመስላሉ", "Haalli idilee fakkaata"], ["Needs attention", "ትኩረት ይፈልጋል", "Xiyyeeffannoo barbaada"], ["Alert", "ማንቂያ", "Akeekkachiisa"], ["No problems found in the current readings.", "በአሁኑ ንባቦች ውስጥ ምንም ችግር አልተገኘም።", "Dubbisaalee ammaa keessatti rakkoon tokko hin argamne."],
  ["Values are the average of the stations that report them. Ratings use common comfort and safety ranges; risk indicators are simple rules of thumb from temperature and humidity.", "እሴቶቹ ሪፖርት ከሚያደርጉት ጣቢያዎች አማካይ ናቸው። ደረጃዎቹ የተለመዱ የምቾትና የደህንነት ክልሎችን ይጠቀማሉ፤ የአደጋ አመላካቾች ከሙቀትና እርጥበት የተወሰዱ ቀላል የአውራ ጣት ደንቦች ናቸው።", "Gatiiwwan giddugaleessa buufata gabaasanii dha. Sadarkaan wantoota idilee mijataa fi nageenyaa fayyadama; mallattoon balaa seera salphaa ho'aa fi jiidhina irraa fudhatamedha."],
  ["Very cold", "በጣም ቀዝቃዛ", "Baay'ee qabbanaa'aa"], ["Cool", "ቀዝቃዛ", "Qabbanaa'aa"], ["Comfortable", "ምቹ", "Mijataa"], ["Hot", "ሞቃት", "Hoo'aa"], ["Extreme heat", "ከፍተኛ ሙቀት", "Ho'a hamaa"],
  ["Very dry", "በጣም ደረቅ", "Baay'ee gogaa"], ["Dry", "ደረቅ", "Gogaa"], ["Humid", "እርጥብ", "Jiidhaa"], ["Very humid", "በጣም እርጥብ", "Baay'ee jiidhaa"],
  ["Very low – stormy weather likely", "በጣም ዝቅተኛ – ማዕበላማ የአየር ሁኔታ ሊኖር ይችላል", "Baay'ee gadi aanaa – qilleensi duulaa ta'uu mala"], ["Low – unsettled weather", "ዝቅተኛ – ያልተረጋጋ የአየር ሁኔታ", "Gadi aanaa – qilleensi hin tasgabbaa'in"], ["Normal", "መደበኛ", "Idilee"], ["High – settled weather", "ከፍተኛ – የተረጋጋ የአየር ሁኔታ", "Ol aanaa – qilleensi tasgabbaa'aa"],
  ["Low", "ዝቅተኛ", "Gadi aanaa"], ["Moderate – cover up at midday", "መካከለኛ – እኩለ ቀን ላይ ይሸፈኑ", "Giddugaleessa – guyyaa walakkaa of haguugaa"], ["High – sun protection needed", "ከፍተኛ – ከፀሐይ መከላከያ ያስፈልጋል", "Ol aanaa – aduu irraa of ittisuun barbaachisaa dha"], ["Very high – avoid the sun", "በጣም ከፍተኛ – ከፀሐይ ይራቁ", "Baay'ee ol aanaa – aduu irraa of qusadhaa"],
  ["Very dry – irrigate", "በጣም ደረቅ – ያጠጡ", "Baay'ee gogaa – obaasaa"], ["Good", "ጥሩ", "Gaarii"], ["Wet", "እርጥብ", "Jiidhaa"], ["Waterlogged", "ውሃ የተጥለቀለቀ", "Bishaan irra dhaabbate"],
  ["Dry air", "ደረቅ አየር", "Qilleensa gogaa"], ["Comfortable", "ምቹ", "Mijataa"], ["Muggy", "ወበቅ ያለው", "Hurkaa'aa"], ["Oppressive", "አፈናቃይ", "Cimaa dhiibu"], ["Caution", "ጥንቃቄ", "Of eeggannoo"], ["Extreme caution", "ከፍተኛ ጥንቃቄ", "Of eeggannoo cimaa"], ["Danger", "አደጋ", "Balaa"], ["Extreme danger", "ከባድ አደጋ", "Balaa cimaa"], ["Not needed", "አያስፈልግም", "Hin barbaachisu"], ["Moderate", "መካከለኛ", "Giddugaleessa"], ["High", "ከፍተኛ", "Ol aanaa"],
  ["Dew point", "የጤዛ ነጥብ", "Qabxii dheedhii"], ["Heat index", "የሙቀት መረጃ ጠቋሚ", "Ibsaa ho'aa"], ["Mosquito activity risk", "የትንኝ እንቅስቃሴ አደጋ", "Balaa sochii hantuutaa"], ["Fire-weather risk", "የእሳት አየር ሁኔታ አደጋ", "Balaa haala qilleensaa ibiddaa"], ["Derived indicators", "የተሰሉ አመላካቾች", "Mallattoolee shallagaman"],
  ["The temperature at which water starts to condense. Higher means stickier air.", "ውሃ መጨመቅ የሚጀምርበት ሙቀት። ከፍ ሲል አየሩ የበለጠ ይጣበቃል።", "Ho'a bishaan itti walitti qabamuu jalqabu. Yoo ol ba'e qilleensi caalaa maxxanaa'a."],
  ["Applies from about 27 °C. Below that the air temperature is what you feel.", "ከ27 °C አካባቢ ጀምሮ ይሰራል። ከዚያ በታች የሚሰማዎት የአየር ሙቀት ነው።", "Ho'a 27 °C irraa eegalee hojjeta. Isa gadi kan isin dhaga'an ho'a qilleensaati."],
  ["How hot it feels for people and animals when humidity is included.", "እርጥበት ሲጨመር ለሰዎችና ለእንስሳት ምን ያህል ሞቃት እንደሚሰማ።", "Jiidhinni yoo ida'ame namootaa fi horiif hammam ho'aa ta'ee dhaga'ama."],
  ["Warm and humid air favours mosquito activity and breeding.", "ሞቃትና እርጥብ አየር ለትንኝ እንቅስቃሴና እርባታ ተስማሚ ነው። የአውራ ጣት ደንብ።", "Qilleensi hoo'aa fi jiidhaan sochii fi horsiisa hantuutaaf mijataa dha. Seera salphaa."],
  ["Conditions allow mosquitoes. Watch standing water.", "ሁኔታዎች ትንኞችን ይፈቅዳሉ። የቆመ ውሃን ይከታተሉ። የአውራ ጣት ደንብ።", "Haalli hantuutaaf mijata. Bishaan dhaabbataa hordofaa. Seera salphaa."],
  ["Too cold or too dry for much mosquito activity.", "ለብዙ ትንኝ እንቅስቃሴ በጣም ቀዝቃዛ ወይም ደረቅ ነው። የአውራ ጣት ደንብ።", "Sochii hantuutaa baay'ee ta'uuf baay'ee qabbanaa'aa ykn gogaa dha. Seera salphaa."],
  ["Hot, very dry air dries vegetation and lets fires spread fast.", "ሞቃትና በጣም ደረቅ አየር እጽዋትን ያደርቃል፤ እሳትም በፍጥነት እንዲስፋፋ ያደርጋል። የአውራ ጣት ደንብ።", "Qilleensi hoo'aa fi baay'ee gogaan biqiltuu gogsa; ibiddis saffisaan akka babal'atu godha. Seera salphaa."],
  ["Warm and dry. Be careful with open flames.", "ሞቃትና ደረቅ ነው። በክፍት እሳት ይጠንቀቁ። የአውራ ጣት ደንብ።", "Hoo'aa fi gogaa dha. Ibidda banaa waliin of eeggadhaa. Seera salphaa."],
  ["Air is not hot and dry enough for elevated fire weather.", "አየሩ ለከፍተኛ የእሳት የአየር ሁኔታ የሚበቃ ሞቃትና ደረቅ አይደለም። የአውራ ጣት ደንብ።", "Qilleensi haala ibiddaa ol aanaaf ga'uuf hoo'aa fi gogaa miti. Seera salphaa."],
  ["Needs both temperature and humidity (dew point, heat index, mosquito and fire-weather risk).", "ሙቀትና እርጥበት ሁለቱም ያስፈልጋሉ (የጤዛ ነጥብ፣ የሙቀት መረጃ ጠቋሚ፣ የትንኝና የእሳት የአየር ሁኔታ አደጋ)።", "Ho'aa fi jiidhina lachuu barbaada (qabxii dheedhii, ibsaa ho'aa, balaa hantuutaa fi ibiddaa)."],
  /* ---- mapping + history (new in this version) ---- */
  ["Mapping mode", "የካርታ ሁነታ", "Haala karaa kaartaa"],
  ["Build a route: choose a direction and a distance, add the step, then press Run. Forward and Backward drive straight. Left and Right turn 90° on the spot and then drive the distance. The robot cancels a forward move if an obstacle blocks it. Works in Manual mode.", "መንገድ ይገንቡ፦ አቅጣጫና ርቀት ይምረጡ፣ ደረጃውን ይጨምሩ፣ ከዚያ አስኪድን ይጫኑ። ወደፊትና ወደኋላ ቀጥታ ይነዳል። ግራና ቀኝ በቦታው 90° ይዞራል ከዚያ ርቀቱን ይነዳል። እንቅፋት ከከለከለው ሮቦቱ ወደፊት መሄዱን ይሰርዛል። በእጅ ሁነታ ይሰራል።", "Karaa tolchaa: gara fi fageenya filadhaa, tarkaanfii dabaluun, itti aansuun Hojjechiisi tuqaa. Fuulduraa fi duubatti sirriitti deema. Bitaa fi mirgi bakka jirutti 90° garagala, itti aansuun fageenya deema. Gufuun yoo dhorke roobotiin deemsa fuulduraa ni dhiisa. Haala harkaa keessatti hojjeta."],
  ["Forward", "ወደፊት", "Fuuldura"], ["Backward", "ወደኋላ", "Duubatti"], ["Left", "ግራ", "Bitaa"], ["Right", "ቀኝ", "Mirga"], ["Distance (cm)", "ርቀት (ሴ.ሜ)", "Fageenya (cm)"], ["Add step", "ደረጃ ጨምር", "Tarkaanfii dabali"], ["Run path", "መንገዱን አስኪድ", "Karaa hojjechiisi"],
  ["No steps yet.", "እስካሁን ምንም ደረጃ የለም።", "Hamma ammaatti tarkaanfiin hin jiru."], ["Running", "በመሄድ ላይ", "Hojjechaa jira"],
  ["Enter a distance from 1 to 500 cm.", "ከ1 እስከ 500 ሴ.ሜ ርቀት ያስገቡ።", "Fageenya cm 1 hanga 500 galchaa."], ["Accuracy depends on calibration: set ROBOT_CM_PER_SEC and ROBOT_TURN90_SEC in the Pi script.", "ትክክለኛነቱ በማስተካከል ላይ የተመሠረተ ነው፦ ROBOT_CM_PER_SEC እና ROBOT_TURN90_SEC በPi ስክሪፕቱ ውስጥ ያስተካክሉ።", "Sirrummaan sirreessuu irratti hundaa'a: ROBOT_CM_PER_SEC fi ROBOT_TURN90_SEC iskiriiptii Pi keessatti sirreessaa."],
  ["Download full history", "ሙሉ ታሪክ አውርድ", "Seenaa guutuu buufadhu"], ["Stop automatic Telegram report", "ራስ-ሰር የቴሌግራም ሪፖርትን አቁም", "Gabaasa Teelegiraamii ofumaa dhaabi"],
  ["System on standby: rows are tagged \"none\". Activate the system on the Home page to record the operator name.", "ስርዓቱ በተጠባባቂ ላይ ነው፦ ረድፎች \"none\" ተብለው ይመዘገባሉ። የኦፕሬተሩን ስም ለመመዝገብ በመነሻ ገጽ ላይ ስርዓቱን ያስጀምሩ።", "Sirnichi eegumsa irra jira: sarara \"none\" jedhamee galmaa'a. Maqaa hojjetaa galmeessuuf fuula Jalqabaa irratti sirna hojjechiisaa."],
  ["Automatic report is off.", "ራስ-ሰር ሪፖርት ጠፍቷል።", "Gabaasni ofumaa dhaabbateera."]
].forEach(([e, a, o]) => DICT.set(e, {am: a, om: o}));

[
  ["Showing the first 300. Use search to find more.", "የመጀመሪያዎቹ 300 ይታያሉ። ተጨማሪ ለማግኘት ፍለጋ ይጠቀሙ።", "Kan jalqabaa 300 agarsiifameera. Dabalataaf barbaacha fayyadamaa."],
  ["Camera is not available. Please choose a picture instead.", "ካሜራ የለም። እባክዎ ፎቶ ይምረጡ።", "Kaameraan hin argamu. Maaloo suuraa filadhaa."], ["Use camera", "ካሜራ ተጠቀም", "Kaameraa fayyadami"],
  ["Not very sure. Try a clearer photo in good light.", "እርግጠኛ አይደለም። በጥሩ ብርሃን ግልጽ ፎቶ ይሞክሩ።", "Baay'ee amanamaa miti. Suuraa ifaa ifa gaarii keessatti yaalaa."], ["+1 star!", "+1 ኮከብ!", "+1 urjii!"],
  ["Could not read this video", "ይህን ቪዲዮ ማንበብ አልተቻለም", "Viidiyoo kana dubbisuun hin danda'amne"], ["Could not start", "መጀመር አልተቻለም", "Jalqabuun hin danda'amne"],
  ["The server has no 2nd model. Put keras_model.h5 and labels.txt in models/aedes_types/ and restart.", "አገልጋዩ 2ኛ ሞዴል የለውም። keras_model.h5 እና labels.txt በ models/aedes_types/ ውስጥ አስቀምጠው እንደገና ያስጀምሩ።", "Sarvarichi moodeela 2ffaa hin qabu. keras_model.h5 fi labels.txt models/aedes_types/ keessa kaa'iitii irra deebi'ii jalqabsiisaa."],
  ["Outside the set limits", "ከተቀመጠው ገደብ ውጭ", "Daangaa kaa'ame ala"], ["outside the set limits", "ከተቀመጠው ገደብ ውጭ", "daangaa kaa'ame ala"],
  ["Correct! +2 stars", "ትክክል! +2 ኮከቦች", "Sirrii! +2 urjii"], ["Not quite. The answer was", "ትክክል አይደለም። መልሱ", "Hin sirrii miti. Deebiin"], ["Next", "ቀጣይ", "Itti aanu"], ["Score:", "ውጤት፦", "Qabxii:"],
  ["Fire detected", "እሳት ተገኝቷል", "Ibiddi argameera"], ["Name", "ስም", "Maqaa"], ["Search", "ፈልግ", "Barbaadi"], ["Search...", "ፈልግ...", "Barbaadi..."], ["Quiz", "ጥያቄ", "Gaaffii"], ["Game", "ጨዋታ", "Taphaa"]
].forEach(([e, a, o]) => DICT.set(e, {am: a, om: o}));

/* texts that contain numbers or names: [pattern, Amharic, Afaan Oromoo]  ($1, $2 ... = the captured parts) */
const RULES = [];
const R = (re, am, om) => RULES.push([re, m => { const f = s => s.replace(/\$(\d)/g, (_, i) => (m[i] == null ? "" : tn(m[i]))); return {am: f(am), om: f(om)}; }]);
const tn = x => (DICT.get(x) && DICT.get(x)[lang]) || x;                 // translate a name if the table knows it
R(/^Scan a (.+)$/, "$1 ቃኝ", "$1 sakatta'i");
R(/^Drop a (.+?) picture here, choose one, or use the camera\.$/, "$1 ፎቶ እዚህ ይጣሉ፣ አንዱን ይምረጡ ወይም ካሜራውን ይጠቀሙ።", "Suuraa $1 as buusaa, tokko filadhaa, ykn kaameraa fayyadamaa.");
R(/^Quiz time! Round (\d+)$/, "የጥያቄ ጊዜ! ዙር $1", "Yeroo gaaffii! Marsaa $1");
R(/^Score: (\d+)$/, "ውጤት፦ $1", "Qabxii: $1");
R(/^Moisture: (.+)$/, "እርጥበት፦ $1", "Jiidhina: $1");
R(/^Hello, (.+)$/, "ሰላም፣ $1", "Akkam, $1");
R(/^Join (.+)!$/, "$1 ን ይቀላቀሉ!", "$1 itti makamaa!");
R(/^SYSTEM ACTIVE · operator (.+)$/, "ስርዓቱ ንቁ ነው · ኦፕሬተር $1", "SIRNI HOJJACHAA JIRA · hojjetaa $1");
R(/^(Telegram bridge connected\.|Telegram is not set up in \.env\.)\s+While the system is active, camera alerts and sensor data posted to Telegram carry your name \($/,
  "$1 ስርዓቱ ንቁ ሲሆን፣ ወደ ቴሌግራም የሚላኩ የካሜራ ማንቂያዎችና የሴንሰር መረጃዎች ስምዎን (", "$1 Sirni yeroo hojjetu, akeekkachiisni kaameraa fi daataan sensaraa gara Teelegiraamii ergaman maqaa kee (");
R(/^Pictures sent by your (.+) appear here and are checked automatically\.$/, "ከ$1 የሚላኩ ፎቶዎች እዚህ ይታያሉ፤ በራስ-ሰርም ይመረመራሉ።", "Suuraan $1 keessan irraa ergamu as mul'ata; ofumaan ni qoratama.");
R(/^Waiting for the first picture from the (.+)\.\.\.$/, "ከ$1 የመጀመሪያውን ፎቶ በመጠበቅ ላይ...", "Suuraa jalqabaa $1 irraa eegaa jira...");
R(/^Checked pictures: (\d+) · last picture (\d+)s ago( \(camera may be offline\))?$/, "የተመረመሩ ፎቶዎች፦ $1 · የመጨረሻ ፎቶ ከ$2 ሰከንድ በፊት$3", "Suuraa qoratame: $1 · suuraan dhumaa sekondii $2 dura$3");
R(/^ALERT: (.+)$/, "ማንቂያ፦ $1", "AKEEKKACHIISA: $1");
R(/^(.*?)last data (\d+)s ago · (\d+) packets$/, "$1የመጨረሻ መረጃ ከ$2 ሰከንድ በፊት · $3 ፓኬቶች", "$1daataan dhumaa sekondii $2 dura · pakeetii $3");
R(/^(.*?)last data (\d+)s ago$/, "$1የመጨረሻ መረጃ ከ$2 ሰከንድ በፊት", "$1daataan dhumaa sekondii $2 dura");
R(/^Last picture (\d+)s ago$/, "የመጨረሻ ፎቶ ከ$1 ሰከንድ በፊት", "Suuraan dhumaa sekondii $1 dura");
R(/^Latest ESP32-CAM picture · (\d+)s ago( \(camera may be offline\))?$/, "የቅርብ ጊዜ የESP32-CAM ፎቶ · ከ$1 ሰከንድ በፊት$2", "Suuraa dhiyoo ESP32-CAM · sekondii $1 dura$2");
R(/^Error: (.+)$/, "ስህተት፦ $1", "Dogoggora: $1");
R(/^Oops! (.+)$/, "ይቅርታ! $1", "Dhiifama! $1");
R(/^AI sees: (.+)$/, "ኤአይ የሚያየው፦ $1", "AI kan argu: $1");
R(/^(\d+(?:\.\d+)?) cm$/, "$1 ሴ.ሜ", "$1 cm");
R(/^(\d+) stars$/, "$1 ኮከቦች", "urjii $1");
R(/^Analysing (\d+)\/(\d+)\.\.\.$/, "በመተንተን ላይ $1/$2...", "Xiinxalaa jira $1/$2...");
R(/^Model: (.+?)( · .*)?$/, "ሞዴል፦ $1$2", "Moodeela: $1$2");
R(/^Moisture detection: (ON|OFF)$/, "የእርጥበት መለየት፦ $1", "Adda baasuu jiidhinaa: $1");
R(/^Flame detection: (ON|OFF)$/, "የነበልባል መለየት፦ $1", "Adda baasuu ibiddaa: $1");
R(/^Pump (ON|OFF)$/, "ፓምፕ $1", "Pampii $1");
R(/^Servo: $/, "ሰርቮ፦", "Sarvoo:");
R(/^Stations differ by (.+?) – check the sensors$/, "ጣቢያዎች በ$1 ይለያያሉ – ሴንሰሮቹን ይፈትሹ", "Buufattoonni $1 adda ba'u – sensaroota ilaalaa");
R(/^Stations agree \(Δ (.+)\)$/, "ጣቢያዎች ይስማማሉ (Δ $1)", "Buufattoonni ni walii galu (Δ $1)");
R(/^only (Drone|Pi) reports this$/, "ይህን የሚዘግበው $1 ብቻ ነው", "Kana kan gabaasu $1 qofa");
R(/^(.+?) is (offline|not sending data) – its readings are missing from the analysis\.$/, "$1 ከመስመር ውጭ ነው ወይም መረጃ አይልክም – ንባቦቹ ከትንተናው ጠፍተዋል።", "$1 toora irra hin jiru ykn daataa hin ergu – dubbisaaleen isaa xiinxala keessaa hafaniiru.");
R(/^(.+?): the drone and the Pi differ by (.+?) – check both sensors\.$/, "$1፦ ድሮኑና Pi በ$2 ይለያያሉ – ሁለቱንም ሴንሰሮች ይፈትሹ።", "$1: dirooniin fi Pi $2 adda ba'u – sensaroota lamaan ilaalaa.");
R(/^Mosquito activity risk is (low|moderate|high) \((.+?) % humidity\)\.$/, "የትንኝ እንቅስቃሴ አደጋ $1 ነው ($2 % እርጥበት)።", "Balaan sochii hantuutaa $1 dha (jiidhina $2 %).");
R(/^Fire-weather risk is (low|moderate|high) \((.+?) % humidity\)\.$/, "የእሳት የአየር ሁኔታ አደጋ $1 ነው ($2 % እርጥበት)።", "Balaan haala qilleensaa ibiddaa $1 dha (jiidhina $2 %).");
R(/^Heat index (.+?) °C – (.+)\.$/, "የሙቀት መረጃ ጠቋሚ $1 °C – $2።", "Ibsaan ho'aa $1 °C – $2.");
R(/^Analysing (\d+)\/(\d+)\.\.\.$/, "በመተንተን ላይ $1/$2...", "Xiinxalaa jira $1/$2...");
R(/^Path finished \((\d+) steps\)$/, "መንገዱ ተጠናቋል ($1 ደረጃዎች)", "Karaan xumurameera (tarkaanfii $1)");
R(/^Step (\d+)\/(\d+): turning (left|right) 90°$/, "ደረጃ $1/$2፦ 90° ወደ $3 በመዞር ላይ", "Tarkaanfii $1/$2: 90° gara $3 garagalaa jira");
R(/^Step (\d+)\/(\d+): (driving forward|reversing) (.+) cm$/, "ደረጃ $1/$2፦ $4 ሴ.ሜ በመንዳት ላይ", "Tarkaanfii $1/$2: cm $4 deemaa jira");
R(/^(\d+) steps · (\d+) cm driven in total$/, "$1 ደረጃዎች · በጠቅላላው $2 ሴ.ሜ", "tarkaanfii $1 · cm $2 waliigala deeme");
R(/^Next report in (\d+)s( · last sent (\d+)s ago)?$/, "ቀጣዩ ሪፖርት በ$1 ሰከንድ ውስጥ$2", "Gabaasni itti aanu sekondii $1 keessatti$2");
R(/^Send CSV to Telegram every (\d+) min$/, "CSVን በየ$1 ደቂቃው ወደ ቴሌግራም ላክ", "CSV daqiiqaa $1 hundaa gara Teelegiraamii ergi");
R(/^Rows are tagged with operator (.+)\.$/, "ረድፎች በኦፕሬተር $1 ተመዝግበዋል።", "Sarara hojjetaa $1 waliin galmaa'a.");
R(/^(.+) sensor history \(CSV\)$/, "$1 የዳሳሽ ታሪክ (CSV)", "Seenaa sensara $1 (CSV)");
for (const [e, [a, o]] of Object.entries({"Drone": ["የድሮን", "Dirooni"], "Robot": ["የሮቦት", "Roobotii"]})) { /* titles handled by the rule above through tn() */ }

KBU.what.so = "Waa maxay:";             KBU.what.ar = "ما هو:";
KBU.cause.so = "Sababta uu u dhaco:";   KBU.cause.ar = "أسبابه:";
KBU.handle.so = "Sida loola dhaqmo:";   KBU.handle.ar = "كيفية التعامل معه:";
KBU.note.so = "Talo kaliya ah. Qiyaasaha iyo alaabta la ogolyahay weydii xafiiska xoolaha/beeraha ee degaankaaga ama dhakhtar.";
KBU.note.ar = "للإرشاد فقط. للجرعات والمنتجات المعتمدة اسأل مكتب الزراعة/الطب البيطري المحلي أو الطبيب.";
 
const addSoAr = rows => rows.forEach(([e, so, ar]) => { const d = DICT.get(e) || {}; d.so = so; d.ar = ar; DICT.set(e, d); });
addSoAr([
  ["Home", "Bogga hore", "الرئيسية"], ["AI Lab", "Shaybaarka AI", "مختبر الذكاء الاصطناعي"], ["Professionals", "Khubaro", "المختصون"],
  ["Drone", "Drone", "الطائرة المسيّرة"], ["Robot", "Rooboodh", "الروبوت"], ["Environment", "Deegaanka", "البيئة"],
  ["ESP32 Cam", "Kamarada ESP32", "كاميرا ESP32"], ["Pi Cam", "Kamarada Pi", "كاميرا Pi"], ["Me", "Aniga", "حسابي"], ["Exit", "Ka bax", "خروج"],
  ["ESP32 camera", "Kamarada ESP32", "كاميرا ESP32"], ["Pi camera", "Kamarada Pi", "كاميرا Pi"],
  ["Activate system", "Hawlgeli nidaamka", "تفعيل النظام"], ["Deactivate system", "Jooji nidaamka", "إيقاف النظام"],
  ["System standby", "Nidaamku wuu sugayaa", "النظام في وضع الاستعداد"],
  ["Operator sign-in", "Gelitaanka hawlwadeenka", "دخول المشغّل"], ["Your name", "Magacaaga", "اسمك"], ["Your age", "Da'daada", "عمرك"],
  ["Secret password (4+ letters)", "Erayga sirta ah (4+ xaraf)", "كلمة المرور (4 أحرف أو أكثر)"],
  ["Log in", "Gal", "تسجيل الدخول"], ["Create my account", "Samee akoonkayga", "إنشاء حسابي"],
  ["I already have an account", "Akoon ayaan leeyahay", "لدي حساب بالفعل"],
  ["I am new – make an account", "Waan cusub ahay – samee akoon", "أنا جديد – أنشئ حسابًا"],
  ["Please log in first.", "Fadlan marka hore gal.", "يرجى تسجيل الدخول أولًا."],
  ["Name or password is not right.", "Magaca ama erayga sirta ah waa khalad.", "الاسم أو كلمة المرور غير صحيحة."],
  ["That name is taken. Try another!", "Magacaas waa la qaatay. Mid kale isku day!", "هذا الاسم مستخدم. جرّب اسمًا آخر!"],
  ["Live", "Toos", "مباشر"], ["Offline", "Khadka kuma jiro", "غير متصل"], ["Manual", "Gacanta", "يدوي"], ["Autonomous", "Is-xakameeya", "ذاتي"],
  ["Stop", "Jooji", "إيقاف"], ["Close", "Xir", "إغلاق"], ["Clear", "Nadiifi", "مسح"], ["Turn off", "Demi", "إطفاء"],
  ["Sending...", "Waa la dirayaa...", "جارٍ الإرسال..."], ["Sent.", "La diray.", "تم الإرسال."], ["Nothing yet.", "Wax ma jiraan weli.", "لا شيء بعد."],
  ["no data yet", "xog weli ma jirto", "لا توجد بيانات بعد"], ["no recent data", "xog dhow ma jirto", "لا توجد بيانات حديثة"],
  ["Waiting for a picture...", "Sawir ayaa la sugayaa...", "في انتظار صورة..."],
  ["Live video", "Muuqaal toos ah", "بث مباشر"], ["Photo", "Sawir", "صورة"],
  ["Start recording", "Bilow duubista", "بدء التسجيل"], ["Stop recording", "Jooji duubista", "إيقاف التسجيل"],
  ["Video sent to Telegram.", "Muuqaalka waxaa loo diray Telegram.", "تم إرسال الفيديو إلى تيليجرام."],
  ["Pause recognition", "Hakad geli aqoonsiga", "إيقاف التعرف مؤقتًا"], ["Resume recognition", "Sii wad aqoonsiga", "استئناف التعرف"],
  ["Raspberry Pi Night Camera", "Kamarada habeenka ee Raspberry Pi", "كاميرا Raspberry Pi الليلية"], ["ESP32 Camera", "Kamarada ESP32", "كاميرا ESP32"],
  ["Simultaneous detection", "Ogaanshaha isku mar", "الكشف المتزامن"], ["Detection on", "Ogaanshuhu wuu shidan yahay", "الكشف مفعّل"],
  ["Send alerts to Telegram", "U dir digniinaha Telegram", "إرسال التنبيهات إلى تيليجرام"],
  ["Choose at least one model.", "Dooro ugu yaraan hal model.", "اختر نموذجًا واحدًا على الأقل."],
  ["AI Lab – manual recognition", "Shaybaarka AI – aqoonsi gacanta ah", "مختبر الذكاء الاصطناعي – تعرّف يدوي"],
  ["Drop an image or a video here, or tap to choose", "Halkan ku rid sawir ama muuqaal, ama taabo si aad u doorato", "أفلت صورة أو فيديو هنا، أو اضغط للاختيار"],
  ["Use webcam", "Isticmaal webcam", "استخدم كاميرا الويب"], ["Use ESP32-CAM", "Isticmaal ESP32-CAM", "استخدم ESP32-CAM"],
  ["Send the result to the Telegram professionals automatically", "U dir natiijada khubarada Telegram si toos ah", "أرسل النتيجة تلقائيًا إلى مختصي تيليجرام"],
  ["Capture & analyse", "Qaad oo falanqee", "التقاط وتحليل"], ["Start live", "Bilow toos", "بدء البث"], ["Stop live", "Jooji toosinta", "إيقاف البث"],
  ["Send to Telegram professionals", "U dir khubarada Telegram", "إرسال إلى مختصي تيليجرام"],
  ["Analyse latest picture", "Falanqee sawirka ugu dambeeyay", "تحليل أحدث صورة"],
  ["Replies to you", "Jawaabaha laguu soo diray", "الردود الموجهة إليك"],
  ["Send a case to the professionals", "U dir kiis khubarada", "أرسل حالة إلى المختصين"],
  ["Send to Telegram", "U dir Telegram", "إرسال إلى تيليجرام"], ["Group conversation", "Wada hadalka kooxda", "محادثة المجموعة"],
  ["Log out", "Ka bax", "تسجيل الخروج"],
  ["Drone Sensors", "Dareemayaasha Drone-ka", "حساسات الطائرة المسيّرة"], ["Drone camera", "Kamarada drone-ka", "كاميرا الطائرة"],
  ["Robot control", "Xakamaynta rooboodhka", "التحكم بالروبوت"], ["Robot camera", "Kamarada rooboodhka", "كاميرا الروبوت"],
  ["Start autonomous mode", "Bilow habka is-xakameeya", "بدء الوضع الذاتي"], ["Stop autonomous mode", "Jooji habka is-xakameeya", "إيقاف الوضع الذاتي"],
  ["Robot online", "Rooboodhku khadka ayuu ku jiraa", "الروبوت متصل"], ["Robot offline", "Rooboodhku khadka kuma jiro", "الروبوت غير متصل"],
  ["Water pump & fire control", "Bamka biyaha & xakamaynta dabka", "مضخة المياه ومكافحة الحريق"],
  ["Pump ON", "Bamka shid", "تشغيل المضخة"], ["Pump OFF", "Bamka demi", "إيقاف المضخة"],
  ["Environment analysis", "Falanqaynta deegaanka", "تحليل البيئة"], ["Assessment", "Qiimaynta", "التقييم"], ["Readings", "Akhrisyada", "القراءات"],
  ["Conditions look normal", "Xaaladuhu waa caadi", "الأوضاع تبدو طبيعية"],
  ["Needs attention", "Waxay u baahan tahay feejignaan", "تحتاج إلى انتباه"], ["Alert", "Digniin", "تنبيه"],
  ["Temperature", "Heerkulka", "درجة الحرارة"], ["Humidity", "Qoyaanka", "الرطوبة"], ["Air pressure", "Cadaadiska hawada", "الضغط الجوي"],
  ["Soil moisture", "Qoyaanka ciidda", "رطوبة التربة"], ["Light", "Iftiin", "الضوء"], ["Distance", "Masaafo", "المسافة"],
  ["Normal", "Caadi", "طبيعي"], ["Danger", "Khatar", "خطر"], ["Dry", "Engegan", "جاف"], ["Hot", "Kulul", "حار"], ["Comfortable", "Raaxo leh", "مريح"],
  ["Mapping mode", "Habka khariidadeynta", "وضع رسم المسار"],
  ["Forward", "Hore", "للأمام"], ["Backward", "Dib", "للخلف"], ["Left", "Bidix", "يسار"], ["Right", "Midig", "يمين"],
  ["Add step", "Ku dar tallaabo", "إضافة خطوة"], ["Run path", "Socodsii waddada", "تشغيل المسار"],
  ["Download full history", "Soo deji taariikhda oo dhan", "تنزيل السجل الكامل"],
  ["Search...", "Raadi...", "بحث..."], ["Search", "Raadi", "بحث"]
]);
RULES.push([/^Hello, (.+)$/, m => ({so: `Salaan, ${m[1]}`, ar: `مرحبًا، ${m[1]}`})]);
RULES.push([/^SYSTEM ACTIVE · operator (.+)$/, m => ({so: `NIDAAMKU WUU SHAQAYNAYAA · hawlwadeen ${m[1]}`, ar: `النظام يعمل · المشغّل ${m[1]}`})]);
RULES.push([/^Last picture (\d+)s ago$/, m => ({so: `Sawirkii ugu dambeeyay ${m[1]} ilbiriqsi kahor`, ar: `آخر صورة منذ ${m[1]} ثانية`})]);

KBU.what.ti = "እንታይ እዩ፦";
KBU.cause.ti = "ስለምንታይ ይፍጠር፦";
KBU.handle.ti = "ብኸመይ ንሕዞ፦";
KBU.note.ti = "ምኽሪ ጥራይ እዩ። ንመጠንን ዝተፈቐዱ ፍርያትን ናብ ቤት ጽሕፈት እንስሳን ሕርሻን ወይ ሓኪምን ኣከባቢኹም ሕተቱ።";
 
const addTi = rows => rows.forEach(([e, ti]) => { const d = DICT.get(e) || {}; d.ti = ti; DICT.set(e, d); });
addTi([
  ["Home", "መእተዊ"], ["AI Lab", "AI ላቦራቶሪ"], ["Professionals", "ክኢላታት"], ["Drone", "ድሮን"], ["Robot", "ሮቦት"], ["Environment", "ኣከባቢ"],
  ["ESP32 Cam", "ካሜራ ESP32"], ["Pi Cam", "ካሜራ Pi"], ["Me", "ናተይ"], ["Exit", "ውጻእ"], ["ESP32 camera", "ካሜራ ESP32"], ["Pi camera", "ካሜራ Pi"],
  ["Activate system", "ሲስተም ኣጀምር"], ["Deactivate system", "ሲስተም ኣቁም"], ["System standby", "ሲስተም ኣብ ምጽባይ ኣሎ"],
  ["Operator sign-in", "መእተዊ ኦፕሬተር"], ["Your name", "ስምኩም"], ["Your age", "ዕድመኹም"],
  ["Secret password (4+ letters)", "ምስጢራዊ ቃል (ልዕሊ 4 ፊደላት)"],
  ["Log in", "እቶ"], ["Create my account", "ኣካውንተይ ፍጠር"], ["I already have an account", "ኣካውንት ኣለኒ"],
  ["I am new – make an account", "ሓድሽ እየ – ኣካውንት ፍጠር"],
  ["Please log in first.", "በጃኹም ቅድም እቶ።"], ["Name or password is not right.", "ስም ወይ ቃል ጌጋ እዩ።"],
  ["That name is taken. Try another!", "እዚ ስም ተታሒዙ ኣሎ። ካልእ ፈትኑ!"],
  ["Live", "ቀጥታ"], ["Offline", "ኣብ መስመር የለን"], ["Manual", "ብኢድ"], ["Autonomous", "ባዕሉ ዝስርሕ"],
  ["Stop", "ኣቁም"], ["Close", "ዕጸው"], ["Clear", "ሰርዝ"], ["Turn off", "ኣጥፍእ"],
  ["Sending...", "ይለኣኽ ኣሎ..."], ["Sent.", "ተለኢኹ።"], ["Nothing yet.", "ክሳብ ሕጂ ዋላ ሓንቲ የለን።"],
  ["no data yet", "ክሳብ ሕጂ ዳታ የለን"], ["no recent data", "ሓድሽ ዳታ የለን"],
  ["Waiting for a picture...", "ስእሊ ይጽበ ኣሎ..."],
  ["Live video", "ቀጥታ ቪድዮ"], ["Photo", "ስእሊ"], ["Start recording", "ቀረጻ ጀምር"], ["Stop recording", "ቀረጻ ኣቁም"],
  ["Video sent to Telegram.", "ቪድዮ ናብ ቴሌግራም ተለኢኹ።"],
  ["Recording... (max 2 minutes)", "ይቕረጽ ኣሎ... (ልዕሊ 2 ደቒቕ ኣይኮነን)"],
  ["Pause recognition", "ምልላይ ኣዕርፍ"], ["Resume recognition", "ምልላይ ቀጽል"],
  ["Raspberry Pi Night Camera", "ናይ ለይቲ ካሜራ Raspberry Pi"], ["ESP32 Camera", "ካሜራ ESP32"],
  ["Simultaneous detection", "ብሓደ እዋን ምልላይ"], ["Detection on", "ምልላይ ተኸፊቱ ኣሎ"],
  ["Send alerts to Telegram", "ተጠንቀቕታታት ናብ ቴሌግራም ልኣኽ"],
  ["Choose at least one model.", "ብውሑዱ ሓደ ሞዴል ምረጹ።"],
  ["(off)", "(ጠፊኡ)"],
  ["AI Lab – manual recognition", "AI ላቦራቶሪ – ብኢድ ምልላይ"],
  ["Drop an image or a video here, or tap to choose", "ስእሊ ወይ ቪድዮ ኣብዚ ኣውርዱ፣ ወይ ንምምራጽ ጠውቑ"],
  ["Use webcam", "ዌብካም ተጠቐም"], ["Use ESP32-CAM", "ESP32-CAM ተጠቐም"],
  ["Send the result to the Telegram professionals automatically", "ውጽኢቱ ብባዕሉ ናብ ሞያውያን ቴሌግራም ልኣኽ"],
  ["Capture & analyse", "ስእሊ ውሰድን ተንትንን"], ["Start live", "ቀጥታ ጀምር"], ["Stop live", "ቀጥታ ኣቁም"],
  ["Send to Telegram professionals", "ናብ ሞያውያን ቴሌግራም ልኣኽ"], ["Analyse latest picture", "ናይ መወዳእታ ስእሊ ተንትን"],
  ["Auto-analyse new pictures", "ሓደስቲ ስእልታት ብባዕሉ ተንትን"], ["Stop auto-analyse", "ባዕላዊ ትንተና ኣቁም"],
  ["Replies to you", "ንዓኹም ዝተዋህቡ መልስታት"], ["Send a case to the professionals", "ጉዳይ ናብ ሞያውያን ልኣኽ"],
  ["Send to Telegram", "ናብ ቴሌግራም ልኣኽ"], ["Group conversation", "ናይ ጉጅለ ዘተ"],
  ["Log out", "ውጻእ"], ["Master Poultry Keeper!", "ምዕዉት ኣርቢ ደርሆ!"], ["Great Explorer!", "ሩፍ ተመራማሪ!"], ["Keep exploring!", "ምድላይ ቀጽሉ!"],
  ["Drone Sensors", "ሰንሰራት ድሮን"], ["Drone camera", "ካሜራ ድሮን"],
  ["Robot control", "ምቁጽጻር ሮቦት"], ["Robot camera", "ካሜራ ሮቦት"],
  ["Start autonomous mode", "ባዕሉ ዝስርሕ ኩነታት ጀምር"], ["Stop autonomous mode", "ባዕሉ ዝስርሕ ኩነታት ኣቁም"],
  ["Robot online", "ሮቦት ኣብ መስመር ኣሎ"], ["Robot offline", "ሮቦት ኣብ መስመር የለን"],
  ["Obstacle ahead – forward is blocked", "ኣብ ቅድሚት ዕንቅፋት ኣሎ – ንቕድሚት ምኻድ ተዓጽዩ"],
  ["Water pump & fire control", "ፓምፕ ማይን ምቁጽጻር ሓዊን"],
  ["Pump ON", "ፓምፕ ኣብርህ"], ["Pump OFF", "ፓምፕ ኣጥፍእ"], ["Moisture detection", "ምልላይ ርጥበት"], ["Flame detection", "ምልላይ ሓዊ"],
  ["Pump mode", "ኩነታት ፓምፕ"], ["Detection", "ምልላይ"],
  ["Soil is dry", "ሓመድ ደረቕ እዩ"],
  ["Environment analysis", "ትንተና ኣከባቢ"], ["Assessment", "ግምገማ"], ["Readings", "ንባባት"],
  ["Conditions look normal", "ኩነታት ንቡር ይመስል"], ["Needs attention", "ኣቓልቦ የድልዮ"], ["Alert", "ተጠንቀቕታ"],
  ["Temperature", "ሙቐት"], ["Humidity", "ርጥበት"], ["Air pressure", "ጸቕጢ ኣየር"], ["Soil moisture", "ርጥበት ሓመድ"],
  ["Light", "ብርሃን"], ["Distance", "ርሕቀት"], ["Air temperature", "ሙቐት ኣየር"],
  ["Normal", "ንቡር"], ["Danger", "ሓደጋ"], ["Dry", "ደረቕ"], ["Hot", "ሙቅ"], ["Comfortable", "ምቹእ"],
  ["Very cold", "ብጣዕሚ ቁሪ"], ["Cool", "ቀሪር"],
  ["Dew point", "ነጥቢ ጤዛ"], ["Heat index", "ሞንጎ ሙቐት"], ["Mosquito activity risk", "ሓደጋ ንጥፈት ንኣሽቱ ዓቕሪ"], ["Fire-weather risk", "ሓደጋ ኩነታት ኣየር ሓዊ"],
  ["Mapping mode", "ኩነታት ካርታ"],
  ["Forward", "ንቕድሚት"], ["Backward", "ንድሕሪት"], ["Left", "ጸጋም"], ["Right", "የማን"],
  ["Add step", "ደረጃ ወስኽ"], ["Run path", "መንገዲ ኣስርሕ"], ["Distance (cm)", "ርሕቀት (ሰ.ሜ)"],
  ["No steps yet.", "ክሳብ ሕጂ ደረጃ የለን።"], ["Running", "ይሰርሕ ኣሎ"],
  ["Download full history", "ምሉእ ታሪኽ ኣውርድ"], ["Stop automatic Telegram report", "ባዕላዊ ጸብጻብ ቴሌግራም ኣቁም"],
  ["Search...", "ድለ..."], ["Search", "ድለ"], ["Quiz", "ሕቶ"], ["Game", "ጸወታ"], ["Next", "ቀጺሉ"], ["Name", "ስም"]
]);
RULES.push([/^Hello, (.+)$/, m => ({ti: `ሰላም፣ ${m[1]}`})]);
RULES.push([/^SYSTEM ACTIVE · operator (.+)$/, m => ({ti: `ሲስተም ንጡፍ እዩ · ኦፕሬተር ${m[1]}`})]);
RULES.push([/^Last picture (\d+)s ago$/, m => ({ti: `ናይ መወዳእታ ስእሊ ቅድሚ ${m[1]} ሰከንድ`})]);
RULES.push([/^Scan a (.+)$/, m => ({ti: `${m[1]} ስካን ግበር`})]);
RULES.push([/^Score: (\d+)$/, m => ({ti: `ነጥቢ፦ ${m[1]}`})]);
RULES.push([/^(\d+) stars$/, m => ({ti: `${m[1]} ኮኾብ`})]);
RULES.push([/^Error: (.+)$/, m => ({ti: `ጌጋ፦ ${m[1]}`})]);
RULES.push([/^ALERT: (.+)$/, m => ({ti: `ተጠንቀቕታ፦ ${m[1]}`})]);
RULES.push([/^(\d+(?:\.\d+)?) cm$/, m => ({ti: `${m[1]} ሰ.ሜ`})]);

/* translate one piece of text. Returns null when nothing is known (the English stays). */
function tcore(c) {
  const d = DICT.get(c); if (d && d[lang]) return d[lang];
  for (const [re, f] of RULES) { const m = c.match(re); if (m) { const v = f(m)[lang]; if (v) return v; } }
  const lm = c.match(/^((?:[^\w\s]+ )?)([A-Za-z][^:]{2,40}): (.+)$/);        // "🌡️ Temperature: 40.0 °C"  ->  label translated, value kept
  if (lm) { const d2 = DICT.get(lm[2]); if (d2 && d2[lang]) return lm[1] + d2[lang] + ": " + lm[3]; }
  return null;
}
function trText(en) {
  const m = en.match(/^(\s*)([\s\S]*?)(\s*)$/); if (!m[2]) return en;
  const core = m[2]; let out = tcore(core);
  if (out == null) {                                                        // "reading – rating" and "a · b · c" are translated piece by piece
    const parts = core.split(/( – | · )/);
    if (parts.length > 1) { let ch = false; const p2 = parts.map((p, i) => { if (i % 2) return p; const t = tcore(p); if (t != null) ch = true; return t == null ? p : t; }); if (ch) out = p2.join(""); }
  }
  return m[1] + (out == null ? core : out) + m[3];
}

/* ---- engine: translates text nodes and placeholders as they appear, and everything again when the language changes ---- */
const trOrig = new WeakMap();                                              // text node -> {en: English text, shown: what is displayed}
function trNode(n) {
  const p = n.parentElement; if (!p || /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName) || p.closest(".kb")) return;
  const rec = trOrig.get(n), cur = n.nodeValue, en = rec && rec.shown === cur ? rec.en : cur;
  const out = lang === "en" ? en : trText(en);
  if (out !== cur) n.nodeValue = out;
  trOrig.set(n, {en, shown: out});
}
function trAttrs(root) {
  if (!root.querySelectorAll) return;
  const list = [...root.querySelectorAll("[placeholder]")]; if (root.matches && root.matches("[placeholder]")) list.push(root);
  list.forEach(el => { if (!("enPh" in el.dataset)) el.dataset.enPh = el.getAttribute("placeholder"); const en = el.dataset.enPh; el.setAttribute("placeholder", lang === "en" ? en : (tcore(en) || en)); });
}
function trWalk(root) {
  if (root.nodeType === 3) { trNode(root); return; }
  if (root.nodeType !== 1) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), list = []; let n;
  while ((n = w.nextNode())) list.push(n);
  list.forEach(trNode); trAttrs(root); fillKb(root);
}
const langLabel = () => { const b = document.getElementById("langBtn"); if (b) { b.innerHTML = ic("globe") + LANGS[lang][0]; b.title = "English / አማርኛ / Afaan Oromoo / Soomaali / العربية / ትግርኛ"; } };
function setLang(l) {
  lang = l; try { localStorage.setItem("dy-lang", l); } catch (e) {}
  document.documentElement.lang = l;
  document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  document.body.classList.remove("lang-am", "lang-om", "lang-so", "lang-ar", "lang-ti");
  if (l !== "en") document.body.classList.add("lang-" + l);
  langLabel(); trWalk(document.body);
}
function startLanguages() {
  const st = document.createElement("style");
  st.textContent = `body.lang-am,body.lang-ti{font-family:"Noto Sans Ethiopic","Nyala","Abyssinica SIL",system-ui,sans-serif}body.lang-ar{font-family:"Noto Naskh Arabic","Segoe UI",Tahoma,system-ui,sans-serif}.kb{text-align:start!important}.kb p{line-height:1.5;margin:.5em 0}`;
  document.head.appendChild(st);
  const b = document.createElement("button"), t = document.getElementById("themeBtn");
  b.id = "langBtn"; b.type = "button";
  if (t) { b.className = t.className; t.insertAdjacentElement("afterend", b); } else (document.querySelector("header") || document.body).appendChild(b);
  b.onclick = () => { const k = Object.keys(LANGS); setLang(k[(k.indexOf(lang) + 1) % k.length]); };
  new MutationObserver(recs => { for (const r of recs) { if (r.type === "characterData") trNode(r.target); else r.addedNodes.forEach(trWalk); } })
    .observe(document.body, {childList: true, subtree: true, characterData: true});
  setLang(lang);
}
if (document.body) startLanguages(); else document.addEventListener("DOMContentLoaded", startLanguages);

init();