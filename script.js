const path = require('path');
const { app, BrowserWindow, document } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 900,
    lucy: "Lucy",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // Point to preload.js
      nodeIntegration: false, // Ensuring that Node.js integration is not enabled directly in the renderer
      contextIsolation: true, // Enabling context isolation for better security
    }
  });
win.webContents.openDevTools()
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


// Wait for the DOM to be fully loaded before accessing it
document?.addEventListener('DOMContentLoaded', function () {
  // Now you can safely access DOM elements
  const avatarBild = document.getElementById('avatar');
  
  // Statuswerte des Tamagotchis
  
  // Funktion zur Berechnung der vergangenen Jahre


  // Funktion, um die Statussterne basierend auf dem Wert (0–100) zu aktualisieren
  function sterneAktualisieren(elementId, wert) {
    const maxSterne = 5;
    const anzahlSterne = Math.round((wert / 100) * maxSterne); // Calculate how many stars to show

    const container = document.getElementById(elementId);  // No need for optional chaining here
    if (!container) {
      console.error(`Container with ID ${elementId} not found`);
      return;  // Exit if the container does not exist
    }

    container.innerHTML = '';  // Clear the previous stars

    for (let i = 0; i < maxSterne; i++) {
      const stern = document.createElement('img');  // Create a new image element
      stern.classList.add('stern');  // Add a class to the image (for styling)

      if (i < anzahlSterne) {
        stern.src = 'images/sternchen.jpg';  // Set the image for an active star
      } else {
        stern.src = 'images/sternchen-leer.jpg';  // Set the image for an inactive star
      }

      container.appendChild(stern);  // Append the created image to the container
    }
  }

  // Funktion, um den gesamten Status zu aktualisieren
  function statusAktualisieren() {
    sterneAktualisieren('hungerStatus', hunger);
    sterneAktualisieren('moodStatus', stimmung);
    sterneAktualisieren('sleepStatus', schlaf);
  }

  // Funktion für die Fütterung
  function fuettern() {
    if (!schlaeft && lebt) {
      hunger = Math.min(hunger + 20, 100);
      stimmung = Math.min(stimmung + 10, 100);
      avatarBild.src = "images/essen.jpg"; // Bild für Füttern ändern
      statusAktualisieren();
    }
  }

  // Funktion für das Spielen
  function spielen() {
    if (!schlaeft && lebt) {
      stimmung = Math.min(stimmung + 15, 100);
      hunger = Math.max(hunger - 10, 0);
      schlaf = Math.max(schlaf - 5, 0);
      avatarBild.src = "images/spielen.jpg"; // Bild für Spielen ändern
      statusAktualisieren();
    }
  }

  // Funktion für das Schlafen
  function schlafen() {
    if (!schlaeft && lebt) {
      schlaeft = true;
      schlaf = 100;
      avatarBild.src = "images/schlafen.jpg"; // Bild für Schlafen ändern
      statusAktualisieren();

      // Nach 5 Sekunden aufwachen
      setTimeout(aufwachen, 5000);
    }
  }

  // Funktion zum Aufwachen
  function aufwachen() {
    schlaeft = false;
    avatarBild.src = "images/avatar.jpg"; // Normales Bild
    statusAktualisieren();
  }

  // Funktion zur regelmäßigen Verschlechterung des Zustands
  function zustandVerschlechtern() {
    if (!schlaeft && lebt) {
      hunger = Math.max(hunger - 5, 0);
      stimmung = Math.max(stimmung - 3, 0);
      schlaf = Math.max(schlaf - 2, 0);
      statusAktualisieren();
    }
    istTot();
  }

  function istTot() {
    if (hunger === 0 && stimmung === 0 && schlaf === 0 && lebt) {
      console.log("tot");
      lebt = false;
      avatarBild.src = "images/tot.jpg"; // Bild für Füttern ändern
    }
  }

  // Event-Listener für die Buttons
  document.getElementById('feed').addEventListener('click', fuettern);
  document.getElementById('play').addEventListener('click', spielen);
  document.getElementById('sleepButton').addEventListener('click', schlafen);

  // Regelmäßiges Aufrufen der Funktionen
  if (!lebt) {
    clearInterval(intervallID_verschlechtern); // Stoppt das Intervall mit der gespeicherten ID
    clearInterval(intervallID_alter); // Stoppt das Intervall mit der gespeicherten ID
  } else {
    // Anfangsstatus anzeigen
    statusAktualisieren();
  }
});
