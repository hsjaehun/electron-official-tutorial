const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("versions", {
   node: () => process.versions.node,
   chrome: () => process.versions.chrome,
   electron: () => process.versions.electron,
   // we can also expose variables, not just functions
});

// contextBridge.exposeInMainWorld("elecronAPI", {
//    setTitle: (title) => ipcRenderer.send("set-title", title),
// });
contextBridge.exposeInMainWorld("whatCanYouDo", {
   setAlert: (msg) => ipcRenderer.send("setMsg", msg),
});
