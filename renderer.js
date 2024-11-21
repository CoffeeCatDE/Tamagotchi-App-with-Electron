window.addEventListener("DOMContentLoaded", () => {
  // Die Funktion für das Altern der Figur
  var avatarBild = document.getElementById("avatar");

  function werdeAelter() {
    // Zugriff auf die exponierten Variablen aus preload.js
    const hungerStatus = window.electron.getHunger();
    const stimmungStatus = window.electron.getStimmung();
    // @todo 
    const schlafStatus = window.electron.getSchlafStatus();
    var lebtStatus = window.electron.isAlive();

    // Berechnung der vergangenen Jahre
    let jahre = 0;
    if (lebtStatus  ) {
      let jetzt = Date.now(); // Aktuelle Zeit in Millisekunden
      let vergangeneZeitInMillisekunden = jetzt - window.electron.startZeit; // Unterschied in Millisekunden
      let vergangeneSekunden =
        vergangeneZeitInMillisekunden / window.electron.jahresDauer; // Umrechnung in Jahre
      document.getElementById("alter").innerText =
        vergangeneSekunden.toFixed(0);

      // console.log("years go by: " + jahre.toFixed(0));

      // Reduziere die Werte (z.B. für Hunger, Stimmung, Schlaf)
      window.electron.reduceHunger();
      window.electron.reduceStimmung();
      window.electron.reduceSchlaf();

      // Diese Werte könnten zum Beispiel in HTML-Elemente eingefügt werden
      document.getElementById("hunger").innerText = `Hunger: ${hungerStatus}`;
      document.getElementById(
        "stimmung"
      ).innerText = `Stimmung: ${stimmungStatus}`;
      document.getElementById("schlaf").innerText = `Schlaf: ${schlafStatus}`;

      // Überprüfe, ob die Figur gestorben ist
      if (hungerStatus <= 0 || stimmungStatus <= 0 || schlafStatus <= 0) {
        window.electron.toeten();
        avatarBild.src = "images/tot.jpg"; // Bild für Tod

        // Intervall stoppen, wenn die Figur tot ist
        clearInterval(idInterval);
        console.log("Die Figur ist gestorben.");
      }
    }
  }

  // Intervall zur Altersberechnung
  const idInterval = setInterval(werdeAelter, 123);

  // Event-Listener für den "Füttern"-Button
  document.getElementById("fuetternButton").addEventListener("click", () => {
    if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
      window.electron.setHunger(); // Setze den Hunger auf 100
      avatarBild.src = "images/essen.jpg"; // Bild für Füttern
    }
  });

  // Event-Listener für den "Spielen"-Button
  document.getElementById("spielenButton").addEventListener("click", () => {
    if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
      window.electron.setStimmung(); // Setze die Stimmung auf 100
      avatarBild.src = "images/spielen.jpg"; // Bild für Spielen
    }
  });

  // Event-Listener für den "Schlafen"-Button
  document.getElementById("schlafenButton").addEventListener("click", () => {
    // Schlafen gehen
    if (window.electron.isAlive() && !window.electron.getSchlaeft()) {
      window.electron.setSchlaf(); // Setze Schlaf auf 100
      avatarBild.src = "images/schlafen.jpg"; // Bild für Schlafen
    } 
    // ausgeschlafen
    else {
        window.electron.setSchlaeft();
        avatarBild.src = "images/avatar.jpg"; // Bild für Schlafen
    }
  });
});
