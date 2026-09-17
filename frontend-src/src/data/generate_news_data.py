# Script to generate modular news data
import json
import os

modules = [
  ("geraete.ts", "GERAETE_NEWS", "Geräte & Technik", [
    {
      "id": "box-update-grundlagen-2026",
      "title": "Neu in der Box: die wichtigsten Grundlagen",
      "date": "2026-09-13",
      "dateLabel": "Box-Update",
      "relevance": "Wichtige Basis-Anleitungen für Smartphone, Internet und sichere Konten sind ab sofort direkt verfügbar.",
      "assessment": {
        "relevance": "yes",
        "context": "Für alle, die ihr Smartphone und das Internet noch sicherer und entspannter bedienen möchten.",
        "action": "recommended",
        "advice": "Stöbere im Tab „Anleitungen“ durch die neu sortierten Grundlagenkarten."
      },
      "takeaway": "Mit den neuen Grundlagen-Anleitungen gelingt der Einstieg noch einfacher: Von den ersten Wischgesten über WLAN-Verbindungen bis hin zum Schutz deiner Zugangsdaten ist alles Schritt für Schritt erklärt.",
      "paragraphTitles": [
        "Was ist neu in der Box?",
        "Welche Themen decken die Grundlagen ab?",
        "So findest du die Anleitungen"
      ],
      "paragraphs": [
        "Um dir den Einstieg in neue Funktionen noch leichter zu machen, gibt es ab sofort die kompakten Grundlagen-Karten. Sie erklären wichtige Handgriffe ohne technisches Fachchinesisch und mit klaren Bildern.",
        "Zu den neuen Themen gehören unter anderem: Erste Schritte auf dem Smartphone, sichere Passwörter erstellen und merken, WLAN richtig einrichten und testen sowie der sichere Umgang mit App-Berechtigungen.",
        "Wechsle einfach oben auf den Reiter „Anleitungen“. Dort findest du die Grundlagen direkt oben im Schnellzugriff, gefolgt von allen weiteren Themenbereichen."
      ],
      "reading": {
        "audience": "Für Einsteiger und alle, die Basiswissen auffrischen wollen",
        "actions": [
          "Oben auf den Tab „Anleitungen“ klicken oder tippen",
          "Eine passende Grundlagen-Karte auswählen",
          "Den Schritten in Ruhe folgen und direkt auf dem Gerät ausprobieren"
        ]
      },
      "tip": "Du kannst jede Anleitung auch als übersichtliche PDF-Seite ausdrucken oder speichern.",
      "checkedAt": "2026-09-13",
      "sources": [
        { "title": "Digital Guide Box – Jan Dennis Brüning", "url": "https://www.janbruening.de" }
      ]
    },
    {
      "id": "smartphone-meldet-staendig-2026",
      "title": "Dein Smartphone meldet sich ständig?",
      "date": "2026-09-13",
      "dateLabel": "Alltagstipp",
      "relevance": "Verhindert Ablenkung und Stress durch eine Flut unwichtiger Benachrichtigungen.",
      "assessment": {
        "relevance": "yes",
        "context": "Hilft allen, deren Telefon den ganzen Tag vibriert, piept oder aufleuchtet.",
        "action": "recommended",
        "advice": "Schalte Töne für Werbe- und News-Apps stumm und nutze die Funktion „Nicht stören“ für Ruhezeiten."
      },
      "takeaway": "Ein piependes Smartphone reißt dich ständig aus deinen Gedanken. Die meisten Benachrichtigungen sind reine Werbe- und Aufmerksamkeits-Köder von Apps. Du hast die volle Kontrolle: Deaktiviere Töne und Banner gezielt für jede App.",
      "paragraphTitles": [
        "Warum ständige Töne stressen",
        "Wichtige Mitteilungen von Werbemüll trennen",
        "So stellst du Apps gezielt stumm"
      ],
      "paragraphs": [
        "Jede neu installierte App möchte standardmäßig das Recht haben, dir Mitteilungen zu schicken. Einkaufs-Apps, Nachrichtenseiten und Spiele nutzen dies oft mehrmals täglich, um dich zurück in die App zu locken.",
        "Unterscheide klar zwischen Notfällen (Anrufe enger Kontakte, wichtige Termine) und reinem Rauschen (Sonderangebote, Breaking News, Spieleerinnerungen). Letztere kannst du bedenkenlos komplett ausschalten.",
        "Wenn eine nervige Mitteilung auftaucht, halte den Finger einfach eine Sekunde lang darauf gedrückt. Es erscheint direkt ein kleines Menü, über das du „Mitteilungen ausschalten“ oder „Stumm zustellen“ wählen kannst."
      ],
      "reading": {
        "audience": "Für alle, die mehr Ruhe im Alltag möchten",
        "actions": [
          "Gehe in Einstellungen > „Benachrichtigungen“",
          "Gehe die Liste der Apps durch",
          "Schalte bei allen Shopping-, Spiele- und News-Apps die Mitteilungen ab"
        ]
      },
      "tip": "Aktiviere den Modus „Nicht stören“ für die Nacht – hinterlege dort nur Notfall-Kontakte, die dich auch im Schlaf erreichen dürfen.",
      "checkedAt": "2026-09-13",
      "sources": [
        { "title": "BSI – Schutz vor digitalem Stress und Benachrichtigungsflut", "url": "https://www.bsi.bund.de" }
      ]
    },
    {
      "id": "akku-schonen-tipps-2026",
      "title": "Smartphone-Akku schonen: So hält er spürbar länger",
      "date": "2026-09-10",
      "dateLabel": "Praxistipp",
      "relevance": "Verlängert die tägliche Laufzeit und die Lebensdauer der Batterie um mehrere Jahre.",
      "assessment": {
        "relevance": "yes",
        "context": "Für alle, deren Smartphone-Akku bereits am Nachmittag schwächelt.",
        "action": "recommended",
        "advice": "Display-Helligkeit anpassen und unnötige Hintergrundaktualisierungen ausschalten."
      },
      "takeaway": "Lithium-Ionen-Akkus mögen weder extreme Hitze noch dauerhafte 100-Prozent-Ladung. Mit ein paar kleinen Handgriffen bleibt der Akku über den ganzen Tag fit und hält jahrelang ohne teuren Austausch.",
      "paragraphTitles": [
        "Die größten Stromfresser im Alltag",
        "Die 20-bis-80-Prozent-Regel",
        "Schnelle Sofortmaßnahmen"
      ],
      "paragraphs": [
        "Der Bildschirm verbraucht meistens den meisten Strom. Wer die Helligkeit manuell leicht absenkt oder auf automatische Regelung stellt, spart sofort spürbar Energie.",
        "Akkus fühlen sich zwischen 20 % und 80 % Ladung am wohlsten. Es schadet modernen Geräten zwar nicht direkt, sie über Nacht zu laden, aber dauerhafte Vollladung bei sommerlicher Wärme beschleunigt die Alterung.",
        "Schalte Bluetooth und Standortdienste nur dann ein, wenn du sie aktiv nutzt (z. B. für Navigation). Aktiviere zudem den integrierten Energiesparmodus, wenn der Akku unter 20 % sinkt."
      ],
      "reading": {
        "audience": "Für alle Smartphone- und Tablet-Besitzer",
        "actions": [
          "Öffne Einstellungen > „Akku“ und prüfe, welche Apps am meisten Strom verbrauchen",
          "Aktiviere die Option „Akkuschutz“ oder „Optimiertes Laden“",
          "Reduziere das Display-Timeout auf 30 Sekunden oder 1 Minute"
        ]
      },
      "tip": "Lade dein Smartphone niemals in der prallen Sonne oder unter dem Kopfkissen auf – Hitze ist der größte Feind der Batterie.",
      "checkedAt": "2026-09-10",
      "sources": [
        { "title": "Verbraucherzentrale: Smartphone-Akku richtig laden und schonen", "url": "https://www.verbraucherzentrale.de" }
      ]
    },
    {
      "id": "speicher-voll-bereinigen-2026",
      "title": "Speicher voll? Unnötigen Ballast ohne Datenverlust entfernen",
      "date": "2026-09-06",
      "dateLabel": "Schritt-für-Schritt",
      "relevance": "Verhindert Systemabstürze und macht Platz für neue Fotos und wichtige Updates.",
      "assessment": {
        "relevance": "yes",
        "context": "Wenn die Meldung „Gerätespeicher fast voll“ auf dem Bildschirm erscheint.",
        "action": "recommended",
        "advice": "WhatsApp-Medien und ungenutzte Apps bereinigen, bevor man panisch Fotos löscht."
      },
      "takeaway": "Oft sind es gar nicht die eigenen Urlaubsfotos, die den Speicher verstopfen, sondern weitergeleitete Videos in WhatsApp-Gruppen oder doppelte Downloads. Mit der richtigen Reihenfolge schaffst du in wenigen Minuten Gigabytes an Platz.",
      "paragraphTitles": [
        "Wo verstecken sich die Speicherfresser?",
        "Der WhatsApp-Speichertrick",
        "Downloads und App-Cache leeren"
      ],
      "paragraphs": [
        "In WhatsApp sammeln sich über Monate hinweg tausende Begrüßungsbilder, Witze-Videos und Sprachnachrichten. Viele wissen nicht, dass diese auf dem Gerät gespeichert bleiben, selbst wenn man sie längst vergessen hat.",
        "Tippe in WhatsApp auf Einstellungen > „Speicher und Daten“ > „Speicher verwalten“. Dort siehst du auf einen Blick alle Dateien, die größer als 5 MB sind, und kannst sie bequem löschen.",
        "Prüfe im Menü „Dateien“ oder „Eigene Dateien“ den Ordner „Downloads“. Oft liegen dort alte PDF-Rechnungen, Fahrpläne oder Handbücher, die längst nicht mehr gebraucht werden."
      ],
      "reading": {
        "audience": "Für alle Nutzer mit knapper Speicherkapazität",
        "actions": [
          "Öffne Einstellungen > „Speicher“ für einen Gesamtüberblick",
          "Öffne WhatsApp > Einstellungen > „Speicher verwalten“",
          "Lösche ungenutzte Apps, die du seit Monaten nicht geöffnet hast"
        ]
      },
      "tip": "Nutze die offizielle App „Files by Google“ (auf Android) – sie schlägt dir automatisch doppelte Dateien und temporären Müll zum Löschen vor.",
      "checkedAt": "2026-09-06",
      "sources": [
        { "title": "Google Support: Speicherplatz auf Android-Geräten freigeben", "url": "https://support.google.com" }
      ]
    },
    {
      "id": "display-schrift-vergroessern-2026",
      "title": "Schriftgröße & Kontrast: So wird das Display augenfreundlich",
      "date": "2026-08-28",
      "dateLabel": "Alltagstipp",
      "relevance": "Macht Texte auf dem Smartphone ohne Lesebrille wieder mühelos lesbar.",
      "assessment": {
        "relevance": "yes",
        "context": "Für alle, die Texte auf dem Smartphone als zu klein, grau oder anstrengend empfinden.",
        "action": "recommended",
        "advice": "Schriftgröße um eine oder zwei Stufen anheben und fetten Text aktivieren."
      },
      "takeaway": "Niemand muss sich mit mikroskopisch kleinen Buchstaben quälen. Moderne Smartphones bieten hervorragende Sehhilfen: vergrößerte Schrift, fettere Buchstaben und augenschonende Farbtemperaturen für den Abend.",
      "paragraphTitles": [
        "Schriftgröße in den Einstellungen anpassen",
        "Fettschrift und hoher Kontrast",
        "Der Augenkomfort-Modus (Blaulichtfilter)"
      ],
      "paragraphs": [
        "Unter „Anzeige“ oder „Bedienungshilfen“ findest du den Schieberegler für Schriftgröße. Du kannst in Echtzeit sehen, wie sich die Lesbarkeit verändert, ohne dass Webseiten kaputtgehen.",
        "Zusätzlich zur Größe hilft die Option „Fetter Text“: Sie verstärkt die Linien der Buchstaben, wodurch der Kontrast zum hellen Hintergrund drastisch steigt.",
        "Für die Abendstunden empfiehlt sich der „Augenkomfort“ oder „Night Shift“: Er filtert grelles blaues Licht heraus und taucht das Display in ein warmes, schlaffreundliches Licht."
      ],
      "reading": {
        "audience": "Für alle, die entspannter auf ihr Display blicken wollen",
        "actions": [
          "Öffne Einstellungen > „Anzeige“ oder „Bedienungshilfen“",
          "Wähle „Schriftgröße und -stil“ und ziehe den Regler nach rechts",
          "Aktiviere den Schalter für „Fetter Text“"
        ]
      },
      "tip": "Du kannst auch nur einzelne Webseiten im Browser größer zoomen: Ziehe dazu einfach zwei Finger auf dem Bildschirm auseinander.",
      "checkedAt": "2026-08-28",
      "sources": [
        { "title": "BSI – Barrierefreiheit und Bedienungshilfen am Smartphone", "url": "https://www.bsi.bund.de" }
      ]
    }
  ])
]

print("Module 1 ready")
