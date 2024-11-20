const { contextBridge, ipcRenderer } = require('electron');

// The contextBridge API is used to expose specific parts of the main process to the renderer process in a secure way
contextBridge.exposeInMainWorld('electron', {
  // You can expose custom functions from the main process to the renderer process here

  // Example: expose document manipulation safely
  document: {
    getElementById: (id) => document.getElementById(id),
    addEventListener: (event, callback) => document.addEventListener(event, callback)
  },
  
  // Example of exposing IPC communication methods (if needed)
  ipcRenderer: ipcRenderer,
});
