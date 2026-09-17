import { NewsItem } from "../types";

export const ALL_NEWS: NewsItem[] = [
  {
    "id": "grundlagen-einstieg",
    "title": "Neu in der Box: die wichtigsten Grundlagen",
    "summary": "App, Browser und Benutzerkonto – was steckt hinter diesen Wörtern? Sechs ausgewählte Einstiege erklären dir die Zusammenhänge mit Beispielen aus dem Alltag.",
    "relevance": "Du möchtest etwas am Smartphone erledigen, aber schon die Begriffe in einer Anleitung sind unklar? Dafür gibt es jetzt einen eigenen Einstieg oben im Tab „Anleitungen“: Die wichtigsten Grundlagen.",
    "takeaway": "Du musst nicht alles vorher wissen. Starte mit der Frage, die dich gerade beschäftigt.",
    "category": "Geräte & Technik",
    "topics": [
      "Digitale Verwaltung",
      "Medien & Informationen"
    ],
    "icon": "book",
    "date": "2026-09-13",
    "dateLabel": "Box-Update",
    "paragraphTitles": [
      "Sechs Fragen für den Anfang",
      "Erst verstehen, dann ausprobieren",
      "Dein nächster Schritt"
    ],
    "paragraphs": [
      "Was sind ein Webbrowser, eine App und ein Betriebssystem? Was unterscheidet iOS von Android? Wie funktioniert das Internet, und wofür brauchst du ein Benutzerkonto? Zu jeder Frage gibt es eine kurze Erklärung.",
      "Zum Beispiel: Der Browser ist das Programm, mit dem du Webseiten öffnest. Eine Webseite ist der Inhalt, den du darin ansiehst. Solche Unterschiede machen spätere Anleitungen leichter verständlich.",
      "Unter diesem Beitrag findest du die sechs Grundlagen direkt verlinkt. Jede öffnet sich zum Lesen und lässt sich zusätzlich als einseitige PDF speichern oder ausdrucken."
    ],
    "tip": "Du kannst mit einer einzigen Frage beginnen und später weiterlesen. Die vollständige Sammlung bleibt darunter im Tab „Anleitungen“ erreichbar.",
    "guideIds": [
      "webbrowser",
      "app-grundlagen",
      "betriebssystem",
      "ios-android",
      "internet-grundlagen",
      "benutzerkonto"
    ],
    "sources": [],
    "reading": {
      "audience": "Für dich gedacht, wenn schon die Begriffe in einer Anleitung Fragen auslösen.",
      "actionIndex": 2,
      "actions": [
        "Wähle unten die Grundlage, die dir gerade fehlt, zum Beispiel „Webbrowser“.",
        "Lies die Erklärung in kleinen Abschnitten. Du musst nicht alle sechs Themen auf einmal bearbeiten.",
        "Die einseitige PDF kannst du danach als Merkhilfe speichern oder ausdrucken."
      ]
    },
    "assessment": {
      "relevance": "yes",
      "context": "Hier findest du Erklärungen zu grundlegenden Begriffen.",
      "action": "none",
      "advice": "Wähle bei Bedarf die Frage, die dich gerade beschäftigt."
    }
  },
  {
    "id": "fotos-sicherung-pruefen",
    "title": "Sind deine Fotos wirklich gesichert?",
    "summary": "Die Urlaubsfotos sind auf dem Handy sichtbar. Aber sind sie auch gesichert, falls das Gerät ausfällt? In Google Fotos kannst du den Stand direkt prüfen.",
    "relevance": "Du siehst deine Bilder auf dem Smartphone und gehst davon aus, dass sie sicher aufbewahrt sind? Wenn du Google Fotos nutzt, lohnt ein Blick auf den Sicherungsstatus – sichtbar bedeutet noch nicht vollständig gesichert.",
    "takeaway": "Prüfe den Status der Sicherung, bevor du dich auf eine zusätzliche Kopie verlässt.",
    "category": "Digitale Verwaltung",
    "topics": [
      "Geräte & Technik"
    ],
    "icon": "images",
    "date": "2026-09-13",
    "dateLabel": "Alltagstipp",
    "checkedAt": "2026-09-13",
    "paragraphTitles": [
      "Den Stand ansehen",
      "Eine Pause erkennen",
      "Das richtige Konto prüfen"
    ],
    "paragraphs": [
      "Öffne Google Fotos und tippe oben auf dein Profilbild oder deine Initiale. Dort siehst du, ob Bilder noch hochgeladen werden, die Sicherung ausgeschaltet ist oder alles abgeschlossen ist.",
      "Eine unterbrochene Verbindung oder voller Kontospeicher kann die Sicherung aufhalten. Lies den angezeigten Hinweis und warte, bis der Vorgang abgeschlossen ist.",
      "Unter den Fotos-Einstellungen im Bereich „Sicherung“ kannst du das verwendete Google-Konto kontrollieren. Das hilft besonders, wenn du mehrere Konten nutzt."
    ],
    "tip": "Lösche keine Bilder, bevor du geprüft hast, wo sie gespeichert und gesichert sind.",
    "guideIds": [
      "fotos-sichern",
      "google-konto",
      "wlan"
    ],
    "sources": [
      {
        "title": "Google Fotos: Fotos und Videos sichern",
        "url": "https://support.google.com/photos/answer/6193313?co=GENIE.Platform%3DAndroid&hl=de"
      }
    ],
    "reading": {
      "audience": "Für dich relevant, wenn du deine Bilder mit Google Fotos sichern möchtest.",
      "actionIndex": 0,
      "actions": [
        "Öffne Google Fotos und tippe auf dein Profilbild oder deine Initiale.",
        "Lies den Sicherungsstatus und warte gegebenenfalls, bis die Bilder vollständig hochgeladen sind.",
        "Prüfe das richtige Konto. Die verlinkte Anleitung begleitet dich dabei; lösche keine Bilder zum Testen."
      ]
    },
    "assessment": {
      "relevance": "conditional",
      "context": "Du sicherst deine Bilder mit Google Fotos.",
      "action": "recommended",
      "advice": "Den Sicherungsstatus prüfen, bevor du dich darauf verlässt."
    }
  },
  {
    "id": "app-zugriff-bewusst-waehlen",
    "title": "Warum möchte diese App deine Kamera nutzen?",
    "summary": "Kamera, Mikrofon oder Standort: Apps fragen nach Zugriffen. Du kannst bewusst entscheiden, was zu deiner Aufgabe passt, und die Erlaubnis später wieder ändern.",
    "relevance": "Du öffnest eine App und plötzlich fragt sie nach Kamera oder Standort. Vielleicht möchtest du nur etwas nachsehen und weißt nicht, ob du zustimmen sollst. Die Frage bedeutet: Die App möchte eine Funktion oder Information deines Geräts nutzen.",
    "takeaway": "Erlaube den Zugriff passend zu dem, was du gerade machen möchtest.",
    "category": "Sicherheit & Schutz",
    "topics": [
      "Geräte & Technik"
    ],
    "icon": "shield",
    "date": "2026-09-13",
    "dateLabel": "Alltagstipp",
    "checkedAt": "2026-09-13",
    "paragraphTitles": [
      "Passt die Frage zur Aufgabe?",
      "Du darfst erst ablehnen",
      "Später in Ruhe ändern"
    ],
    "paragraphs": [
      "Für einen Videoanruf sind Kamera und Mikrofon nachvollziehbar. Möchtest du nur einen Text lesen, überlege kurz, wofür die App den angefragten Zugriff braucht.",
      "Du kannst einen Zugriff zunächst verweigern. Die betreffende Funktion steht dann möglicherweise nicht zur Verfügung. Je nach Gerät und Zugriff gibt es auch eine Erlaubnis nur während der Nutzung.",
      "Auf Android findest du Zugriffe meist unter „Einstellungen“, „Apps“ und „Berechtigungen“. Auf dem iPhone kannst du unter „Datenschutz & Sicherheit“ nachsehen. Die genauen Bezeichnungen können je nach Gerät abweichen."
    ],
    "tip": "Beginne mit einer App, die du gut kennst. Du musst nicht alle Einstellungen auf einmal durchgehen.",
    "guideIds": [
      "app-berechtigungen",
      "app-grundlagen",
      "google-meet"
    ],
    "sources": [
      {
        "title": "Android: App-Berechtigungen ändern",
        "url": "https://support.google.com/android/answer/9431959?hl=de"
      },
      {
        "title": "Apple: Zugriff auf Informationen verwalten",
        "url": "https://support.apple.com/de-de/guide/iphone/iph251e92810/ios"
      }
    ],
    "reading": {
      "audience": "Für dich relevant, wenn eine App nach Kamera, Mikrofon oder Standort fragt.",
      "actionIndex": 2,
      "actions": [
        "Überlege zuerst, ob der angefragte Zugriff zu deiner gewünschten Aufgabe passt.",
        "Prüfe die Berechtigungen später in Ruhe: auf Android meist unter „Einstellungen“, „Apps“, „Berechtigungen“, auf dem iPhone unter „Datenschutz & Sicherheit“.",
        "Ändere nur den betreffenden Zugriff und probiere die Funktion erneut. Du kannst notwendige Zugriffe wieder erlauben."
      ]
    },
    "assessment": {
      "relevance": "conditional",
      "context": "Eine App fragt nach Kamera, Mikrofon oder Standort.",
      "action": "recommended",
      "advice": "Den angefragten Zugriff mit deiner Aufgabe abgleichen."
    }
  },
  {
    "id": "benachrichtigungen-ruhe",
    "title": "Dein Smartphone meldet sich ständig?",
    "summary": "Ein Ton hier, ein Hinweis dort: Du kannst auswählen, welche Apps sich melden dürfen. So bleiben wichtige Nachrichten erreichbar und andere werden leiser.",
    "relevance": "Du möchtest eine Nachricht lesen, doch dazwischen erscheinen ständig andere Hinweise? Diese Benachrichtigungen lassen sich für einzelne Apps einstellen. Du musst dafür nicht gleich das ganze Smartphone stummschalten.",
    "takeaway": "Entscheide für jede App, ob und wie sie dich auf etwas aufmerksam machen darf.",
    "category": "Geräte & Technik",
    "topics": [
      "Kommunikation & Mobilität"
    ],
    "icon": "calendar",
    "date": "2026-09-13",
    "dateLabel": "Alltagstipp",
    "checkedAt": "2026-09-13",
    "paragraphTitles": [
      "Mit einer App beginnen",
      "Ton und Anzeige auswählen",
      "Wichtige Hinweise im Blick behalten"
    ],
    "paragraphs": [
      "Öffne die Einstellungen und suche nach „Benachrichtigungen“ auf Android oder „Mitteilungen“ auf dem iPhone. Wähle zunächst die App aus, deren Hinweise dich oft unterbrechen.",
      "Je nach Gerät kannst du Benachrichtigungen ausschalten, lautlos anzeigen oder die Anzeige auf dem Bildschirm anpassen. Die Möglichkeiten unterscheiden sich nach App und System.",
      "Überlege vor dem Ausschalten, welche Meldungen du brauchst, etwa persönliche Nachrichten oder Terminerinnerungen. Ändere erst eine Einstellung und schau, ob sie zu deinem Alltag passt."
    ],
    "tip": "Wenn dir später ein Hinweis fehlt, kannst du die Einstellung derselben App wieder ändern.",
    "guideIds": [
      "benachrichtigungen",
      "kalender",
      "whatsapp"
    ],
    "sources": [
      {
        "title": "Android: Benachrichtigungen verwalten",
        "url": "https://support.google.com/android/answer/9079661?hl=de"
      },
      {
        "title": "Apple: Mitteilungseinstellungen ändern",
        "url": "https://support.apple.com/de-de/guide/iphone/iph7c3d96bab/ios"
      }
    ],
    "reading": {
      "audience": "Für dich gedacht, wenn dein Smartphone dich häufiger unterbricht, als dir lieb ist.",
      "actionIndex": 0,
      "actions": [
        "Suche in den Einstellungen nach „Benachrichtigungen“ auf Android oder „Mitteilungen“ auf dem iPhone.",
        "Wähle zunächst eine App, deren Hinweise dich oft stören.",
        "Ändere erst eine Einstellung und beobachte die Wirkung. Wichtige persönliche Nachrichten und Erinnerungen solltest du weiter bemerken können."
      ]
    },
    "assessment": {
      "relevance": "conditional",
      "context": "Die Hinweise deines Smartphones stören dich im Alltag.",
      "action": "none",
      "advice": "Du entscheidest, ob du die Einstellungen ändern möchtest."
    }
  },
  {
    "id": "elster-phishing-september-2026",
    "title": "ELSTER-Mail: Vorsicht beim angeblichen Datenabgleich",
    "summary": "Eine aktuelle Betrugsmail verlangt Steuer- und Bankdaten. Prüfe Mitteilungen direkt im ELSTER-Portal.",
    "relevance": "Du bekommst eine E-Mail, laut der deine Steuerdaten nicht stimmen? Die Verbraucherzentrale warnt am 11. September vor genau dieser Masche.",
    "takeaway": "Steuer- und Bankdaten gehören nicht in ein Formular aus einer unerwarteten E-Mail.",
    "category": "Sicherheit & Schutz",
    "topics": [
      "Formulare & Anträge",
      "Digitale Verwaltung"
    ],
    "icon": "shield",
    "date": "2026-09-11",
    "dateLabel": "Warnung",
    "paragraphTitles": [
      "Eine amtlich wirkende Aufforderung",
      "Den Link umgehen",
      "Unabhängig nachsehen"
    ],
    "paragraphs": [
      "Die Nachricht behauptet, bei ELSTER sei ein Datenabgleich nötig. Eine knappe Frist soll dich dazu bringen, Adresse, Steuer-Identifikationsnummer und Bankverbindung über einen Link einzugeben.",
      "Antworte nicht und nutze den enthaltenen Link nicht. Verschiebe die verdächtige Nachricht in den Spam-Ordner.",
      "Wenn du ELSTER verwendest, öffne das offizielle Portal über deine bekannte Adresse oder dein gespeichertes Lesezeichen. Prüfe dort, ob tatsächlich eine Mitteilung vorliegt."
    ],
    "tip": "Ein bekanntes Logo und eine dringende Frist belegen nicht, dass eine Nachricht echt ist.",
    "guideIds": [
      "betrugsnachrichten",
      "lesezeichen",
      "benutzerkonto"
    ],
    "sources": [
      {
        "title": "Verbraucherzentrale: Phishing-Radar, Warnung vom 11.09.2026",
        "url": "https://www.verbraucherzentrale.de/wissen/digitale-welt/phishingradar/phishingradar-aktuelle-warnungen-6059"
      }
    ],
    "checkedAt": "2026-09-13",
    "reading": {
      "audience": "Für dich relevant, wenn du eine unerwartete Nachricht zu deinen Steuerdaten erhältst.",
      "actionIndex": 2,
      "actions": [
        "Lasse den Link in der E-Mail geschlossen und antworte nicht.",
        "Öffne ELSTER über deine selbst eingegebene bekannte Adresse oder dein Lesezeichen.",
        "Prüfe dort, ob eine echte Mitteilung vorliegt. Verschiebe die verdächtige E-Mail in den Spam-Ordner für unerwünschte Nachrichten."
      ]
    },
    "assessment": {
      "relevance": "conditional",
      "context": "Du hast eine unerwartete E-Mail zu deinen Steuerdaten erhalten.",
      "action": "important",
      "advice": "Den Link geschlossen lassen und unabhängig prüfen."
    }
  }
];
