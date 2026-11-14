// Main process. All network calls and the login token live here, never in the page.
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require("fs");

let token = null;
let cfgFile;

const readCfg = () => { try { return JSON.parse(fs.readFileSync(cfgFile, "utf8")); } catch { return {}; } };
const writeCfg = (c) => fs.writeFileSync(cfgFile, JSON.stringify(c));
const baseUrl = () => {
  const u = (readCfg().apiUrl || "").replace(/\/+$/, "");
  if (!/^https?:\/\//.test(u)) throw new Error("Enter your API address first (for example https://api.yourdomain.com).");
  return u;
};
const fail = (e) => ({ ok: false, status: 0, data: { error: e.name === "TimeoutError" ? "The server took too long to respond." : e.message.startsWith("Enter your") ? e.message : `Cannot reach the server. ${e.message}` } });

async function call(method, p, body) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(baseUrl() + p, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(20000) });
  let data = null;
  try { data = await res.json(); } catch { /* empty body */ }
  return { ok: res.ok, status: res.status, data };
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1320, height: 860, minWidth: 1020, minHeight: 660, backgroundColor: "#050505", title: "Nuel Admin",
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  win.setMenuBarVisibility(false);
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:\/\//.test(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e) => e.preventDefault());
  win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

app.whenReady().then(() => {
  cfgFile = path.join(app.getPath("userData"), "config.json");

  ipcMain.handle("cfg:get", () => readCfg());
  ipcMain.handle("cfg:set", (_e, c) => { writeCfg({ apiUrl: String(c.apiUrl || "").trim(), email: String(c.email || "").trim() }); return true; });

  ipcMain.handle("login", async (_e, email, password) => {
    try {
      const r = await call("POST", "/api/auth/login", { email, password });
      token = r.ok ? r.data.token : null;
      return { ok: r.ok, status: r.status, data: { email: r.data?.email, error: r.data?.error } };
    } catch (e) { return fail(e); }
  });
  ipcMain.handle("logout", () => { token = null; return true; });

  ipcMain.handle("api", async (_e, method, p, body) => {
    try {
      if (typeof p !== "string" || !(p === "/health" || p.startsWith("/api/"))) throw new Error("Blocked request");
      if (!["GET", "POST", "PUT", "DELETE"].includes(method)) throw new Error("Blocked request");
      return await call(method, p, body);
    } catch (e) { return fail(e); }
  });

  ipcMain.handle("upload", async (_e, { name, data }) => {
    try {
      const form = new FormData();
      form.append("file", new Blob([data]), String(name || "image"));
      const res = await fetch(baseUrl() + "/api/admin/upload", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form, signal: AbortSignal.timeout(60000) });
      let json = null;
      try { json = await res.json(); } catch { /* empty */ }
      return { ok: res.ok, status: res.status, data: json };
    } catch (e) { return fail(e); }
  });

  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
