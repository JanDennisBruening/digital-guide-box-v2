import { NewsItem } from "../../types";

export const SICHERHEIT_NEWS: NewsItem[] = [
  {
    "id": "app-kamera-berechtigung-2026",
    "title": "Warum möchte diese App deine Kamera nutzen?",
    "category": "Sicherheit & Schutz",
    "date": "2026-09-13",
    "dateLabel": "Alltagstipp",
    "relevance": "Schützt deine Privatsphäre vor neugierigen oder unnötig datenhungrigen Apps.",
    "assessment": {
      "relevance": "yes",
      "context": "Wichtig bei jeder App-Installation oder wenn Berechtigungs-Anfragen auf dem Bildschirm aufpoppen.",
      "action": "recommended",
      "advice": "Wähle bei Berechtigungen immer „Nur bei Verwendung der App“ oder lehne ab, wenn kein ersichtlicher Grund vorliegt."
    },
    "takeaway": "Nicht jede App braucht Zugriff auf Kamera, Mikrofon oder Standort. Eine Taschenlampen-App oder ein einfaches Notizbuch benötigt keine Kamera. Hinterfrage Berechtigungsanfragen kritisch und entziehe ungenutzten Apps den Zugriff.",
    "paragraphTitles": [
      "Warum Apps Berechtigungen anfordern",
      "Wann der Kamerazugriff sinnvoll ist – und wann nicht",
      "So überprüfst du bestehende Berechtigungen"
    ],
    "paragraphs": [
      "Apps fordern Berechtigungen an, um bestimmte Hardware-Funktionen deines Telefons zu nutzen. Während WhatsApp die Kamera benötigt, um ein schnelles Foto zu verschicken, gibt es viele Spiele oder Hilfs-Apps, die Berechtigungen nur zur Werbemessung abgreifen wollen.",
      "Frage dich immer: Braucht diese Funktion logischerweise die Kamera? Wenn du Dokumente scannen oder QR-Codes lesen willst: Ja. Wenn eine Wetter-App oder ein Rechner danach fragt: Eindeutig Nein.",
      "Sowohl auf Android als auch auf dem iPhone kannst du in den Systemeinstellungen unter „Datenschutz & Sicherheit“ > „Berechtigungsmanager“ (oder „Kamera“) sehen, welche Apps Zugriff haben, und diesen mit einem Tippen widerrufen."
    ],
    "reading": {
      "audience": "Für alle Smartphone-Nutzer",
      "actions": [
        "Gehe in die Systemeinstellungen deines Smartphones",
        "Wähle den Menüpunkt „Datenschutz“ oder „Apps“",
        "Tippe auf „Berechtigungen“ > „Kamera“ und deaktiviere verdächtige Apps"
      ]
    },
    "tip": "Auf modernen Geräten siehst du oben rechts einen kleinen grünen Punkt, wenn gerade Kamera oder Mikrofon aktiv sind.",
    "checkedAt": "2026-09-13",
    "sources": [
      {
        "title": "Bundesamt für Sicherheit in der Informationstechnik (BSI) – App-Berechtigungen",
        "url": "https://www.bsi.bund.de"
      },
      {
        "title": "Verbraucherzentrale – Smartphone-Berechtigungen richtig einstellen",
        "url": "https://www.verbraucherzentrale.de"
      }
    ]
  },
  {
    "id": "elster-mail-vorsicht-datenabgleich-2026",
    "title": "ELSTER-Mail: Vorsicht beim angeblichen Datenabgleich",
    "category": "Sicherheit & Schutz",
    "date": "2026-09-11",
    "dateLabel": "Warnung",
    "relevance": "Gefährliche Phishing-Welle zielt auf Online-Banking- und Steuerdaten ab.",
    "assessment": {
      "relevance": "yes",
      "context": "Aktuell kursieren betrügerische E-Mails mit dem Absender „ELSTER“ oder „Finanzamt“.",
      "action": "important",
      "advice": "Lösche solche E-Mails sofort. Klicke niemals auf darin enthaltene Links und gib nirgendwo deine Daten ein."
    },
    "takeaway": "Kriminelle versenden täuschend echte E-Mails mit Betreffzeilen wie „Mein ELSTER: Datenabgleich erforderlich“ oder „Steuererstattung bereit“. Die Links führen auf gefälschte Webseiten, die deine Bankdaten und Passwörter stehlen wollen. Die echte Steuerverwaltung fordert niemals per E-Mail persönliche Daten an.",
    "paragraphTitles": [
      "Wie die Betrugs-E-Mail aussieht",
      "Die goldene Regel der Finanzverwaltung",
      "Was tun, wenn du bereits geklickt hast?"
    ],
    "paragraphs": [
      "Die gefälschten E-Mails nutzen das offizielle ELSTER-Logo und behördliche Begriffe wie „Datensynchronisierung“, „Pflichtabgleich nach §“ oder angebliche Steuererstattungen, um Druck aufzubauen. Oft wird mit Kontosperrungen gedroht, wenn man nicht innerhalb weniger Tage reagiert.",
      "Merke dir eine feste Grundregel: Das Finanzamt und ELSTER fordern dich NIEMALS per E-Mail auf, Passwörter, PINs, IBAN oder Kreditkartendaten über einen Link einzugeben. Echte Bescheide oder Benachrichtigungen kannst du ausschließlich nach manuellem Einloggen auf elster.de abrufen.",
      "Falls du bereits Zugangsdaten oder Kontodaten auf einer solchen Seite eingegeben hast: Rufe sofort deine Bank an (oder den Sperr-Notruf 116 116), um dein Online-Banking zu sperren, und erstatte Anzeige bei der Polizei."
    ],
    "reading": {
      "audience": "Für alle E-Mail-Nutzerinnen und -Nutzer",
      "actions": [
        "Prüfe den Absender: Echte Mails enden ausschließlich auf @elster.de (doch auch dieser kann gefälscht sein!)",
        "Klicke keine Links oder Anhänge in verdächtigen Steuer-Mails an",
        "Verschiebe die Nachricht in den Spam-Ordner und lösche sie"
      ]
    },
    "tip": "Gehe niemals über E-Mail-Links zu Banken oder Behörden. Tippe die Adresse (z. B. www.elster.de) immer selbst im Browser ein.",
    "checkedAt": "2026-09-11",
    "sources": [
      {
        "title": "Offizielle Sicherheitswarnung von ELSTER",
        "url": "https://www.elster.de"
      },
      {
        "title": "Verbraucherzentrale – Phishing-Radar zu Steuer-Mails",
        "url": "https://www.verbraucherzentrale.de"
      },
      {
        "title": "Polizeiliche Kriminalprävention – Phishing erkennen und abwehren",
        "url": "https://www.polizei-beratung.de"
      }
    ]
  },
  {
    "id": "zwei-faktor-authentifizierung-2026",
    "title": "2-Faktor-Authentifizierung: Der unknackbare zweite Riegel für deine Konten",
    "category": "Sicherheit & Schutz",
    "date": "2026-09-04",
    "dateLabel": "Ratgeber",
    "relevance": "Macht Konten selbst dann sicher, wenn Kriminelle dein Passwort kennen.",
    "assessment": {
      "relevance": "yes",
      "context": "Empfohlen für Google, Apple, E-Mail-Postfächer, Online-Shops und soziale Netzwerke.",
      "action": "recommended",
      "advice": "Aktiviere die 2-Faktor-Authentifizierung in deinem wichtigsten E-Mail-Konto."
    },
    "takeaway": "Passwörter können durch Datenlecks im Internet landen. Mit der 2-Faktor-Authentifizierung (2FA) genügt Kriminellen das Passwort nicht mehr: Ein Einbruchsversuch scheitert, weil der Täter keinen Zugriff auf dein persönliches Smartphone hat.",
    "paragraphTitles": [
      "Was bedeutet 2-Faktor-Authentifizierung?",
      "SMS-Code, Authentifikator-App oder Bestätigung am Display",
      "Warum dein E-Mail-Konto oberste Priorität hat"
    ],
    "paragraphs": [
      "Vergleichbar mit der Haustür: Das Passwort ist der Schlüssel, der zweite Faktor ist der Riegel von innen. Selbst wenn jemand deinen Schlüssel nachmacht, kommt er ohne dein Smartphone nicht hinein.",
      "Beim Einloggen auf einem neuen Computer poppt auf deinem Smartphone eine kurze Abfrage auf: „Versuchst du dich gerade anzumelden?“. Ein einfacher Tipp auf „Ja, das bin ich“ genügt zur Freigabe.",
      "Schütze zuerst dein zentrales E-Mail-Konto! Wenn Betrüger dein E-Mail-Passwort knacken, können sie bei allen anderen Konten (Amazon, PayPal, Bank) auf „Passwort vergessen“ klicken und dein digitales Leben übernehmen."
    ],
    "reading": {
      "audience": "Für alle Internetnutzer",
      "actions": [
        "Gehe in die Sicherheitseinstellungen deines E-Mail-Anbieters",
        "Aktiviere den Menüpunkt „2-Schritt-Verifizierung“ oder „2FA“",
        "Hinterlege dein Smartphone als sicheres Bestätigungsgerät"
      ]
    },
    "tip": "Drucke die angezeigten Notfall-Wiederherstellungscodes auf Papier aus und lege sie zu deinen wichtigen Dokumenten im Schrank.",
    "checkedAt": "2026-09-04",
    "sources": [
      {
        "title": "BSI: Zwei-Faktor-Authentisierung einfach erklärt",
        "url": "https://www.bsi.bund.de"
      }
    ]
  },
  {
    "id": "passwort-manager-sicher-2026",
    "title": "Nie wieder Passwörter vergessen: So hilft dir ein digitaler Passwort-Tresor",
    "category": "Sicherheit & Schutz",
    "date": "2026-08-27",
    "dateLabel": "Praxistipp",
    "relevance": "Beendet Zettelwirtschaft und schützt vor unsicheren Mehrfach-Passwörtern.",
    "assessment": {
      "relevance": "yes",
      "context": "Für alle, die überall dasselbe Passwort nutzen oder ständig auf „Passwort vergessen“ klicken.",
      "action": "recommended",
      "advice": "Nutze den integrierten Passwortmanager von Google oder Apple oder Programme wie Bitwarden."
    },
    "takeaway": "Niemand kann sich 50 verschiedene, komplizierte Passwörter merken. Die Lösung ist ein Passwortmanager: Du merkst dir nur ein einziges, starkes Master-Passwort – alle anderen Zugangsdaten füllt der Tresor automatisch und sicher für dich aus.",
    "paragraphTitles": [
      "Das gefährliche Problem identischer Passwörter",
      "Wie ein Passwortmanager im Alltag funktioniert",
      "Kostenlose und sichere Lösungen"
    ],
    "paragraphs": [
      "Wird ein kleiner Online-Shop gehackt, bei dem du dich vor fünf Jahren registriert hast, probieren Kriminelle dieselbe Kombination aus E-Mail und Passwort sofort bei Amazon, PayPal und eBay aus.",
      "Ein Passwortmanager speichert jedes Passwort stark verschlüsselt ab. Wenn du eine Webseite besuchst, erkennt die App das Eingabefeld und fragt dich nach Fingerabdruck oder Gesichtserkennung, um die Daten einzutragen.",
      "Sowohl Android (Google Passwortmanager) als auch iPhone (Apple Passwörter) haben kostenlose Tresore fest eingebaut. Wer Geräte mischt, findet in „Bitwarden“ eine hervorragende, geprüfte Open-Source-Alternative."
    ],
    "reading": {
      "audience": "Für alle, die ihre Zugänge stressfrei und sicher ordnen wollen",
      "actions": [
        "Prüfe in den Einstellungen deines Browsers den Bereich „Passwörter“",
        "Lass dir von der Sicherheitsprüfung schwache und doppelte Passwörter anzeigen",
        "Ändere nach und nach die wichtigsten Passwörter in kryptische Zufallscodes"
      ]
    },
    "tip": "Erstelle ein starkes Master-Passwort aus einem einfachen Merksatz, z. B.: „Mein Hund Bello frisst jeden Morgen 2 Kekse!“ wird zu: MhBfjM2K!.",
    "checkedAt": "2026-08-27",
    "sources": [
      {
        "title": "Stiftung Warentest: Passwort-Manager im Test",
        "url": "https://www.test.de"
      }
    ]
  },
  {
    "id": "whatsapp-enkeltrick-schutz-2026",
    "title": "„Hallo Mama, neue Nummer“: So entlarvst du den WhatsApp-Enkeltrick sofort",
    "category": "Sicherheit & Schutz",
    "date": "2026-08-20",
    "dateLabel": "Warnung",
    "relevance": "Schützt vor perfiden Betrugsversuchen, die Tausende Euro Schaden anrichten können.",
    "assessment": {
      "relevance": "yes",
      "context": "Häufige Betrugsmasche per WhatsApp und SMS an Eltern und Großeltern.",
      "action": "important",
      "advice": "Niemals Geld überweisen! Immer zuerst die bekannte alte Telefonnummer anrufen."
    },
    "takeaway": "Eine Nachricht von einer unbekannten Nummer: „Hallo Papa, mein Handy ist ins Klo gefallen, das ist meine neue Nummer. Ich habe ein dringendes Problem...“. Dahinter stecken professionelle Betrüger. Mit einer einfachen Kontrollfrage fliegt der Schwindel sofort auf.",
    "paragraphTitles": [
      "Die Masche mit dem angeblich kaputten Smartphone",
      "Der emotionale Druck: Dringende Rechnungen müssen bezahlt werden",
      "Der rettende Schritt: Die alte Nummer anrufen"
    ],
    "paragraphs": [
      "Die Täter nutzen menschliche Fürsorge schamlos aus. Sie behaupten, das alte Telefon sei kaputt und das Online-Banking auf dem neuen Gerät noch nicht freigeschaltet.",
      "Kurz darauf folgt die Bitte: „Kannst du heute dringend eine Rechnung für mich überweisen? Morgen gebe ich dir das Geld zurück!“. Wer hier überweist, sieht sein Geld in der Regel nie wieder.",
      "Reagiere niemals mit Überweisungen. Rufe dein Kind oder Enkelkind einfach unter der Nummer an, die du seit Jahren im Telefonbuch gespeichert hast. In 99 % der Fälle meldet sich der Verwandte völlig ahnungslos."
    ],
    "reading": {
      "audience": "Für alle Eltern, Großeltern und WhatsApp-Nutzer",
      "actions": [
        "Speichere unbekannte Nummern nicht voreilig als Kontakt ab",
        "Stelle bei Geldforderungen eine persönliche Frage, die nur der echte Verwandte kennen kann (z. B. Haustiername)",
        "Blockiere und melde die Nummer direkt in WhatsApp"
      ]
    },
    "tip": "Sprecht in der Familie offen über diese Masche – Betrüger setzen gezielt darauf, dass Betroffene aus Scham schweigen.",
    "checkedAt": "2026-08-20",
    "sources": [
      {
        "title": "Polizeiliche Kriminalprävention: WhatsApp-Betrug erkennen",
        "url": "https://www.polizei-beratung.de"
      }
    ]
  }
];
