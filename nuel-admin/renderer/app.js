"use strict";
/* Nuel Admin: renderer. No inline handlers (CSP). All dynamic text goes through esc(). */

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");
const initials = (n) => String(n || "?").split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();

const ICONS = {
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  briefcase: "M4 8h16a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a1 1 0 011-1zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18",
  users: "M9 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5M16 4.5a3.5 3.5 0 010 7M18 14.8c2 .6 3.2 2.4 3.5 5.2",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  plus: "M12 5v14M5 12h14",
  edit: "M4 20h4l10-10-4-4L4 16zM14 6l4 4",
  trash: "M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13",
  out: "M10 4H5v16h5M15 8l4 4-4 4M19 12H9",
  key: "M14 10a4 4 0 11-4-4 4 4 0 014 4zM13 13l7 7M17 17l-2 2",
  close: "M6 6l12 12M18 6L6 18",
};
const ico = (n) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n]}"/></svg>`;

/* ---------- Content types: columns for the table and fields for the form ---------- */
const DEPTS = ["Engineering", "Design", "Media", "Marketing", "Operations", "General"];
const TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const SCHEMAS = {
  jobs: {
    title: "Jobs", one: "job", icon: "briefcase", flag: "open", on: "Open", off: "Closed",
    label: (d) => d.title,
    heads: ["Role", "Location", "Posted"],
    cols: [(d) => `<b>${esc(d.title)}</b><small>${esc(d.department)} · ${esc(d.type)}</small>`, (d) => esc(d.location), (d) => esc(fmtDate(d.posted))],
    fields: [
      { k: "title", l: "Job title", req: 1, full: 1 },
      { k: "department", l: "Department", t: "select", opts: DEPTS },
      { k: "type", l: "Employment type", t: "select", opts: TYPES },
      { k: "location", l: "Location", ph: "Remote or on-site" },
      { k: "level", l: "Level", ph: "Mid level" },
      { k: "summary", l: "Summary", t: "textarea", full: 1 },
      { k: "responsibilities", l: "What you will do", t: "lines", full: 1, hint: "One item per line" },
      { k: "requirements", l: "What we are looking for", t: "lines", full: 1, hint: "One item per line" },
      { k: "open", l: "Open for applications (shown on the website)", t: "bool", full: 1 },
    ],
    blank: { department: "Engineering", type: "Full-time", open: true, responsibilities: [], requirements: [] },
  },
  team: {
    title: "Team", one: "team member", icon: "users", flag: "published", on: "Visible", off: "Hidden",
    label: (d) => d.name,
    heads: ["Person", "Order"],
    cols: [(d) => `<div class="who"><div class="thumb">${d.photo ? `<img src="${esc(d.photo)}" alt="">` : esc(initials(d.name))}</div><div><b>${esc(d.name)}</b><small>${esc(d.role)}</small></div></div>`, (d) => esc(d.order ?? 0)],
    fields: [
      { k: "name", l: "Full name", req: 1 },
      { k: "role", l: "Role / title", req: 1 },
      { k: "bio", l: "Short bio", t: "textarea", full: 1 },
      { k: "photo", l: "Photo", t: "image", full: 1 },
      { k: "order", l: "Display order", t: "number", hint: "Smaller numbers appear first" },
      { k: "published", l: "Show on the website", t: "bool" },
    ],
    blank: { published: true, order: 0 },
  },
  projects: {
    title: "Projects", one: "project", icon: "layers", flag: "published", on: "Visible", off: "Hidden",
    label: (d) => d.title,
    heads: ["Project", "Client", "Review"],
    cols: [(d) => `<div class="who"><div class="thumb">${d.image ? `<img src="${esc(d.image)}" alt="">` : esc(initials(d.title))}</div><div><b>${esc(d.title)}</b><small>${esc(d.category)}</small></div></div>`, (d) => esc(d.client), (d) => (d.review?.quote ? `${"★".repeat(d.review.rating || 0)}<small>${esc(d.review.name)}</small>` : `<small>None yet</small>`)],
    fields: [
      { k: "title", l: "Project title", req: 1, full: 1 },
      { k: "description", l: "Project details", t: "textarea", rows: 4, full: 1 },
      { k: "category", l: "Category", ph: "Web app, Mobile app, Streaming..." },
      { k: "tags", l: "Tags", t: "lines", hint: "One per line" },
      { k: "client", l: "Client" },
      { k: "industry", l: "Industry" },
      { k: "year", l: "Year", ph: "2026" },
      { k: "duration", l: "Duration", ph: "10 weeks" },
      { k: "link", l: "Project link (optional)", t: "url", full: 1 },
      { k: "image", l: "Cover image (optional, otherwise abstract art is used)", t: "image", full: 1 },
      { sec: "Client review (final feedback from the client)" },
      { k: "review.quote", l: "Review", t: "textarea", full: 1 },
      { k: "review.name", l: "Client name" },
      { k: "review.role", l: "Their role" },
      { k: "review.company", l: "Company" },
      { k: "review.rating", l: "Rating", t: "select", opts: ["5", "4", "3", "2", "1", "0"] },
      { sec: "Display" },
      { k: "order", l: "Display order", t: "number", hint: "Smaller numbers appear first; the first two show on the website" },
      { k: "published", l: "Show on the website", t: "bool" },
    ],
    blank: { published: true, order: 0, tags: [], review: { rating: 5 } },
  },
};

const state = { user: null, view: "overview", data: { jobs: [], team: [], projects: [] }, q: "", health: null, loadError: "" };
const app = $("#app");

/* ---------- helpers ---------- */
const getPath = (o, p) => p.split(".").reduce((a, k) => (a == null ? undefined : a[k]), o);
const setPath = (o, p, v) => { const ks = p.split("."); ks.slice(0, -1).reduce((a, k) => (a[k] ??= {}), o)[ks.at(-1)] = v; };
const idOf = (k) => "f_" + k.replaceAll(".", "_");

function toast(msg, kind = "ok") {
  const t = document.createElement("div");
  t.className = "toast " + kind; t.textContent = msg;
  $("#toasts").append(t);
  setTimeout(() => t.remove(), 3800);
}

async function api(method, path, body) {
  const r = await nuel.api(method, path, body);
  if (r.status === 401 && state.user) { await signOut("Your session expired. Please sign in again."); throw new Error("unauthorized"); }
  return r;
}

/* ---------- login ---------- */
async function showLogin(message = "") {
  const cfg = await nuel.getCfg();
  app.innerHTML = `
    <div class="login"><form class="card glass" id="lf" autocomplete="off">
      <div class="brand"><span class="logo"><svg viewBox="0 0 48 48"><path d="M14 35V13l20 22V13"/></svg></span>Nuel Admin</div>
      <h1>Sign in</h1><p class="sub">Manage the jobs, team and projects shown on your website.</p>
      ${message ? `<div class="err">${esc(message)}</div>` : ""}
      <div class="fld"><label for="api">API address</label><input id="api" type="url" placeholder="https://api.yourdomain.com" value="${esc(cfg.apiUrl || "http://localhost:4000")}" required></div>
      <div class="fld"><label for="em">Email</label><input id="em" type="email" value="${esc(cfg.email || "")}" required></div>
      <div class="fld"><label for="pw">Password</label><input id="pw" type="password" required></div>
      <button class="btn block" id="lb">Sign in</button>
    </form></div>`;
  $("#lf").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = $("#lb"); btn.disabled = true; btn.textContent = "Signing in...";
    await nuel.setCfg({ apiUrl: $("#api").value, email: $("#em").value });
    const r = await nuel.login($("#em").value.trim(), $("#pw").value);
    if (!r.ok) { showLogin(r.data?.error || "Could not sign in."); return; }
    state.user = r.data.email;
    await loadAll();
    render();
  });
}

async function signOut(message = "") {
  await nuel.logout();
  state.user = null; state.data = { jobs: [], team: [], projects: [] };
  showLogin(message);
}

/* ---------- data ---------- */
async function loadAll() {
  state.loadError = "";
  const [h, ...rs] = await Promise.all([nuel.api("GET", "/health"), ...Object.keys(SCHEMAS).map((k) => api("GET", `/api/admin/${k}`))]);
  state.health = h.ok;
  Object.keys(SCHEMAS).forEach((k, i) => { if (rs[i].ok) state.data[k] = rs[i].data.items; else state.loadError = rs[i].data?.error || "Could not load data."; });
}

/* ---------- shell ---------- */
function render() {
  const nav = (id, label, icon, n) => `<button class="nav ${state.view === id ? "on" : ""}" data-view="${id}">${ico(icon)}${label}${n != null ? `<span class="n">${n}</span>` : ""}</button>`;
  app.innerHTML = `<div class="shell">
    <aside class="glass">
      <div class="brand"><span class="logo"><svg viewBox="0 0 48 48"><path d="M14 35V13l20 22V13"/></svg></span>Nuel Admin</div>
      ${nav("overview", "Overview", "grid")}
      ${Object.entries(SCHEMAS).map(([k, s]) => nav(k, s.title, s.icon, state.data[k].length)).join("")}
      <div class="sp"></div>
      ${nav("account", "Account", "key")}
      <button class="nav" data-act="signout">${ico("out")}Sign out</button>
      <div class="me">${esc(state.user)}</div>
    </aside>
    <main id="main"></main></div>`;
  renderMain();
}

function renderMain() {
  const m = $("#main");
  if (state.view === "overview") return (m.innerHTML = overview());
  if (state.view === "account") return (m.innerHTML = account());
  m.innerHTML = list(state.view);
  const s = $("#q"); if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
}

function overview() {
  return `<div class="top"><h2>Overview</h2><span class="pill ${state.health ? "ok" : "bad"}">${state.health ? "API connected" : "API unreachable"}</span></div>
    ${state.loadError ? `<div class="err">${esc(state.loadError)}</div>` : ""}
    <div class="grid">${Object.entries(SCHEMAS).map(([k, s]) => {
      const live = state.data[k].filter((d) => d[s.flag] !== false).length;
      return `<div class="stat glass" data-view="${k}"><b>${state.data[k].length}</b><span>${s.title} · ${live} live on the website</span></div>`;
    }).join("")}</div>
    <div class="panel glass pad"><h3 class="mb8">How updates reach the website</h3>
    <p class="muted">Everything you add or change here is saved through your API. The website reads from the API and refreshes automatically within about a minute. Use the Visible / Open switch to hide something without deleting it.</p>
    <div class="row">${Object.entries(SCHEMAS).map(([k, s]) => `<button class="btn ghost" data-new="${k}">${ico("plus")}Add ${s.one}</button>`).join("")}</div></div>`;
}

function list(kind) {
  const S = SCHEMAS[kind];
  const q = state.q.toLowerCase();
  const rows = state.data[kind].filter((d) => !q || JSON.stringify(d).toLowerCase().includes(q));
  return `<div class="top"><h2>${S.title}</h2>
      <input class="search" id="q" type="text" placeholder="Search ${S.title.toLowerCase()}..." value="${esc(state.q)}" aria-label="Search">
      <button class="btn" data-new="${kind}">${ico("plus")}Add ${S.one}</button></div>
    ${state.loadError ? `<div class="err">${esc(state.loadError)}</div>` : ""}
    <div class="panel glass">${rows.length ? `<table><thead><tr>${S.heads.map((h) => `<th>${h}</th>`).join("")}<th>Status</th><th></th></tr></thead><tbody>
      ${rows.map((d) => `<tr>${S.cols.map((c) => `<td>${c(d)}</td>`).join("")}
        <td><button class="pill ${d[S.flag] !== false ? "ok" : "off"}" data-toggle="${kind}:${d.id}" title="Click to switch">${d[S.flag] !== false ? S.on : S.off}</button></td>
        <td><div class="act"><button class="ibtn" data-edit="${kind}:${d.id}" aria-label="Edit">${ico("edit")}</button><button class="ibtn del" data-del="${kind}:${d.id}" aria-label="Delete">${ico("trash")}</button></div></td></tr>`).join("")}
      </tbody></table>` : `<div class="empty"><h3>${q ? "No matches" : `No ${S.title.toLowerCase()} yet`}</h3>${q ? "Try a different search." : `Click “Add ${S.one}” to create the first one.`}</div>`}</div>`;
}

function account() {
  return `<div class="top"><h2>Account</h2></div><form class="panel glass" id="pf">
    <h3 class="mb16">Change password</h3>
    <div class="fld"><label for="cp">Current password</label><input id="cp" type="password" required></div>
    <div class="fld"><label for="np">New password</label><input id="np" type="password" minlength="10" required><small class="h">At least 10 characters</small></div>
    <button class="btn">Update password</button></form>`;
}

/* ---------- form ---------- */
function fieldHtml(f, rec) {
  if (f.sec) return `<div class="sec">${esc(f.sec)}</div>`;
  const id = idOf(f.k), v = getPath(rec, f.k);
  const label = `<label for="${id}">${esc(f.l)}${f.req ? " <i>*</i>" : ""}</label>`;
  const hint = f.hint ? `<small class="h">${esc(f.hint)}</small>` : "";
  let input;
  if (f.t === "bool") return `<div class="fld full"><label class="chk"><input type="checkbox" id="${id}" name="${f.k}" ${v ? "checked" : ""}><span>${esc(f.l)}</span></label></div>`;
  if (f.t === "textarea") input = `<textarea id="${id}" name="${f.k}" rows="${f.rows || 3}">${esc(v)}</textarea>`;
  else if (f.t === "lines") input = `<textarea id="${id}" name="${f.k}" rows="4" placeholder="One per line">${esc((v || []).join("\n"))}</textarea>`;
  else if (f.t === "select") input = `<select id="${id}" name="${f.k}">${f.opts.map((o) => `<option ${String(v) === o ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
  else if (f.t === "number") input = `<input type="number" min="0" max="9999" id="${id}" name="${f.k}" value="${esc(v ?? 0)}">`;
  else if (f.t === "image") input = `<div class="img"><div class="prev" data-prev="${f.k}">${v ? `<img src="${esc(v)}" alt="">` : "No image"}</div><div><input type="url" id="${id}" name="${f.k}" value="${esc(v)}" placeholder="https://..."><div><button type="button" class="btn ghost sm" data-upload="${f.k}">${ico("plus")}Upload image</button><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-file="${f.k}" hidden></div></div></div>`;
  else input = `<input type="${f.t === "url" ? "url" : "text"}" id="${id}" name="${f.k}" value="${esc(v)}" ${f.ph ? `placeholder="${esc(f.ph)}"` : ""} ${f.req ? "required" : ""}>`;
  return `<div class="fld ${f.full ? "full" : ""}">${label}${input}${hint}</div>`;
}

function collect(S, form) {
  const out = {};
  for (const f of S.fields) {
    if (f.sec) continue;
    const el = form.querySelector(`[name="${f.k}"]`);
    let v;
    if (f.t === "bool") v = el.checked;
    else if (f.t === "lines") v = el.value.split("\n").map((x) => x.trim()).filter(Boolean);
    else if (f.t === "number") v = el.value === "" ? 0 : Number(el.value);
    else v = el.value.trim();
    setPath(out, f.k, v);
  }
  if (out.review) {
    const r = out.review;
    out.review = r.quote || r.name || r.role || r.company ? { ...r, rating: Number(r.rating) } : null;
  }
  return out;
}

function modal(html) {
  const ov = document.createElement("div");
  ov.className = "ov"; ov.innerHTML = html;
  const close = () => { ov.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", onKey);
  ov.addEventListener("mousedown", (e) => { if (e.target === ov) close(); });
  ov.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) close(); });
  document.body.append(ov);
  return { ov, close };
}

function openForm(kind, id) {
  const S = SCHEMAS[kind];
  const rec = id ? state.data[kind].find((d) => d.id === id) : structuredClone(S.blank);
  const { ov, close } = modal(`<form class="modal" novalidate>
    <div class="mh"><h3>${id ? "Edit" : "Add"} ${S.one}</h3><button type="button" class="ibtn" data-close aria-label="Close">${ico("close")}</button></div>
    <div class="mb"><div class="err full" id="fe" hidden></div>${S.fields.map((f) => fieldHtml(f, rec)).join("")}</div>
    <div class="mf"><button type="button" class="btn ghost" data-close>Cancel</button><button class="btn" id="sv">${id ? "Save changes" : `Add ${S.one}`}</button></div></form>`);
  const form = $("form", ov);
  $("input,textarea", form)?.focus();

  form.addEventListener("click", (e) => { const b = e.target.closest("[data-upload]"); if (b) form.querySelector(`[data-file="${b.dataset.upload}"]`).click(); });
  form.addEventListener("change", async (e) => {
    const k = e.target.dataset.file; if (!k || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (file.size > 4 * 1024 * 1024) return toast("Image is too large (max 4 MB).", "bad");
    const r = await nuel.upload({ name: file.name, data: await file.arrayBuffer() });
    if (!r.ok) return toast(r.data?.error || "Upload failed.", "bad");
    form.querySelector(`[name="${k}"]`).value = r.data.url;
    form.querySelector(`[data-prev="${k}"]`).innerHTML = `<img src="${esc(r.data.url)}" alt="">`;
    toast("Image uploaded.");
  });
  form.addEventListener("input", (e) => {
    if (e.target.type === "url" && e.target.name) { const p = form.querySelector(`[data-prev="${e.target.name}"]`); if (p) p.innerHTML = e.target.value ? `<img src="${esc(e.target.value)}" alt="">` : "No image"; }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fe = $("#fe", form), btn = $("#sv", form);
    fe.hidden = true; btn.disabled = true;
    const body = collect(S, form);
    const r = id ? await api("PUT", `/api/admin/${kind}/${id}`, body) : await api("POST", `/api/admin/${kind}`, body);
    btn.disabled = false;
    if (!r.ok) {
      const lines = (r.data?.issues || []).map((i) => `${i.path || "form"}: ${i.message}`);
      fe.innerHTML = esc(r.data?.error || "Could not save.") + (lines.length ? "<br>" + lines.map(esc).join("<br>") : "");
      fe.hidden = false; return;
    }
    close();
    await loadAll(); render();
    toast(id ? "Changes saved." : `${S.one[0].toUpperCase() + S.one.slice(1)} added.`);
  });
}

function confirmDelete(kind, id) {
  const S = SCHEMAS[kind], rec = state.data[kind].find((d) => d.id === id);
  const { ov, close } = modal(`<div class="modal confirm"><h3>Delete ${S.one}?</h3><p>“${esc(S.label(rec))}” will be removed from the website. This cannot be undone. To hide it instead, cancel and use the status switch.</p>
    <div class="mf flat"><button class="btn ghost" data-close>Cancel</button><button class="btn danger" id="yes">Delete</button></div></div>`);
  $("#yes", ov).addEventListener("click", async () => {
    const r = await api("DELETE", `/api/admin/${kind}/${id}`);
    close();
    if (!r.ok) return toast(r.data?.error || "Could not delete.", "bad");
    await loadAll(); render(); toast("Deleted.");
  });
}

/* ---------- events (delegated) ---------- */
document.addEventListener("click", async (e) => {
  const t = (s) => e.target.closest(s);
  let el;
  if ((el = t("[data-view]"))) { state.view = el.dataset.view; state.q = ""; render(); }
  else if ((el = t("[data-new]"))) openForm(el.dataset.new);
  else if ((el = t("[data-edit]"))) { const [k, id] = el.dataset.edit.split(":"); openForm(k, id); }
  else if ((el = t("[data-del]"))) { const [k, id] = el.dataset.del.split(":"); confirmDelete(k, id); }
  else if ((el = t("[data-toggle]"))) {
    const [k, id] = el.dataset.toggle.split(":"), S = SCHEMAS[k], rec = state.data[k].find((d) => d.id === id);
    const r = await api("PUT", `/api/admin/${k}/${id}`, { [S.flag]: rec[S.flag] === false });
    if (!r.ok) return toast(r.data?.error || "Could not update.", "bad");
    rec[S.flag] = r.data[S.flag]; renderMain(); toast(r.data[S.flag] ? `Now ${S.on.toLowerCase()} on the website.` : `Now ${S.off.toLowerCase()}.`);
  } else if (t('[data-act="signout"]')) signOut();
});

document.addEventListener("input", (e) => { if (e.target.id === "q") { state.q = e.target.value; renderMain(); } });

document.addEventListener("submit", async (e) => {
  if (e.target.id !== "pf") return;
  e.preventDefault();
  const r = await api("POST", "/api/auth/password", { current: $("#cp").value, next: $("#np").value });
  if (!r.ok) return toast(r.data?.error || (r.data?.issues?.[0]?.message ?? "Could not update password."), "bad");
  e.target.reset(); toast("Password updated.");
});

showLogin();
