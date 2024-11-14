// Statuswerte des Tamagotchis
let hunger = 100;
let stimmung = 100;
let schlaf = 100;
let schlaeft = false;
let avatarBild = document.getElementById('avatar');

// Funktion, um die Statussterne basierend auf dem Wert (0–100) zu aktualisieren
function sterneAktualisieren(elementId, wert) {
    const maxSterne = 5;
    const anzahlSterne = Math.round((wert / 100) * maxSterne); // 0 bis 5 Sterne

    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Container leeren

    for (let i = 0; i < maxSterne; i++) {
        const stern = document.createElement('img');
        stern.classList.add('star');
        if (i < anzahlSterne) {
            stern.src = 'sternchen.jpg'; // Bild für aktiven Stern
        } else {
            stern.src = 'sternchen-leer.jpg'; // Bild für inaktiven Stern
        }
        container.appendChild(stern);
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
    if (!schlaeft) {
        hunger = Math.min(hunger + 20, 100);
        stimmung = Math.min(stimmung + 10, 100);
        avatarBild.src = "essen.jpg"; // Bild für Füttern ändern
        statusAktualisieren();
    }
}

// Funktion für das Spielen
function spielen() {
    if (!schlaeft) {
        stimmung = Math.min(stimmung + 15, 100);
        hunger = Math.max(hunger - 10, 0);
        schlaf = Math.max(schlaf - 5, 0);
        avatarBild.src = "spielen.jpg"; // Bild für Spielen ändern
        statusAktualisieren();
    }
}

// Funktion für das Schlafen
function schlafen() {
    if (!schlaeft) {
        schlaeft = true;
        schlaf = 100;
        avatarBild.src = "schlafen.jpg"; // Bild für Schlafen ändern
        statusAktualisieren();

        // Nach 5 Sekunden aufwachen
        setTimeout(aufwachen, 5000);
    }
}

// Funktion zum Aufwachen
function aufwachen() {
    schlaeft = false;
    avatarBild.src = "avatar_normal.jpg"; // Normales Bild
    statusAktualisieren();
}

// Funktion zur regelmäßigen Verschlechterung des Zustands
function zustandVerschlechtern() {
    if (!schlaeft) {
        hunger = Math.max(hunger - 5, 0);
        stimmung = Math.max(stimmung - 3, 0);
        schlaf = Math.max(schlaf - 2, 0);
        statusAktualisieren();
    }
}

// Event-Listener für die Buttons
document.getElementById('feed').addEventListener('click', fuettern);
document.getElementById('play').addEventListener('click', spielen);
document.getElementById('sleepButton').addEventListener('click', schlafen);

// Regelmäßiges Aufrufen der Funktion zustandVerschlechtern
setInterval(zustandVerschlechtern, 1000);

// Anfangsstatus anzeigen
statusAktualisieren();
