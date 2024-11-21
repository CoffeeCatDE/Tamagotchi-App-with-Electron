const { contextBridge, ipcRenderer } = require('electron');

let hunger = 100;
let stimmung = 100;
let schlaf = 100;
let schlaeft = false;
let lebt = true;
let startZeit = Date.now();
let jahresDauer = 5000;
// let intervallID_verschlechtern = setInterval(zustandVerschlechtern, 500);
let intervallID_alter = setInterval(berechneJahre, jahresDauer);


function berechneJahre() {
  if (lebt) {
    let vergangeneZeit = Date.now() - startZeit;
    let jahre = Math.floor(vergangeneZeit / (1000 * 60 * 60 * 24 * 365));
    console.log("Jahre vergangen: " + jahre);
  }
}

contextBridge.exposeInMainWorld('electron', {
  hungerStatus: hunger,
  stimmungStatus: stimmung,
  schlafStatus: schlaf,
  schlaeftStatus: schlaeft,
  lebtStatus: lebt,
  jahresDauer: jahresDauer,


  toeten () {
    hungerStatus = 0;
    stimmungStatus = 0;
    schlafStatus = 0;
    lebtStatus = false;
  },
  getHunger: () => hunger,
  getStimmung: () => stimmung,
  getSchlaf: () => schlaf,
  isAlive: () => lebt,
  setHunger: () => hunger+= 5,
  reduceHunger: () => hunger -= 1,
  reduceStimmung: () => stimmung -= 1,
  reduceSchlaf: () => schlaf -= 1,

  setStimmung: () => stimmung+=10,
  setSchlaf: () => schlaf = !schlaf,
  getSchlaeft: () => schlaeft,
  ipcRenderer: ipcRenderer
});
