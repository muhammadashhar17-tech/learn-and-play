// Lets the page show its "New version available" card for the Windows app
// (lib/update.ts reads window.lpDesktop). Nothing else is exposed.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("lpDesktop", {
  updateReady: () => ipcRenderer.invoke("lp:update-ready"),
  onUpdateReady: (cb) => ipcRenderer.on("lp:update-ready", () => cb()),
  installUpdate: () => ipcRenderer.send("lp:install-update"),
});
