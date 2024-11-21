const path = require('path');
const { app, BrowserWindow, document } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 585,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // Point to preload.js
      nodeIntegration: false, // Ensuring that Node.js integration is not enabled directly in the renderer
      contextIsolation: true, // Enabling context isolation for better security
    }
  });
// win.webContents.openDevTools()
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


