const { contextBridge, ipcRenderer } = require('electron');

let hunger = 100;
let stimmung = 100;
let schlafStatus = 100;
let schlaeft = false;
let lebt = true;
let startZeit = Date.now();
let jahresDauer = 3000;


contextBridge.exposeInMainWorld('electron', {
  hungerStatus: hunger,
  stimmungStatus: stimmung,
  schlaeft: schlaeft,
  lebtStatus: lebt,
  jahresDauer: jahresDauer,
  startZeit: startZeit,
  schlafStatus: schlafStatus,


  toeten () {
    hungerStatus = 0;
    stimmungStatus = 0;
    schlafStatus = 0;
    lebtStatus = false;
  },
  getHunger: () => hunger,
  getStimmung: () => stimmung,
  getSchlaeft: () => schlaeft,
  isAlive: () => lebt,
  setHunger: () => hunger+= 5,
  reduceHunger: () => hunger -= 1,
  reduceStimmung: () => stimmung -= 1,
  reduceSchlaf: () => schlafStatus -= 1,

  setStimmung: () => stimmung+=10,
  setSchlaf: () => schlafStatus += 100,
  getSchlaf: () => schlafStatus,
  getSchlafStatus: () => schlafStatus,
  setSchlaeft: () => !schlaeft,
  ipcRenderer: ipcRenderer
});
