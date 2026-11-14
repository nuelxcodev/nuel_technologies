const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("nuel", {
  getCfg: () => ipcRenderer.invoke("cfg:get"),
  setCfg: (c) => ipcRenderer.invoke("cfg:set", c),
  login: (email, password) => ipcRenderer.invoke("login", email, password),
  logout: () => ipcRenderer.invoke("logout"),
  api: (method, path, body) => ipcRenderer.invoke("api", method, path, body),
  upload: (file) => ipcRenderer.invoke("upload", file),
});
