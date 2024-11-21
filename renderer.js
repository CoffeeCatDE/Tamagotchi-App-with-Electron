window.addEventListener("DOMContentLoaded", () => {
  function werdeAelter() {
    // Zugriff auf die exponierten Variablen aus preload.js
    const hungerStatus = window.electron.getHunger();
    const stimmungStatus = window.electron.getStimmung();
    const schlafStatus = window.electron.getSchlaf();
    const lebtStatus = window.electron.isAlive();

    // Diese Werte könnten zum Beispiel in HTML-Elemente eingefügt werden
    document.getElementById("hunger").innerText = ` ${hungerStatus}`;
    document.getElementById("stimmung").innerText = ` ${stimmungStatus}`;
    document.getElementById("schlaf").innerText = `${schlafStatus}`;
    // document.getElementById('lebt').innerText = `${lebtStatus ? 'Ja' : 'Nein'}`;
  }
  const avatarBild = document.getElementById("avatar");

  // Falls du einen Button hast, um den Hunger zu verändern:
  document.getElementById("fuetternButton").addEventListener("click", () => {
    if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
      avatarBild.src = "images/essen.jpg"; // Bild für Füttern ändern
    }

    document.getElementById("spielenButton").addEventListener("click", () => {
      if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
        avatarBild.src = "images/spielen.jpg"; // Bild für Spielen ändern
      }
    });

    document.getElementById("schlafenButton").addEventListener("click", () => {
      if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
        window.electron.setSchlaf(!window.electron.getSchlaf);
        avatarBild.src = "images/schlafen.jpg"; // Bild für Spielen ändern
      }
    });
  });


  // Falls du einen Button hast, um den Hunger zu verändern:
  document.getElementById("spielenButton").addEventListener("click", () => {
    window.electron.setStimmung(2220); // Beispielwert
  });
  setInterval(werdeAelter, 222);
});
