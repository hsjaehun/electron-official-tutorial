const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
   const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         preload: path.join(__dirname, "preload.js"),
      },
   });
   ipcMain.on("set-title", (event, title) => {
      const webContents = event.sender;
      const win = BrowserWindow.fromWebContents(webContents);
      win.setTitle(title);
   });
   ipcMain.on("setMsg", (event, title) => {
      const webContents = event.sender;
      const win = BrowserWindow.fromWebContents(webContents);
      win.alert(title);
   });

   win.loadFile("index.html");
   win.webContents.openDevTools();
};

app.whenReady().then(() => {
   createWindow();
   app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow();
      }
   });
});

app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
      app.quit();
   }
});
