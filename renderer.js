window.addEventListener('DOMContentLoaded', () => {
  // Zugriff auf die exponierten Variablen aus preload.js
  const hungerStatus = window.electron.getHunger();
  const stimmungStatus = window.electron.getStimmung();
  const schlafStatus = window.electron.getSchlaf();
  const lebtStatus = window.electron.isAlive();

  // Diese Werte könnten zum Beispiel in HTML-Elemente eingefügt werden
  document.getElementById('hunger').innerText = `Hunger: ${hungerStatus}`;
  document.getElementById('stimmung').innerText = `Stimmung: ${stimmungStatus}`;
  document.getElementById('schlaf').innerText = `Schlaf: ${schlafStatus}`;
  document.getElementById('lebt').innerText = `Leben: ${lebtStatus ? 'Ja' : 'Nein'}`;

  // Falls du einen Button hast, um den Hunger zu verändern:
  document.getElementById('setHungerButton').addEventListener('click', () => {
    window.electron.setHunger(50);  // Beispielwert
    document.getElementById('hunger').innerText = `Hunger: ${window.electron.getHunger()}`;
  });
});
