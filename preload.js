const { contextBridge, ipcRenderer } = require('electron');

let hunger = 100;
let stimmung = 100;
let schlaf = 100;
let schlaeft = false;
let lebt = true;
let startZeit = Date.now();
let jahresDauer = 5000;
let intervallID_verschlechtern = setInterval(zustandVerschlechtern, 500);
let intervallID_alter = setInterval(berechneJahre, jahresDauer);

function zustandVerschlechtern() {
  if (lebt) {
    hunger -= 1;
    stimmung -= 1;
    schlaf -= 1;

    if (hunger <= 0 || stimmung <= 0 || schlaf <= 0) {
      lebt = false;
      clearInterval(intervallID_verschlechtern);
      clearInterval(intervallID_alter);
      console.log("Die Figur ist gestorben.");
    }
  }
}

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

  getHunger: () => hunger,
  getStimmung: () => stimmung,
  getSchlaf: () => schlaf,
  isAlive: () => lebt,
  setHunger: () => hunger+= 5,
  setStimmung: () => stimmung+=10,
  setSchlaf: (wert) => schlaf = !schlaf,
  getSchlaeft: () => schlaeft,

  ipcRenderer: ipcRenderer
});
