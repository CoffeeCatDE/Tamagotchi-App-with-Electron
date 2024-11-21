window.addEventListener("DOMContentLoaded", () => {
  var avatarBild = document.getElementById("avatar");

  function werdeAelter() {
    // Zugriff auf die exponierten Variablen aus preload.js
    const hungerStatus = window.electron.getHunger();
    const stimmungStatus = window.electron.getStimmung();
    const schlafStatus = window.electron.getSchlaf();
    const lebtStatus = window.electron.isAlive();

    if (lebtStatus) {
      window.electron.reduceHunger();
      window.electron.reduceStimmung();
      window.electron.reduceSchlaf();
      // stimmung -= 1;
      // schlaf -= 1;

      // if (hunger <= 0 || stimmung <= 0 || schlaf <= 0) {
      //   lebt = false;
      //   clearInterval(intervallID_verschlechtern);
      //   clearInterval(intervallID_alter);
      //   console.log("Die Figur ist gestorben.");
      // }

      // Diese Werte könnten zum Beispiel in HTML-Elemente eingefügt werden
      document.getElementById("hunger").innerText = ` ${hungerStatus}`;
      document.getElementById("stimmung").innerText = ` ${stimmungStatus}`;
      document.getElementById("schlaf").innerText = `${schlafStatus}`;
      // document.getElementById('lebt').innerText = `${lebtStatus ? 'Ja' : 'Nein'}`;

      if (hungerStatus <= 0 || stimmungStatus <= 0 || schlafStatus <= 0) {
        window.electron.toeten();
        avatarBild.src = "images/tot.jpg"; // Bild für Füttern ändern

        // clearInterval(intervallID_verschlechtern);
        // clearInterval(intervallID_alter);

        clearInterval(idInterval);
        console.log("Die Figur ist gestorben.");
      }
    }

    // Falls du einen Button hast, um den Hunger zu verändern:
    document.getElementById("fuetternButton").addEventListener("click", () => {
      if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
        window.electron.setHunger();
        avatarBild.src = "images/essen.jpg"; // Bild für Füttern ändern
      }

      document.getElementById("spielenButton").addEventListener("click", () => {
        if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
          window.electron.setStimmung();
          avatarBild.src = "images/spielen.jpg"; // Bild für Spielen ändern
        }
      });

      document
        .getElementById("schlafenButton")
        .addEventListener("click", () => {
          if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
            window.electron.setSchlaf(!window.electron.getSchlaeft());
            avatarBild.src = "images/schlafen.jpg"; // Bild für Spielen ändern
          }
        });
    });
  }
  const idInterval = setInterval(werdeAelter, 123);
});
