import { Guide } from "../types";

export const ALL_GUIDES: Guide[] = [
  {
    "id": "whatsapp",
    "title": "WhatsApp",
    "subtitle": "Nachrichten schreiben und in Kontakt bleiben.",
    "category": "Kommunikation",
    "minutes": 5,
    "scope": "Smartphone · WhatsApp bereits eingerichtet",
    "steps": [
      {
        "title": "Einen Chat öffnen",
        "text": "Öffne WhatsApp und gehe zu „Chats“. Tippe auf das Symbol für einen neuen Chat und wähle eine vertraute Person aus. Bestehende Gespräche öffnest du direkt in der Liste.",
        "shortText": "WhatsApp öffnen, „Chats“ wählen und das Gespräch mit einer vertrauten Person öffnen."
      },
      {
        "title": "Eine Nachricht senden",
        "text": "Tippe in das Textfeld, schreibe einen kurzen Gruß und tippe auf den Sendepfeil. Kontrolliere vorher den Namen oben, damit die Nachricht an die richtige Person geht.",
        "shortText": "Namen prüfen, in das Textfeld tippen, Gruß schreiben und mit dem Sendepfeil abschicken."
      },
      {
        "title": "Bei Bedarf ein Foto teilen",
        "text": "Möchtest du zusätzlich ein Foto senden? Tippe im Chat auf Plus oder Büroklammer und wähle ein Foto. Prüfe die Vorschau vor dem Senden. Teile Bilder anderer Menschen nur mit deren Einverständnis. Für einen einfachen Gruß kannst du diesen Schritt überspringen.",
        "shortText": "Nur bei Bedarf: Über Plus oder Büroklammer ein Foto wählen. Vorschau und Einverständnis der abgebildeten Person prüfen."
      },
      {
        "title": "Eine Antwort finden",
        "text": "Kehre zur Chatliste zurück und öffne das Gespräch erneut. Neue Nachrichten stehen unten im Verlauf. Zum Antworten nutzt du wieder das Textfeld.",
        "shortText": "Zur Chatliste zurückgehen und das Gespräch erneut öffnen. Antworten stehen unten im Verlauf."
      }
    ],
    "tip": "Übe zuerst mit einer vertrauten Person. Gib Bestätigungs- oder Registrierungscodes niemals weiter. Symbole und ihre Position können je nach Gerät und App-Version abweichen.",
    "sources": [
      {
        "title": "WhatsApp-Hilfebereich (zum Nachschlagen)",
        "url": "https://faq.whatsapp.com/"
      }
    ],
    "theme": "gruen",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest jemandem einen Gruß schicken und später die Antwort wiederfinden. Wir beginnen mit einer vertrauten Person.",
      "preparation": [
        "WhatsApp ist auf deinem Smartphone bereits eingerichtet.",
        "Wähle zum Üben eine Person, die mit einer Nachricht von dir rechnet."
      ],
      "result": "Öffne das Gespräch erneut: Steht dein Gruß im Verlauf und stimmt der Name oben? Eine Antwort erscheint im selben Gespräch.",
      "ifStuck": "Siehst du andere Symbole? Suche nach dem Namen der Funktion. Bei der Frage nach einem Registrierungscode halte an und gib den Code niemandem weiter."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "google-konto",
    "title": "Google-Konto",
    "subtitle": "Das eigene Konto verstehen und absichern.",
    "category": "Konten",
    "minutes": 5,
    "scope": "Browser · persönliches Google-Konto",
    "steps": [
      {
        "title": "Erst prüfen, ob du ein Konto hast",
        "text": "Nutzt du bereits Gmail, den Play Store oder andere Google-Dienste angemeldet? Dann hast du vermutlich schon ein Google-Konto. Prüfe die angezeigte Adresse über dein Profilbild, bevor du ein zweites Konto anlegst.",
        "shortText": "Im Profilbild eines Google-Dienstes die angemeldete Adresse prüfen. Ein vorhandenes Konto weiterverwenden."
      },
      {
        "title": "Bei Bedarf ein Konto erstellen",
        "text": "Öffne accounts.google.com im Browser. Wähle „Konto erstellen“ und die persönliche Nutzung. Folge den Angaben auf dem Bildschirm. Eine neue Gmail-Adresse ist möglich; auch eine vorhandene andere E-Mail-Adresse kann verwendet werden.",
        "shortText": "Nur ohne eigenes Konto: accounts.google.com selbst öffnen und „Konto erstellen“ wählen. Den Angaben folgen."
      },
      {
        "title": "Zugang sicher aufbewahren",
        "text": "Verwende ein langes Passwort, das du nur für dieses Konto nutzt. Speichere die Kontoadresse und den Zugang in einem Passwortmanager. Ergänze passende Wiederherstellungsoptionen, auf die du selbst zugreifen kannst.",
        "shortText": "Ein eigenes langes Passwort verwenden und Zugang sowie Wiederherstellungsoptionen sicher aufbewahren."
      },
      {
        "title": "Die Sicherheit prüfen",
        "text": "Öffne myaccount.google.com und den Sicherheitsbereich. Prüfe deine Wiederherstellungsangaben und richte die angebotene Bestätigung in zwei Schritten ein. Bewahre zugehörige Wiederherstellungscodes sicher auf.",
        "shortText": "Unter myaccount.google.com den Sicherheitsbereich prüfen und angebotenen zusätzlichen Kontoschutz einrichten."
      }
    ],
    "tip": "Das Google-Konto ist dein Zugang zu mehreren Diensten. Gmail ist einer dieser Dienste. Ein neues Konto löst den vergessenen Zugang zu einem alten Konto nicht.",
    "sources": [
      {
        "title": "Google: Konto erstellen",
        "url": "https://support.google.com/accounts/answer/27441?hl=de"
      },
      {
        "title": "Google: Bestätigung in zwei Schritten",
        "url": "https://support.google.com/accounts/answer/185839?hl=de"
      }
    ],
    "theme": "blau",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du nutzt vielleicht schon Gmail, weißt aber nicht genau, welcher Zugang dazugehört. Hier findest du heraus, welches Konto du hast und wie du es schützt.",
      "preparation": [
        "Halte deine bekannte E-Mail-Adresse bereit, falls du schon Google-Dienste nutzt.",
        "Ein vorhandenes Konto musst du nicht noch einmal erstellen."
      ],
      "result": "Kannst du deine Kontoadresse nennen und deine Wiederherstellungsangaben im Sicherheitsbereich finden? Das ist eine gute Grundlage für spätere Hilfe.",
      "ifStuck": "Ist nur das Passwort vergessen, nutze die Kontowiederherstellung. Ein zweites Konto bringt die alten Nachrichten und Daten nicht zurück."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "gmail",
    "title": "Gmail",
    "subtitle": "Eine E-Mail schreiben, prüfen und versenden.",
    "category": "Kommunikation",
    "minutes": 4,
    "scope": "Computer · Gmail im Browser",
    "steps": [
      {
        "title": "Das Postfach öffnen",
        "text": "Gib mail.google.com in die Adressleiste deines Browsers ein. Melde dich bei deinem Google-Konto an. Im Posteingang findest du eingegangene Nachrichten.",
        "shortText": "mail.google.com im Browser öffnen und beim eigenen Google-Konto anmelden."
      },
      {
        "title": "Eine Nachricht beginnen",
        "text": "Klicke auf „Schreiben“. Trage bei „An“ die vollständige E-Mail-Adresse ein. Ein kurzer Betreff sagt der anderen Person, worum es geht, zum Beispiel „Unser Termin am Dienstag“.",
        "shortText": "Auf „Schreiben“ klicken. Vollständige Adresse bei „An“ und einen kurzen Betreff eintragen."
      },
      {
        "title": "Text schreiben und kontrollieren",
        "text": "Schreibe deine Nachricht mit Anrede und Gruß. Prüfe anschließend die vollständige Empfängeradresse, den Betreff und den Text. Für den ersten Versuch brauchst du keinen Anhang.",
        "shortText": "Nachricht schreiben. Empfängeradresse, Betreff und Text noch einmal in Ruhe prüfen."
      },
      {
        "title": "Senden und wiederfinden",
        "text": "Klicke auf „Senden“. Unter „Gesendet“ findest du die versandte Nachricht. Noch nicht versandte Texte speichert Gmail als Entwurf. Eine Antwort erscheint im Posteingang.",
        "shortText": "„Senden“ wählen. Danach unter „Gesendet“ nachsehen; Antworten kommen in den Posteingang."
      }
    ],
    "tip": "Nutze für den ersten Versuch deine eigene E-Mail-Adresse. Sende keine Passwörter oder Bestätigungscodes per E-Mail. Öffne unerwartete Anhänge erst nach Rückfrage.",
    "sources": [
      {
        "title": "Google: E-Mails schreiben und senden",
        "url": "https://support.google.com/mail/answer/9259768?hl=de"
      }
    ],
    "theme": "rot",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest eine E-Mail verschicken und sicher sein, dass sie an die richtige Adresse geht. Für den ersten Versuch kannst du dir selbst schreiben.",
      "preparation": [
        "Öffne Gmail am Computer. Du brauchst Zugang zu deinem Google-Konto.",
        "Halte die vollständige Adresse der empfangenden Person bereit."
      ],
      "result": "Findest du die Nachricht unter „Gesendet“? Hast du dir selbst geschrieben, sollte sie auch im Posteingang erscheinen.",
      "ifStuck": "Fehlt die Nachricht unter „Gesendet“, schaue unter „Entwürfe“ nach. Prüfe vor erneutem Senden, ob sie nicht doch schon verschickt wurde."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "webbrowser",
    "title": "Webbrowser",
    "subtitle": "Webseiten öffnen und dich im Internet orientieren.",
    "category": "Internet",
    "minutes": 4,
    "scope": "Smartphone und Computer · Grundlagen",
    "steps": [
      {
        "title": "Den Browser erkennen",
        "text": "Ein Browser ist ein Programm zum Öffnen von Webseiten. Bekannte Beispiele sind Chrome, Safari, Firefox und Edge. Welcher bereits installiert ist, hängt von deinem Gerät ab.",
        "shortText": "Ein Browser öffnet Webseiten. Beispiele sind Safari, Chrome, Firefox und Edge."
      },
      {
        "title": "Eine Adresse öffnen",
        "text": "Tippe in die Adressleiste, gib die vollständige Webadresse ein und bestätige mit Enter oder „Los“. So rufst du eine bekannte Seite direkt auf.",
        "shortText": "Eine bekannte Webadresse in die Adressleiste eingeben und mit Enter oder „Los“ bestätigen."
      },
      {
        "title": "Suchen und Adresse unterscheiden",
        "text": "Kennst du die Adresse nicht, kannst du Suchwörter in die Leiste schreiben. Dann zeigt eine Suchmaschine Ergebnisse. Prüfe vor dem Öffnen den Anbieter und die Webadresse eines Treffers.",
        "shortText": "Suchwörter führen zu Suchergebnissen. Vor dem Öffnen Anbieter und Webadresse prüfen."
      },
      {
        "title": "Mit Tabs den Überblick behalten",
        "text": "Ein Tab ist eine weitere geöffnete Webseite im selben Browser. Über Plus öffnest du meist einen neuen Tab. Schließe nicht mehr benötigte Tabs und nutze den Zurück-Pfeil, um zur vorherigen Seite zu gelangen.",
        "shortText": "Ein Tab hält eine weitere Seite offen. Nicht benötigte Tabs schließen; der Zurück-Pfeil führt zur vorherigen Seite."
      }
    ],
    "tip": "Browser und Suchmaschine sind verschieden: Der Browser öffnet Webseiten, die Suchmaschine hilft beim Finden. Der private Modus macht dich im Internet nicht anonym.",
    "sources": [
      {
        "title": "Mozilla: Was macht ein Internet-Browser?",
        "url": "https://www.firefox.com/de/more/what-is-a-browser/"
      }
    ],
    "theme": "blau",
    "level": "Grundlagen",
    "learning": {
      "kind": "explain",
      "why": "Du sollst eine Webseite öffnen und fragst dich, welches Programm dafür gemeint ist. Hier lernst du den Browser an einer einfachen Aufgabe kennen.",
      "preparation": [
        "Halte ein Smartphone, Tablet oder einen Computer mit Internetzugang bereit.",
        "Zum Ausprobieren genügt eine bekannte Webadresse."
      ],
      "result": "Kennst du die Webadresse, gibst du sie direkt ein. Kennst du nur das Thema, hilft dir eine Suche.",
      "ifStuck": "Du musst keinen neuen Browser installieren. Schau nach einem Namen wie Safari, Chrome, Firefox oder Edge auf deinem Gerät."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "wlan",
    "title": "WLAN",
    "subtitle": "Das Smartphone mit deinem WLAN verbinden.",
    "category": "Geräte & Technik",
    "minutes": 3,
    "scope": "Android und iPhone · eigenes WLAN",
    "steps": [
      {
        "title": "Den Netzwerknamen bereitlegen",
        "text": "Suche den Namen deines WLANs und das zugehörige WLAN-Passwort. Wenn sie nicht geändert wurden, stehen sie häufig auf einem Aufkleber am Router.",
        "shortText": "WLAN-Namen und WLAN-Passwort bereitlegen, häufig auf dem Router-Aufkleber."
      },
      {
        "title": "WLAN in den Einstellungen öffnen",
        "text": "Auf dem iPhone: „Einstellungen“ und „WLAN“. Unter Android heißt der Bereich häufig „Netzwerk & Internet“ und „Internet“ oder „Verbindungen“ und „WLAN“. Aktiviere WLAN.",
        "shortText": "In den Einstellungen „WLAN“ suchen und einschalten. Unter Android kann es unter „Verbindungen“ oder „Internet“ stehen."
      },
      {
        "title": "Das richtige Netzwerk auswählen",
        "text": "Tippe auf deinen Netzwerknamen. Gib das WLAN-Passwort ein; Groß- und Kleinschreibung zählen. Bestätige mit „Verbinden“ oder dem entsprechenden Knopf.",
        "shortText": "Eigenes Netzwerk antippen. WLAN-Passwort mit richtiger Groß- und Kleinschreibung eingeben und verbinden."
      },
      {
        "title": "Die Verbindung prüfen",
        "text": "Achte in den WLAN-Einstellungen darauf, ob dein eigenes Netzwerk als verbunden angezeigt wird. Öffne anschließend eine bekannte Webseite. Lädt sie nicht, prüfe, ob andere Geräte im selben WLAN ins Internet kommen. Die WLAN-Verbindung und der Internetzugang sind zwei verschiedene Dinge.",
        "shortText": "Verbindungsstatus ansehen und eine bekannte Webseite öffnen. WLAN und Internetzugang getrennt prüfen."
      }
    ],
    "tip": "Eine WLAN-Verbindung allein garantiert noch keinen Internetzugang. Nutze das WLAN-Passwort und nicht versehentlich das Kennwort für die Router-Verwaltung.",
    "sources": [
      {
        "title": "Google: WLAN auf Android",
        "url": "https://support.google.com/android/answer/9075847?hl=de"
      },
      {
        "title": "Apple: Mit einem WLAN verbinden",
        "url": "https://support.apple.com/de-de/111786"
      }
    ],
    "theme": "tuerkis",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest zu Hause mit dem Smartphone ins Internet. Dafür verbinden wir es mit deinem eigenen WLAN.",
      "preparation": [
        "Halte den WLAN-Namen und das WLAN-Passwort bereit.",
        "Bleibe zum Einrichten in der Nähe deines Routers."
      ],
      "result": "In den WLAN-Einstellungen steht dein Netz als verbunden. Lädt zusätzlich eine bekannte Webseite, funktioniert auch der Internetzugang.",
      "ifStuck": "Prüfe den Netzwerknamen und das WLAN-Passwort. Besteht die Verbindung bereits, aber keine Seite lädt, frage nach, ob andere Geräte im selben WLAN ins Internet kommen."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "updates",
    "title": "Updates",
    "subtitle": "Dein Smartphone auf Aktualisierungen prüfen.",
    "category": "Sicherheit",
    "minutes": 4,
    "scope": "Android und iPhone · Systemupdates",
    "steps": [
      {
        "title": "Das Update vorbereiten",
        "text": "Verbinde dein Smartphone mit einem vertrauten WLAN und lade den Akku ausreichend oder schließe das Ladegerät an. Sorge für freien Speicherplatz und eine aktuelle Sicherung wichtiger Daten.",
        "shortText": "WLAN, Stromversorgung, freien Speicher und eine aktuelle Datensicherung sicherstellen."
      },
      {
        "title": "Die passenden Einstellungen öffnen",
        "text": "Auf dem iPhone öffnest du „Einstellungen“, dann „Allgemein“ und „Softwareupdate“. Auf Android suchst du in den Einstellungen nach „Softwareupdate“. Nutze nur den Weg, der zu deinem Gerät passt.",
        "shortText": "iPhone: Einstellungen → Allgemein → Softwareupdate. Android: In den Einstellungen nach „Softwareupdate“ suchen."
      },
      {
        "title": "Die angebotene Aktualisierung prüfen",
        "text": "Wird ein Update angeboten, lies die Hinweise auf dem Bildschirm. Starte es, wenn dein Gerät am Strom hängt und du es eine Weile nicht brauchst. Wird nichts angeboten, musst du hier nichts erzwingen.",
        "shortText": "Hinweise lesen. Eine angebotene Aktualisierung erst starten, wenn du das Gerät eine Weile nicht brauchst."
      },
      {
        "title": "Installation abschließen",
        "text": "Lass das Gerät während der Installation eingeschaltet und starte es neu, wenn du dazu aufgefordert wirst. Prüfe danach den Aktualisierungsstatus erneut. Die Installation kann deutlich länger als das Lesen dieser Anleitung dauern.",
        "shortText": "Installation nicht unterbrechen. Einen verlangten Neustart zulassen und anschließend den Update-Status prüfen."
      }
    ],
    "tip": "Starte Updates aus den Geräteeinstellungen. Eine Warnung auf irgendeiner Webseite ist kein verlässlicher Update-Hinweis. Ältere Geräte erhalten eventuell keine neuen Sicherheitsupdates mehr.",
    "sources": [
      {
        "title": "Google: Android aktualisieren",
        "url": "https://support.google.com/android/answer/7680439?hl=de"
      },
      {
        "title": "Apple: iPhone oder iPad aktualisieren",
        "url": "https://support.apple.com/de-de/118575"
      }
    ],
    "theme": "violett",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Dein Smartphone bietet eine Aktualisierung an. Hier erfährst du, wie du sie in Ruhe vorbereitest und sicher aus den Einstellungen startest.",
      "preparation": [
        "Nutze vertrautes WLAN, genügend Akku und eine aktuelle Sicherung wichtiger Daten.",
        "Plane Zeit ein, in der du dein Smartphone nicht brauchst. Die Installation dauert länger als das Lesen."
      ],
      "result": "Siehst du nach einem möglichen Neustart in den Update-Einstellungen, ob die Installation beendet ist oder noch etwas aussteht?",
      "ifStuck": "Findest du den Menüpunkt nicht, nutze die Suche in den Einstellungen. Wird kein Update angeboten, kann das am Modell oder Hersteller liegen."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "passwoerter",
    "title": "Passwörter",
    "subtitle": "Zugänge mit einfachen Gewohnheiten schützen.",
    "category": "Sicherheit",
    "minutes": 4,
    "scope": "Alle Geräte · Grundlagen",
    "steps": [
      {
        "title": "Für jedes Konto ein eigenes Passwort",
        "text": "Verwende dasselbe Passwort nicht für mehrere Dienste. Sonst kann ein gestohlener Zugang auch andere Konten gefährden. Beginne beim Schutz deines wichtigsten E-Mail-Kontos.",
        "shortText": "Für jedes Konto ein eigenes Passwort verwenden. Mit dem wichtigsten E-Mail-Konto beginnen."
      },
      {
        "title": "Länge statt persönlicher Angaben",
        "text": "Wähle ein langes, schwer vorhersehbares Passwort. Namen, Geburtstage und einfache Zahlenfolgen sind ungeeignet. Ein Passwortmanager kann starke Passwörter erzeugen und sicher speichern.",
        "shortText": "Lange, unvorhersehbare Passwörter wählen. Namen, Geburtstage und einfache Zahlenfolgen vermeiden."
      },
      {
        "title": "Den Passwortmanager gut absichern",
        "text": "Schütze ihn mit einem besonders starken Hauptpasswort beziehungsweise der vorgesehenen sicheren Geräteanmeldung. Richte die angebotenen Wiederherstellungsmöglichkeiten ein, bevor du dich darauf verlässt.",
        "shortText": "Den Passwortmanager durch ein starkes Hauptpasswort oder die vorgesehene sichere Geräteanmeldung schützen."
      },
      {
        "title": "Einen zweiten Schutz ergänzen",
        "text": "Aktiviere bei wichtigen Konten die Bestätigung in zwei Schritten, wenn sie angeboten wird. Sichere die Wiederherstellungscodes getrennt und geschützt, damit du bei einem Geräteverlust weiter an dein Konto kommst.",
        "shortText": "Bei wichtigen Konten die Bestätigung in zwei Schritten ergänzen und Wiederherstellungscodes sicher aufbewahren."
      }
    ],
    "tip": "Teile Passwörter und Einmalcodes auch dann nicht, wenn jemand angeblich vom Support anruft. Ein Beispielsatz aus einer Anleitung eignet sich niemals als echtes Passwort.",
    "sources": [
      {
        "title": "Google: Starke Passwörter",
        "url": "https://support.google.com/accounts/answer/32040?hl=de"
      },
      {
        "title": "Google: Bestätigung in zwei Schritten",
        "url": "https://support.google.com/accounts/answer/185839?hl=de"
      }
    ],
    "theme": "gold",
    "level": "Grundlagen",
    "learning": {
      "kind": "explain",
      "why": "Ein Passwort schützt deinen persönlichen Zugang. Du lernst die wichtigsten Gewohnheiten kennen, ohne alle Konten auf einmal ändern zu müssen.",
      "preparation": [
        "Beginne gedanklich mit deinem wichtigsten E-Mail-Konto.",
        "Halte deine echten Passwörter privat und gib sie in keiner Kontaktanfrage an."
      ],
      "result": "Ein gutes Grundprinzip ist: für jedes Konto ein eigenes langes Passwort, sicher aufbewahrt und bei wichtigen Konten zusätzlich geschützt.",
      "ifStuck": "Ein Passwortmanager ist ein geschütztes Programm für deine Zugänge. Wenn du noch keinen nutzt, lass dir die Einrichtung zeigen, bevor du gespeicherte Zugänge veränderst."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "betrugsnachrichten",
    "title": "Betrugsnachrichten",
    "subtitle": "Verdächtige E-Mails erkennen und ruhig reagieren.",
    "category": "Sicherheit",
    "minutes": 4,
    "scope": "E-Mail · auch auf andere Nachrichten übertragbar",
    "steps": [
      {
        "title": "Bei Druck kurz anhalten",
        "text": "Eine Nachricht verlangt sofortiges Handeln, droht mit einer Sperre oder verspricht einen überraschenden Gewinn? Reagiere zunächst nicht. Solche Aufforderungen können ein Betrugsversuch sein.",
        "shortText": "Bei Drohung, Zeitdruck oder überraschendem Gewinn zunächst anhalten. Nichts bestätigen."
      },
      {
        "title": "Absender und Anliegen prüfen",
        "text": "Kontrolliere die vollständige E-Mail-Adresse und überlege, ob du die Nachricht erwartet hast. Ein bekannter Anzeigename oder ein Logo beweist nichts. Auch fehlerfreie Sprache ist kein Echtheitsbeleg.",
        "shortText": "Vollständige Absenderadresse und Anliegen prüfen. Namen, Logos und fehlerfreie Sprache beweisen keine Echtheit."
      },
      {
        "title": "Unabhängig nachfragen",
        "text": "Öffne die offizielle App oder gib die bekannte Webadresse selbst ein. Frage bei Bedarf über eine bereits bekannte Nummer nach. Verwende dafür keine Kontaktdaten oder Links aus der verdächtigen Nachricht.",
        "shortText": "Die bekannte Anbieter-App oder selbst eingegebene Webadresse nutzen; unabhängig nachfragen."
      },
      {
        "title": "Melden und Zugang schützen",
        "text": "Melde die Nachricht in deinem Mailprogramm als Phishing. Hast du Zugangsdaten eingegeben, ändere das betroffene Passwort sofort über die offizielle Seite und kontrolliere dein Konto auf unbekannte Zugriffe.",
        "shortText": "Als Phishing melden. Bereits eingegebene Zugangsdaten sofort über die echte Anbieter-Seite ändern."
      }
    ],
    "tip": "Ein Link lässt sich leichter vermeiden als ein Schaden rückgängig machen. Gib nach einer unerwarteten Nachricht keine Passwörter, Bestätigungscodes oder vertraulichen Daten ein.",
    "sources": [
      {
        "title": "Google: Phishing vermeiden und melden",
        "url": "https://support.google.com/mail/answer/8253?hl=de"
      }
    ],
    "theme": "gruen",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Eine Nachricht setzt dich unter Druck: Dein Konto werde gesperrt oder du sollst sofort Daten angeben. Wir prüfen zuerst in Ruhe, bevor du reagierst.",
      "preparation": [
        "Lasse Links und Anhänge in der verdächtigen Nachricht zunächst geschlossen.",
        "Halte einen bereits bekannten Kontaktweg zum angeblichen Absender bereit."
      ],
      "result": "Konntest du das Anliegen über einen bekannten Kontaktweg unabhängig prüfen, ohne Daten über die verdächtige Nachricht einzugeben? Wenn nicht, hole dir Unterstützung.",
      "ifStuck": "Hast du bereits ein Passwort eingegeben, ändere es über die echte Anbieter-Seite. Hole bei Unsicherheit persönliche Unterstützung; nutze keine Kontaktdaten aus der Nachricht."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "fotos-sichern",
    "title": "Fotos sichern",
    "subtitle": "Mit Google Fotos eine Sicherung einrichten.",
    "category": "Fotos & Dateien",
    "minutes": 5,
    "scope": "Google Fotos auf Android · Google-Konto erforderlich",
    "steps": [
      {
        "title": "Das richtige Konto prüfen",
        "text": "Öffne Google Fotos und tippe auf dein Profilbild. Kontrolliere die angezeigte E-Mail-Adresse. Die Bilder sollen in deinem eigenen Konto gesichert werden.",
        "shortText": "In Google Fotos das Profilbild öffnen und die eigene Kontoadresse kontrollieren."
      },
      {
        "title": "Die Sicherung einschalten",
        "text": "Öffne die Google Fotos-Einstellungen und „Sicherung“. Aktiviere die Sicherung und prüfe das Zielkonto. Bilder werden dabei in dein Google-Konto im Internet hochgeladen.",
        "shortText": "Unter Fotos-Einstellungen → Sicherung die Sicherung und das Zielkonto prüfen."
      },
      {
        "title": "Speicher und Verbindung prüfen",
        "text": "Prüfe den verfügbaren Speicherplatz und wähle die gewünschte Sicherungsqualität. Nutze für größere Bildmengen WLAN. Falls weitere Geräteordner gesichert werden sollen, wähle sie gezielt aus.",
        "shortText": "Kontospeicher und Sicherungsqualität ansehen. Für viele Bilder WLAN verwenden."
      },
      {
        "title": "Den Erfolg kontrollieren",
        "text": "Warte, bis der Sicherungsstatus den Abschluss bestätigt. Öffne testweise photos.google.com im Browser mit demselben Konto und kontrolliere ein paar Bilder. Sichere besonders wichtige Fotos zusätzlich separat.",
        "shortText": "Auf den Abschluss warten und Bilder unter photos.google.com mit demselben Konto prüfen. Kein Löschtest!"
      }
    ],
    "tip": "Löschen in Google Fotos kann auch gesicherte Bilder und verbundene Geräte betreffen. Lösche deshalb nicht probeweise, um die Sicherung zu testen. Eine zweite unabhängige Kopie schützt zusätzlich.",
    "sources": [
      {
        "title": "Google: Fotos und Videos sichern",
        "url": "https://support.google.com/photos/answer/6193313?hl=de"
      },
      {
        "title": "Google: Auswirkungen beim Löschen",
        "url": "https://support.google.com/photos/answer/6128858?hl=de"
      }
    ],
    "theme": "magenta",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest deine Fotos auch bei einem verlorenen oder kaputten Smartphone behalten. Wir prüfen dafür die Sicherung in Google Fotos.",
      "preparation": [
        "Die Anleitung gilt für Google Fotos auf Android mit deinem eigenen Google-Konto.",
        "Nutze WLAN. Lösche zum Testen keine Fotos."
      ],
      "result": "Sind die Bilder unter photos.google.com mit demselben Konto sichtbar und meldet die App eine abgeschlossene Sicherung?",
      "ifStuck": "Lies den Sicherungsstatus: Voller Kontospeicher oder eine unterbrochene Verbindung können den Vorgang anhalten. Sichere besonders wichtige Fotos zusätzlich unabhängig."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "qr-codes",
    "title": "QR-Codes",
    "subtitle": "Mit der Kamera eine verlinkte Seite öffnen.",
    "category": "Internet",
    "minutes": 3,
    "scope": "iPhone · Kamera-App",
    "steps": [
      {
        "title": "Die Kamera öffnen",
        "text": "Ein QR-Code ist ein quadratisches Muster, das zum Beispiel eine Webadresse enthält. Öffne die Kamera-App auf deinem iPhone, als wolltest du ein Foto machen.",
        "shortText": "Die Kamera-App auf dem iPhone öffnen."
      },
      {
        "title": "Den Code ins Bild nehmen",
        "text": "Richte die Kamera so aus, dass der ganze QR-Code auf dem Bildschirm zu sehen ist. Halte das Gerät kurz ruhig. Du musst kein Foto aufnehmen.",
        "shortText": "Den ganzen QR-Code ins Bild nehmen und das Gerät kurz ruhig halten. Kein Foto nötig."
      },
      {
        "title": "Den Hinweis prüfen",
        "text": "Warte auf den eingeblendeten Link. Überlege vor dem Antippen, ob du den Code und den Anbieter kennst. Ein QR-Code allein sagt nichts über die Vertrauenswürdigkeit der Seite aus.",
        "shortText": "Den eingeblendeten Link und den Anbieter vor dem Antippen prüfen."
      },
      {
        "title": "Die Seite öffnen",
        "text": "Tippe auf den Hinweis, wenn das Ziel plausibel ist. Die verlinkten Inhalte öffnen sich. Bei einer unerwarteten Aufforderung zur Anmeldung oder Zahlung halte erst einmal inne.",
        "shortText": "Nur ein plausibles Ziel öffnen. Bei unerwarteter Anmeldung oder Zahlung erst anhalten."
      }
    ],
    "tip": "Wird nichts erkannt, ändere Abstand oder Licht. Du kannst auf dem iPhone auch „Code scannen“ im Kontrollzentrum verwenden.",
    "sources": [
      {
        "title": "Apple: QR-Code mit dem iPhone scannen",
        "url": "https://support.apple.com/de-de/102680"
      }
    ],
    "theme": "schiefer",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Auf einem Aushang siehst du ein quadratisches Muster. Mit der iPhone-Kamera kannst du ansehen, welche Webseite sich dahinter verbirgt.",
      "preparation": [
        "Nutze ein iPhone und einen gut lesbaren QR-Code eines bekannten Anbieters.",
        "Öffne Links nur, wenn das angezeigte Ziel zur Situation passt."
      ],
      "result": "Nach dem Antippen des geprüften Hinweises öffnet sich die passende Webseite. Du musstest dafür kein Foto aufnehmen.",
      "ifStuck": "Wird kein Hinweis angezeigt, ändere Abstand oder Licht und halte das Gerät ruhig. Alternativ gibt es „Code scannen“ im Kontrollzentrum."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "screenshots",
    "title": "Screenshots",
    "subtitle": "Den Bildschirm als Bild festhalten und wiederfinden.",
    "category": "Fotos & Dateien",
    "minutes": 3,
    "scope": "Android · Tasten können je nach Gerät abweichen",
    "steps": [
      {
        "title": "Den Inhalt vorbereiten",
        "text": "Öffne die Ansicht, die du festhalten möchtest. Ein Screenshot ist ein Bild des Bildschirms – hilfreich etwa, um eine Fehlermeldung zu zeigen.",
        "shortText": "Die gewünschte Bildschirmansicht ohne vertrauliche Angaben öffnen."
      },
      {
        "title": "Die Aufnahme machen",
        "text": "Drücke die Ein-/Aus-Taste und die Leisertaste kurz gleichzeitig. Meist erscheint eine kleine Vorschau. Funktioniert das nicht, schau in der Hilfe deines Geräteherstellers nach.",
        "shortText": "Ein-/Aus-Taste und Leisertaste kurz gleichzeitig drücken. Auf die Vorschau achten."
      },
      {
        "title": "Das Bild wiederfinden",
        "text": "Öffne deine Fotos- oder Galerie-App und suche den Ordner „Screenshots“. In Google Fotos findest du ihn unter „Sammlungen“, dann „Auf diesem Gerät“.",
        "shortText": "In Fotos oder Galerie den Ordner „Screenshots“ suchen."
      },
      {
        "title": "Prüfen und bei Bedarf teilen",
        "text": "Öffne das Bild und kontrolliere den Inhalt. Über „Teilen“ kannst du eine App und die gewünschte Person wählen. Prüfe die Empfängerangabe vor dem Senden.",
        "shortText": "Bildinhalt prüfen. Bei Bedarf „Teilen“ wählen und vor dem Senden die richtige Person kontrollieren."
      }
    ],
    "tip": "Achte darauf, dass keine Passwörter, Codes oder privaten Nachrichten sichtbar sind. Manche Apps verhindern Bildschirmaufnahmen; das ist kein Gerätefehler.",
    "sources": [
      {
        "title": "Google: Screenshots auf Android",
        "url": "https://support.google.com/android/answer/9075928?hl=de"
      }
    ],
    "theme": "violett",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest eine Fehlermeldung jemandem zeigen. Ein Screenshot hält genau das fest, was gerade auf deinem Bildschirm zu sehen ist.",
      "preparation": [
        "Diese Anleitung gilt für Android; Tasten können je nach Modell abweichen.",
        "Öffne eine Ansicht ohne Passwörter, Codes oder private Nachrichten."
      ],
      "result": "Findest du das Bildschirmbild in deiner Fotos-App und ist die wichtige Stelle lesbar?",
      "ifStuck": "Klappt die Tastenkombination nicht, nutze die Hilfe deines Geräteherstellers. Manche Apps verhindern Aufnahmen absichtlich."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "schriftgroesse",
    "title": "Größere Schrift",
    "subtitle": "Texte auf dem Smartphone angenehmer lesen.",
    "category": "Geräte & Technik",
    "minutes": 3,
    "scope": "Android · Schrift- und Anzeigeeinstellungen",
    "steps": [
      {
        "title": "Die Einstellungen öffnen",
        "text": "Sind dir Nachrichten und Menüs zu klein? Öffne die Einstellungen deines Smartphones. Du erkennst die App meist an einem Zahnrad.",
        "shortText": "Die Einstellungen am Zahnrad-Symbol öffnen."
      },
      {
        "title": "Nach Schriftgröße suchen",
        "text": "Nutze die Suche in den Einstellungen und gib „Schriftgröße“ ein. Öffne den passenden Treffer. Der Bereich kann je nach Hersteller auch „Anzeigegröße und Text“ heißen.",
        "shortText": "Nach „Schriftgröße“ suchen und den passenden Treffer öffnen."
      },
      {
        "title": "Die Größe anpassen",
        "text": "Bewege den Schieberegler ein Stück nach rechts. Sieh dir die Vorschau an und wähle eine Größe, die du bequem lesen kannst. Über „Anzeigegröße“ lassen sich auch Bedienelemente vergrößern.",
        "shortText": "Den Regler etwas nach rechts bewegen und die Vorschau prüfen. „Anzeigegröße“ verändert auch Bedienelemente."
      },
      {
        "title": "Im Alltag ausprobieren",
        "text": "Öffne eine häufig genutzte App und lies einen Text. Passt die Größe noch nicht, kehre zu den Einstellungen zurück und ändere sie erneut. Beginne mit kleinen Anpassungen.",
        "shortText": "Eine häufig genutzte App öffnen und die Lesbarkeit prüfen. Die Einstellung lässt sich wieder ändern."
      }
    ],
    "tip": "Nicht jede App übernimmt die Schriftgröße des Geräts. Manche Apps bieten zusätzlich eigene Einstellungen für Text oder Darstellung.",
    "sources": [
      {
        "title": "Google: Text- und Anzeigeeinstellungen",
        "url": "https://support.google.com/accessibility/android/answer/11183305?hl=de"
      }
    ],
    "theme": "gold",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Nachrichten und Menüs sind dir zu klein? Du kannst die Darstellung auf deinem Android-Smartphone an deine Augen anpassen.",
      "preparation": [
        "Nutze dein Android-Smartphone; die Menünamen können je nach Hersteller anders heißen.",
        "Eine kleine Änderung genügt für den ersten Versuch."
      ],
      "result": "Kannst du einen Text in einer häufig genutzten App bequemer lesen? Falls nicht, passe die Größe erneut an.",
      "ifStuck": "Manche Apps übernehmen die Geräteeinstellung nicht. Suche dann zusätzlich in der betreffenden App nach „Darstellung“ oder „Schriftgröße“."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "kontakte",
    "title": "Kontakte speichern",
    "subtitle": "Namen und Telefonnummern schnell griffbereit haben.",
    "category": "Kommunikation",
    "minutes": 3,
    "scope": "Android · Google Kontakte",
    "steps": [
      {
        "title": "Kontakte öffnen",
        "text": "Öffne die App „Kontakte“ von Google. Suche zuerst nach dem Namen der Person. Ist sie schon gespeichert, kannst du den vorhandenen Eintrag ergänzen.",
        "shortText": "Google Kontakte öffnen und nach der Person suchen."
      },
      {
        "title": "Einen neuen Eintrag anlegen",
        "text": "Fehlt die Person noch in der Liste? Tippe auf Plus oder „Hinzufügen“. Ist sie schon gespeichert, öffne den bestehenden Eintrag zum Bearbeiten. Wähle bei mehreren angebotenen Konten bewusst dein eigenes Konto als Speicherort.",
        "shortText": "Nur wenn sie fehlt: Plus oder „Hinzufügen“ wählen. Das eigene Konto als Speicherort prüfen."
      },
      {
        "title": "Die Angaben eintragen",
        "text": "Trage den Namen und die Telefonnummer ein. Ergänze bei Bedarf eine E-Mail-Adresse. Kontrolliere die Nummer Ziffer für Ziffer, bevor du weitermachst.",
        "shortText": "Namen und Telefonnummer eintragen. Die Nummer Ziffer für Ziffer kontrollieren."
      },
      {
        "title": "Speichern und wiederfinden",
        "text": "Tippe auf „Speichern“. Suche den Namen erneut in deiner Kontaktliste und öffne den Eintrag. Prüfe, ob die gewünschten Angaben vollständig und richtig sind.",
        "shortText": "„Speichern“ wählen und den Namen erneut suchen. Alle Angaben prüfen."
      }
    ],
    "tip": "In deinem Google-Konto gespeicherte Kontakte können auf anderen Geräten mit demselben Konto erscheinen. Merke dir daher, welches Konto du als Speicherort nutzt.",
    "sources": [
      {
        "title": "Google: Kontakte hinzufügen",
        "url": "https://support.google.com/contacts/answer/1069522?co=GENIE.Platform%3DAndroid&hl=de"
      }
    ],
    "theme": "blau",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest eine Telefonnummer unter einem Namen speichern, damit du sie später nicht wieder suchen musst.",
      "preparation": [
        "Diese Anleitung nutzt Google Kontakte auf Android.",
        "Halte Namen und Telefonnummer bereit und prüfe, ob die Person schon gespeichert ist."
      ],
      "result": "Suche den Namen erneut in Kontakte. Stimmen Telefonnummer und der gewählte Speicherort?",
      "ifStuck": "Findest du den Kontakt nicht, prüfe das ausgewählte Konto. Vermeide doppelte Einträge, indem du zuerst nach dem Namen suchst."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "apps-installieren",
    "title": "Apps installieren",
    "subtitle": "Eine passende App im Play Store finden und öffnen.",
    "category": "Geräte & Technik",
    "minutes": 4,
    "scope": "Android · Play Store mit Google-Konto eingerichtet",
    "steps": [
      {
        "title": "Den Play Store öffnen",
        "text": "Öffne die App „Play Store“ auf deinem Smartphone. Hier kannst du Apps suchen und auf deinem Gerät installieren.",
        "shortText": "Den Play Store auf dem Android-Smartphone öffnen."
      },
      {
        "title": "Gezielt suchen",
        "text": "Gib den Namen der gewünschten App in die Suche ein. Öffne den passenden Treffer und prüfe App-Name und Anbieter, damit du nicht versehentlich eine ähnlich benannte App auswählst.",
        "shortText": "Nach der gewünschten App suchen und Namen sowie Anbieter kontrollieren."
      },
      {
        "title": "Kosten und Angaben lesen",
        "text": "Lies die Beschreibung und prüfe den Preis. Achte auch auf Hinweise zu In-App-Käufen oder Abos. Eine kostenlose Installation bedeutet nicht, dass später alle Funktionen kostenlos sind.",
        "shortText": "Preis, Beschreibung, In-App-Käufe und mögliche Abos vor dem Installieren lesen."
      },
      {
        "title": "Installieren und starten",
        "text": "Tippe auf „Installieren“, wenn du die App möchtest. Steht dort ein Preis, handelt es sich um einen Kauf. Warte auf den Abschluss und tippe anschließend auf „Öffnen“.",
        "shortText": "„Installieren“ wählen und danach „Öffnen“. Ein angezeigter Preis bedeutet einen Kauf."
      }
    ],
    "tip": "Wenn eine App nicht für dein Gerät angeboten wird, installiere nicht irgendeine Ersatzdatei aus einer Nachricht. Frage im Zweifel nach, welche App gemeint ist.",
    "sources": [
      {
        "title": "Google: Apps aus dem Play Store herunterladen",
        "url": "https://support.google.com/googleplay/answer/113409?hl=de"
      },
      {
        "title": "Google: In-App-Käufe erkennen",
        "url": "https://support.google.com/googleplay/answer/1061913?hl=de"
      }
    ],
    "theme": "gruen",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest eine bestimmte App auf deinem Android-Smartphone nutzen. Wir suchen sie im Play Store und prüfen zuerst Anbieter und Kosten.",
      "preparation": [
        "Der Play Store ist mit deinem Google-Konto eingerichtet.",
        "Halte den genauen App-Namen und möglichst den Anbieter bereit."
      ],
      "result": "Erscheint nach der Installation „Öffnen“ und startet die erwartete App?",
      "ifStuck": "Wird die App nicht für dein Gerät angeboten, lade keine Ersatzdatei aus einer Nachricht. Frage nach, welche App und welcher Anbieter gemeint sind."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "google-maps",
    "title": "Google Maps",
    "subtitle": "Ein Ziel finden und den Weg dorthin planen.",
    "category": "Unterwegs",
    "minutes": 4,
    "scope": "Android · Google Maps",
    "steps": [
      {
        "title": "Das Ziel suchen",
        "text": "Öffne Google Maps und gib die Adresse oder den Namen deines Ziels in das Suchfeld ein. Prüfe den Ort und die vollständige Adresse, besonders bei ähnlichen Namen.",
        "shortText": "Google Maps öffnen, Ziel suchen und die vollständige Adresse prüfen."
      },
      {
        "title": "Die Route aufrufen",
        "text": "Tippe auf „Route“. Kontrolliere den Startpunkt. Du kannst „Mein Standort“ nutzen oder eine andere Startadresse eingeben, wenn du von dort aus planen möchtest.",
        "shortText": "„Route“ wählen und den richtigen Startpunkt kontrollieren."
      },
      {
        "title": "Die Fortbewegung wählen",
        "text": "Wähle zum Beispiel das Auto, öffentliche Verkehrsmittel oder „Zu Fuß“. Vergleiche die vorgeschlagenen Wege und die voraussichtliche Dauer.",
        "shortText": "Auto, öffentliche Verkehrsmittel oder „Zu Fuß“ passend auswählen."
      },
      {
        "title": "Den Weg ansehen",
        "text": "Schau dir die Route vor dem Losgehen in Ruhe an. Öffne bei Bedarf die einzelnen Wegschritte. Bei einem anderen Startpunkt als deinem Standort erhältst du zunächst eine Vorschau.",
        "shortText": "Route vor dem Losgehen ansehen. Vor Ort haben Beschilderung und tatsächliche Umgebung Vorrang."
      }
    ],
    "tip": "Zeitangaben sind Schätzungen. Beachte unterwegs die tatsächliche Umgebung und Beschilderung. Bediene das Smartphone nur, wenn du sicher stehst.",
    "sources": [
      {
        "title": "Google: Routen in Google Maps anzeigen",
        "url": "https://support.google.com/maps/answer/144339?co=GENIE.Platform%3DAndroid&hl=de"
      }
    ],
    "theme": "gruen",
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest vor einem Ausflug wissen, wie du dein Ziel erreichst. Wir planen den Weg zuerst in Ruhe, bevor du losgehst.",
      "preparation": [
        "Nutze Google Maps auf Android und halte eine möglichst genaue Zieladresse bereit.",
        "Bediene das Smartphone unterwegs nur, wenn du sicher stehst."
      ],
      "result": "Passen Zieladresse, Startpunkt und Fortbewegungsart zu deinem geplanten Weg?",
      "ifStuck": "Bei ähnlich benannten Orten hilft die vollständige Adresse. Für einen anderen Startpunkt als deinen Standort siehst du zunächst eine Routenvorschau."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "bluetooth",
    "title": "Bluetooth verbinden",
    "subtitle": "Kopfhörer oder Lautsprecher kabellos verbinden.",
    "category": "Geräte & Technik",
    "theme": "blau",
    "minutes": 4,
    "scope": "Android · Bluetooth-Zubehör",
    "steps": [
      {
        "title": "Das Zubehör vorbereiten",
        "text": "Schalte deine Kopfhörer oder den Lautsprecher ein und halte sie in der Nähe des Smartphones. Aktiviere den Kopplungsmodus so, wie es in der Anleitung des Zubehörs beschrieben ist.",
        "shortText": "Zubehör einschalten, in der Nähe bereithalten und laut Anleitung in den Kopplungsmodus setzen."
      },
      {
        "title": "Bluetooth öffnen",
        "text": "Wische vom oberen Displayrand nach unten und halte das Bluetooth-Symbol gedrückt. Aktiviere Bluetooth, falls es ausgeschaltet ist. Tippe auf „Neues Gerät koppeln“ oder öffne die verfügbaren Geräte.",
        "shortText": "Bluetooth am Smartphone öffnen, einschalten und nach neuen Geräten suchen."
      },
      {
        "title": "Das richtige Gerät wählen",
        "text": "Tippe auf den Namen deiner Kopfhörer oder deines Lautsprechers. Vergleiche ihn mit der Geräteanleitung. Bestätige die Kopplung nur für dein eigenes Zubehör.",
        "shortText": "Den Namen des eigenen Zubehörs prüfen und dessen Kopplung bestätigen."
      },
      {
        "title": "Die Verbindung ausprobieren",
        "text": "Warte, bis das Gerät als verbunden erscheint. Starte einen kurzen Ton bei niedriger Lautstärke. Beim nächsten Mal können sich die bereits gekoppelten Geräte automatisch verbinden.",
        "shortText": "Auf „Verbunden“ achten und einen Ton bei niedriger Lautstärke testen."
      }
    ],
    "tip": "Wird das Zubehör nicht gefunden, prüfe Kopplungsmodus und Akku. Einzelne Menünamen hängen vom Smartphone-Hersteller ab.",
    "sources": [
      {
        "title": "Google: Bluetooth-Geräte unter Android koppeln",
        "url": "https://support.google.com/android/answer/9417604?hl=de"
      }
    ],
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest Kopfhörer oder einen Lautsprecher kabellos mit deinem Smartphone verbinden. Diese erste Verbindung heißt „Koppeln“.",
      "preparation": [
        "Nutze Android und dein eigenes, ausreichend geladenes Zubehör.",
        "Halte die Zubehöranleitung bereit: Sie erklärt den Kopplungsmodus."
      ],
      "result": "Steht das Zubehör als verbunden in der Liste und hörst du einen kurzen Testton bei niedriger Lautstärke?",
      "ifStuck": "Prüfe Akku und Kopplungsmodus. Halte das Zubehör in der Nähe des Smartphones und vergleiche den Gerätenamen."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "dokumente-scannen",
    "title": "Dokumente scannen",
    "subtitle": "Einen Brief als gut lesbare PDF speichern.",
    "category": "Fotos & Dateien",
    "theme": "tuerkis",
    "minutes": 4,
    "scope": "Android · Google Drive mit Google-Konto",
    "steps": [
      {
        "title": "Die Kamera in Drive öffnen",
        "text": "Lege den Brief flach auf eine gut beleuchtete Fläche. Öffne Google Drive und tippe rechts unten auf das Kamera-Symbol. Erlaube den Kamerazugriff, wenn die App danach fragt.",
        "shortText": "Brief flach ins Licht legen. In Google Drive die Kamera öffnen und bei Bedarf Zugriff erlauben."
      },
      {
        "title": "Die Seite erfassen",
        "text": "Halte das Smartphone möglichst gerade über das Blatt. Achte darauf, dass alle Ecken innerhalb der erkannten Umrandung liegen. Warte auf die automatische Aufnahme oder löse selbst aus.",
        "shortText": "Alle Blattecken erfassen; Smartphone gerade halten und aufnehmen."
      },
      {
        "title": "Das Ergebnis prüfen",
        "text": "Kontrolliere, ob der Text scharf und vollständig ist. Passe den Zuschnitt bei Bedarf an. Über das Plus kannst du weitere Seiten aufnehmen. Gehe anschließend mit „Fertig“ weiter.",
        "shortText": "Schärfe und Ränder prüfen. Bei Bedarf weitere Seiten hinzufügen und „Fertig“ wählen."
      },
      {
        "title": "Als PDF ablegen",
        "text": "Vergib einen klaren Namen, zum Beispiel „Brief_2026-09-10“. Wähle PDF als Dateiformat und den gewünschten Drive-Ordner. Tippe auf „Speichern“ und öffne die Datei zur Kontrolle.",
        "shortText": "Einen verständlichen Dateinamen, PDF und den passenden Drive-Ordner wählen. Speichern und die Datei öffnen."
      }
    ],
    "tip": "Die Datei wird in deinem Google Drive gespeichert. Prüfe bei vertraulichen Unterlagen, ob dieser Speicherort für dich passt. Das Papieroriginal solltest du bei wichtigen Dokumenten behalten.",
    "sources": [
      {
        "title": "Google: Dokumente mit dem Mobilgerät als PDF scannen",
        "url": "https://support.google.com/a/users/answer/9308884?hl=de&co=GENIE.Platform%3DAndroid"
      }
    ],
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest einen Papierbrief als gut lesbare PDF aufbewahren. Dafür fotografieren wir ihn mit der Scan-Funktion in Google Drive.",
      "preparation": [
        "Nutze Google Drive auf Android mit deinem Google-Konto.",
        "Lege den Brief flach ins Licht. Prüfe, ob dein Drive für diese Unterlagen der passende Speicherort ist."
      ],
      "result": "Lässt sich die gespeicherte PDF öffnen, und sind alle Seiten vollständig und scharf lesbar?",
      "ifStuck": "Sind Ecken abgeschnitten oder Buchstaben unscharf, nimm die Seite erneut auf. Wichtige Papieroriginale behältst du zusätzlich."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "uebersetzen",
    "title": "Texte übersetzen",
    "subtitle": "Wörter und kurze Sätze in einer anderen Sprache verstehen.",
    "category": "Kommunikation",
    "theme": "blau",
    "minutes": 3,
    "scope": "Android · Google Übersetzer",
    "steps": [
      {
        "title": "Die Sprachen auswählen",
        "text": "Öffne die App „Google Übersetzer“. Wähle links unten die Sprache des ursprünglichen Textes und rechts unten die Sprache, in die du übersetzen möchtest, zum Beispiel Französisch → Deutsch.",
        "shortText": "Google Übersetzer öffnen und Ausgangs- sowie Zielsprache auswählen."
      },
      {
        "title": "Einen kurzen Text eingeben",
        "text": "Tippe in das Textfeld und schreibe das Wort oder den Satz. Ein vollständiger, kurzer Satz liefert mehr Zusammenhang als ein einzelnes Wort.",
        "shortText": "Einen kurzen vollständigen Satz in das Textfeld eingeben."
      },
      {
        "title": "Die Übersetzung lesen",
        "text": "Die Übersetzung erscheint meist automatisch. Falls nicht, tippe auf „Übersetzen“. Prüfe, ob die gewählte Ausgangs- und Zielsprache stimmen und ob die Aussage im Zusammenhang plausibel klingt.",
        "shortText": "Die Übersetzung lesen und Sprache sowie Zusammenhang kontrollieren."
      },
      {
        "title": "Die Aussprache anhören",
        "text": "Tippe auf das Lautsprecher-Symbol bei der Übersetzung, wenn du sie hören möchtest. Du kannst den Text ändern und dir danach die neue Übersetzung anzeigen lassen.",
        "shortText": "Bei Bedarf am Lautsprecher-Symbol die Aussprache anhören."
      }
    ],
    "tip": "Automatische Übersetzungen können sich irren. Für einen alltäglichen Satz sind sie eine Hilfe; wichtige oder verbindliche Texte solltest du zusätzlich prüfen lassen.",
    "sources": [
      {
        "title": "Google: Geschriebenen Text übersetzen und anhören",
        "url": "https://support.google.com/translate/answer/6142478?hl=de&co=GENIE.Platform%3DAndroid"
      }
    ],
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest einen kurzen fremdsprachigen Satz verstehen, zum Beispiel auf einer Speisekarte. Wir beginnen mit einem einfachen Alltagstext.",
      "preparation": [
        "Nutze Google Übersetzer auf Android.",
        "Wähle einen unvertraulichen Satz. Für verbindliche Texte brauchst du zusätzliche Prüfung."
      ],
      "result": "Stimmen Ausgangs- und Zielsprache? Passt die übersetzte Aussage zum Zusammenhang?",
      "ifStuck": "Klingt die Antwort unverständlich, prüfe die Sprachen und verwende einen vollständigen kurzen Satz statt einzelner Wörter."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "kalender",
    "title": "Termine eintragen",
    "subtitle": "Eine Verabredung im Google Kalender festhalten.",
    "category": "Organisation",
    "theme": "violett",
    "minutes": 4,
    "scope": "Android · Google Kalender mit Google-Konto",
    "steps": [
      {
        "title": "Einen Termin beginnen",
        "text": "Öffne Google Kalender. Tippe auf das Plus („Eintragen“ oder „Erstellen“) und wähle „Termin“. Kontrolliere den ausgewählten Kalender, besonders wenn du mehrere Konten nutzt.",
        "shortText": "Google Kalender öffnen, Plus und „Termin“ wählen. Den richtigen Kalender prüfen."
      },
      {
        "title": "Den Termin benennen",
        "text": "Trage einen verständlichen Titel ein, zum Beispiel „Spaziergang mit Anna“. Ergänze bei Bedarf den Treffpunkt. Für einen eigenen Merktermin brauchst du keine Gäste einzuladen.",
        "shortText": "Einen klaren Titel und bei Bedarf einen Treffpunkt eintragen. Für eigene Termine keine Gäste nötig."
      },
      {
        "title": "Datum und Uhrzeit prüfen",
        "text": "Stelle den richtigen Tag sowie Beginn und Ende ein. Deaktiviere „Ganztägig“, wenn du eine genaue Uhrzeit festhalten möchtest. Prüfe auch die angebotene Benachrichtigung.",
        "shortText": "Datum, Beginn, Ende und Benachrichtigung prüfen. „Ganztägig“ für eine genaue Uhrzeit ausschalten."
      },
      {
        "title": "Speichern und wiederfinden",
        "text": "Tippe auf „Speichern“. Öffne den betreffenden Tag und kontrolliere deinen Eintrag. Wenn etwas nicht stimmt, öffne den Termin, tippe auf das Stift-Symbol, ändere die Angaben und speichere erneut.",
        "shortText": "Speichern und den betreffenden Tag erneut öffnen. Den Eintrag kontrollieren."
      }
    ],
    "tip": "Ein Eintrag ist noch keine Einladung an andere. Gäste werden nur eingeladen, wenn du sie bewusst hinzufügst. Prüfe bei gemeinsam genutzten Kalendern, wer deine Termine sehen kann.",
    "sources": [
      {
        "title": "Google: Termine erstellen und bearbeiten",
        "url": "https://support.google.com/calendar/answer/72143?hl=de&co=GENIE.Platform%3DAndroid"
      }
    ],
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest einen Termin festhalten und später wiederfinden. Wir tragen zunächst einen Termin nur für dich selbst ein.",
      "preparation": [
        "Nutze Google Kalender auf Android mit deinem Google-Konto.",
        "Halte Datum, Uhrzeit und gegebenenfalls den Treffpunkt bereit."
      ],
      "result": "Öffne den betreffenden Tag erneut. Stimmen Termin, Uhrzeit, Kalender und die gewünschte Benachrichtigung?",
      "ifStuck": "Liegt der Termin nicht am erwarteten Ort, prüfe Datum und Kalender. Du kannst ihn am Stift-Symbol bearbeiten und erneut speichern."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "wecker",
    "title": "Wecker stellen",
    "subtitle": "Eine Weckzeit einrichten und den Ton prüfen.",
    "category": "Organisation",
    "theme": "gold",
    "minutes": 3,
    "scope": "iPhone · App „Uhr“",
    "steps": [
      {
        "title": "Die Uhr-App öffnen",
        "text": "Öffne auf deinem iPhone die App „Uhr“ und wähle „Wecker“. Tippe auf das Plus, um eine neue Weckzeit anzulegen.",
        "shortText": "„Uhr“ öffnen, „Wecker“ und Plus wählen."
      },
      {
        "title": "Uhrzeit und Tage wählen",
        "text": "Stelle die gewünschte Uhrzeit ein. Unter „Wiederholen“ kannst du bestimmte Wochentage auswählen. Gib dem Wecker bei Bedarf eine Beschreibung, damit du ihn später erkennst.",
        "shortText": "Uhrzeit und gegebenenfalls Wiederholungstage einstellen."
      },
      {
        "title": "Einen hörbaren Ton wählen",
        "text": "Wähle unter „Ton“ einen passenden Weckton. Die Lautstärke stellst du in den iPhone-Einstellungen unter „Töne & Haptik“ mit dem Regler „Klingelton- und Hinweistöne“ ein.",
        "shortText": "Weckton wählen. Die Lautstärke unter Einstellungen → Töne & Haptik prüfen."
      },
      {
        "title": "Speichern und ausprobieren",
        "text": "Bestätige den Wecker mit „Fertig“ beziehungsweise „Sichern“. Prüfe, ob er in der Liste eingeschaltet ist. Teste eine neue Einstellung zuerst mit einer Weckzeit wenige Minuten später.",
        "shortText": "Speichern, eingeschalteten Wecker kontrollieren und mit einer nahen Uhrzeit testen."
      }
    ],
    "tip": "Kontrolliere Uhrzeit, Wiederholung und Lautstärke, bevor du dich auf den Wecker verlässt. Halte dein iPhone für die Nacht ausreichend geladen.",
    "sources": [
      {
        "title": "Apple: Wecker auf dem iPhone stellen und verwalten",
        "url": "https://support.apple.com/de-de/118444"
      }
    ],
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du möchtest dich mit deinem iPhone an eine feste Uhrzeit erinnern lassen. Ein kurzer Probelauf gibt dir Sicherheit für den Alltag.",
      "preparation": [
        "Nutze die App „Uhr“ auf dem iPhone.",
        "Wähle zum Üben eine Uhrzeit wenige Minuten später und halte das Gerät geladen."
      ],
      "result": "Ist der Wecker eingeschaltet, und hörst du ihn zur Probezeit in passender Lautstärke?",
      "ifStuck": "Prüfe Uhrzeit, Wiederholung, Ton und die Lautstärke für Klingelton- und Hinweistöne. Verlasse dich erst nach einem erfolgreichen Test darauf."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "downloads",
    "title": "Downloads wiederfinden",
    "subtitle": "Eine heruntergeladene Datei auf dem Smartphone öffnen.",
    "category": "Fotos & Dateien",
    "theme": "magenta",
    "minutes": 3,
    "scope": "Android · Files by Google",
    "steps": [
      {
        "title": "Die Dateien-App öffnen",
        "text": "Öffne „Files by Google“. Unter „Zuletzt verwendet“ findest du zuletzt hinzugefügte, heruntergeladene oder geänderte Dateien. Suche dort zuerst nach deiner Datei.",
        "shortText": "Files by Google öffnen und unter „Zuletzt verwendet“ nachsehen."
      },
      {
        "title": "Die Übersicht eingrenzen",
        "text": "Schau unter „Kategorien“ nach dem passenden Dateityp, zum Beispiel Dokumenten. Über das Dreipunkt-Menü und „Sortieren nach“ kannst du die Reihenfolge nach Datum oder Dateiname ändern.",
        "shortText": "Die passende Kategorie, etwa Dokumente, wählen und bei Bedarf nach Datum sortieren."
      },
      {
        "title": "Nach dem Namen suchen",
        "text": "Wenn du die Datei noch nicht siehst, tippe oben in die Suchleiste. Gib einen Teil des Dateinamens ein. Filter für Dateityp oder Datum helfen, die Treffer weiter einzugrenzen.",
        "shortText": "Einen Teil des Dateinamens in die Suche eingeben; angebotene Filter nutzen."
      },
      {
        "title": "Die passende Datei öffnen",
        "text": "Prüfe Name und Datum und tippe auf den passenden Treffer. Bei einer PDF sollte sich eine Leseansicht öffnen. Merke dir den Dateinamen, damit du sie später leichter wiederfindest.",
        "shortText": "Name und Datum prüfen und die Datei öffnen. Den Namen fürs Wiederfinden merken."
      }
    ],
    "tip": "Andere Android-Geräte haben zusätzlich eine App namens „Dateien“ oder „Eigene Dateien“. Diese Anleitung bezieht sich auf „Files by Google“; die Menüs können anders aussehen.",
    "sources": [
      {
        "title": "Google: Dateien ansehen und sortieren",
        "url": "https://support.google.com/files/answer/9765314?hl=de"
      },
      {
        "title": "Google: Dateien suchen",
        "url": "https://support.google.com/files/answer/9765316?hl=de"
      }
    ],
    "level": "Grundlagen",
    "learning": {
      "kind": "practice",
      "why": "Du hast eine Datei heruntergeladen und findest sie nicht mehr. Wir suchen sie anhand von Dateiname und Datum auf deinem Smartphone.",
      "preparation": [
        "Diese Anleitung gilt für Files by Google auf Android.",
        "Erinnere dich an einen Teil des Dateinamens oder daran, wann du die Datei gespeichert hast."
      ],
      "result": "Öffnet sich die erwartete Datei mit dem richtigen Namen und Inhalt?",
      "ifStuck": "Andere Geräte nutzen „Dateien“ oder „Eigene Dateien“. Orientiere dich dort an Suche, Datum und Dateityp; Menüs können abweichen."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "gmail-anhaenge",
    "title": "Anhänge versenden",
    "subtitle": "Ein Foto oder eine PDF per Gmail verschicken.",
    "category": "Kommunikation",
    "theme": "rot",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Gmail-App · Android",
    "steps": [
      {
        "title": "Eine Nachricht beginnen",
        "text": "Öffne Gmail und tippe auf „Schreiben“. Trage die E-Mail-Adresse ein und beschreibe kurz, welche Datei du schicken möchtest.",
        "shortText": "Gmail öffnen und eine neue Nachricht mit Adresse und kurzem Text beginnen."
      },
      {
        "title": "Die Büroklammer antippen",
        "text": "Tippe oben auf das Symbol zum Anhängen. Wähle „Fotos“ für ein Bild oder „Dateien“ für eine gespeicherte PDF.",
        "shortText": "Die Büroklammer wählen und je nach Inhalt Fotos oder Dateien öffnen."
      },
      {
        "title": "Die Datei auswählen",
        "text": "Suche deine Datei und tippe sie an. Prüfe in der Nachricht den Dateinamen oder die Vorschau. Einen falschen Anhang entfernst du über das X daneben.",
        "shortText": "Gewünschte Datei auswählen und die Vorschau prüfen. Einen falschen Anhang am X entfernen."
      },
      {
        "title": "Prüfen und senden",
        "text": "Kontrolliere Empfänger und Anhang noch einmal. Tippe erst dann auf den Senden-Pfeil. Unter „Gesendet“ findest du deine verschickte Nachricht.",
        "shortText": "Adresse und Anhang kontrollieren, dann senden. Unter „Gesendet“ nachsehen."
      }
    ],
    "tip": "Übe zunächst mit einer unverfänglichen Datei. Sehr große Anhänge kann Gmail als Drive-Link einfügen; dabei gelten eigene Zugriffsrechte.",
    "sources": [
      {
        "title": "Google: Anhänge mit Gmail versenden",
        "url": "https://support.google.com/mail/answer/6584?hl=de&co=GENIE.Platform%3DAndroid"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Du möchtest ein Foto oder eine PDF per E-Mail schicken. Wir prüfen vor dem Senden sowohl die Datei als auch die Adresse.",
      "preparation": [
        "Nutze die Gmail-App auf Android.",
        "Halte eine unverfängliche Übungsdatei und die richtige E-Mail-Adresse bereit."
      ],
      "result": "Findest du unter „Gesendet“ die Nachricht mit der gewünschten Datei und der richtigen Adresse?",
      "ifStuck": "Ist der falsche Anhang ausgewählt, entferne ihn vor dem Senden am X. Sehr große Dateien können als Drive-Link eigene Zugriffsrechte benötigen."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "gmail-ordnen",
    "title": "Gmail aufräumen",
    "subtitle": "Erledigte E-Mails ablegen und wiederfinden.",
    "category": "Kommunikation",
    "theme": "rot",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Gmail · Computer im Webbrowser",
    "steps": [
      {
        "title": "Eine erledigte E-Mail wählen",
        "text": "Öffne Gmail und setze das Häkchen neben einer Nachricht, die du erledigt hast. Beginne zum Üben mit einer einzelnen E-Mail.",
        "shortText": "In Gmail eine erledigte E-Mail am Kästchen markieren."
      },
      {
        "title": "Archivieren auswählen",
        "text": "Klicke oben auf das Archiv-Symbol: ein Kästchen mit Pfeil nach unten. Die E-Mail verschwindet aus dem Posteingang, bleibt aber gespeichert.",
        "shortText": "Das Archiv-Symbol wählen: Kästchen mit Pfeil nach unten."
      },
      {
        "title": "Die Nachricht wiederfinden",
        "text": "Öffne links „Mehr“ und dann „Alle E-Mails“. Dort liegen auch archivierte Nachrichten. Über die Suchleiste findest du Absender oder Betreff wieder.",
        "shortText": "Unter „Mehr“ → „Alle E-Mails“ oder per Suche die Nachricht wiederfinden."
      },
      {
        "title": "Bei Bedarf zurückholen",
        "text": "Markiere die archivierte E-Mail und klicke oben auf „In Posteingang verschieben“. Antwortet jemand darauf, erscheint die Unterhaltung ebenfalls wieder im Posteingang.",
        "shortText": "Bei Bedarf markieren und „In Posteingang verschieben“ wählen."
      }
    ],
    "tip": "Archivieren schafft Übersicht, aber keinen freien Speicherplatz. Die Nachricht bleibt erhalten; du musst zum Aufräumen nichts löschen.",
    "sources": [
      {
        "title": "Google: E-Mails in Gmail archivieren",
        "url": "https://support.google.com/mail/answer/6576?hl=de"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Dein Posteingang ist voll, aber du möchtest nichts Wichtiges löschen. Archivieren räumt eine erledigte E-Mail aus dem Posteingang und bewahrt sie auf.",
      "preparation": [
        "Nutze Gmail am Computer im Browser.",
        "Wähle zum Üben nur eine einzelne, bereits erledigte Nachricht."
      ],
      "result": "Findest du die Nachricht nach dem Archivieren unter „Alle E-Mails“ oder über die Suche wieder?",
      "ifStuck": "Die E-Mail ist nicht gelöscht. Suche nach Absender oder Betreff und verschiebe sie bei Bedarf wieder in den Posteingang."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "google-meet",
    "title": "Am Videochat teilnehmen",
    "subtitle": "Mit Google Meet zu einem Gespräch dazukommen.",
    "category": "Kommunikation",
    "theme": "gruen",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Google Meet · Computer mit Kamera und Mikrofon",
    "steps": [
      {
        "title": "Den Einladungslink öffnen",
        "text": "Öffne den Meet-Link, den dir deine bekannte Kontaktperson geschickt hat. Plane beim ersten Mal ein paar Minuten Vorlauf ein.",
        "shortText": "Den erwarteten Meet-Link der bekannten Kontaktperson öffnen."
      },
      {
        "title": "Bild und Ton prüfen",
        "text": "Erlaube Kamera und Mikrofon für Meet, wenn dein Browser danach fragt. In der Vorschau kannst du Bild und Ton prüfen und das gewünschte Gerät auswählen.",
        "shortText": "In der Vorschau Kamera und Mikrofon erlauben und Bild sowie Ton prüfen."
      },
      {
        "title": "Dem Gespräch beitreten",
        "text": "Klicke auf „Jetzt teilnehmen“ oder „Teilnahme erbitten“. Ohne Anmeldung wirst du nach deinem Namen gefragt und musst gegebenenfalls auf die Freigabe warten.",
        "shortText": "„Jetzt teilnehmen“ oder „Teilnahme erbitten“ wählen. Falls nötig, auf Einlass warten."
      },
      {
        "title": "Mikrofon bewusst nutzen",
        "text": "Über das Mikrofon-Symbol schaltest du deinen Ton ein und aus. Zum Beenden klickst du auf den roten Hörer. Damit verlässt du das Gespräch.",
        "shortText": "Mikrofon bewusst ein- oder ausschalten. Mit dem roten Hörer das Gespräch verlassen."
      }
    ],
    "tip": "Ein ruhiger Platz und Kopfhörer erleichtern das Gespräch. Ob du sofort teilnehmen kannst, hängt von den Einstellungen der einladenden Person ab.",
    "sources": [
      {
        "title": "Google: An einer Meet-Videokonferenz teilnehmen",
        "url": "https://support.google.com/meet/answer/9303069?hl=de"
      },
      {
        "title": "Google: Bild und Ton vorab prüfen",
        "url": "https://support.google.com/meet/answer/10409699?hl=de"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Du möchtest an einem Videogespräch teilnehmen. Wir prüfen Bild und Ton, bevor du dem Gespräch beitrittst.",
      "preparation": [
        "Nutze einen Computer mit Kamera und Mikrofon.",
        "Öffne nur den erwarteten Link einer bekannten Kontaktperson und plane beim ersten Mal etwas Vorlauf ein."
      ],
      "result": "Bist du im Gespräch und kann die andere Person dich hören? Das Mikrofon lässt sich jederzeit ein- oder ausschalten.",
      "ifStuck": "Wartest du auf Einlass, muss die einladende Person dich eventuell zulassen. Prüfe bei Tonproblemen das ausgewählte Mikrofon und den erlaubten Zugriff."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "konto-wiederherstellen",
    "title": "Google-Zugang retten",
    "subtitle": "Was du tun kannst, wenn dein Passwort fehlt.",
    "category": "Konten",
    "theme": "blau",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Privates Google-Konto · Webbrowser",
    "steps": [
      {
        "title": "Die echte Hilfe öffnen",
        "text": "Rufe selbst accounts.google.com/signin/recovery im Browser auf. Starte nicht über einen unerwarteten Link in einer Nachricht.",
        "shortText": "accounts.google.com/signin/recovery selbst im Browser öffnen."
      },
      {
        "title": "Dein Konto angeben",
        "text": "Trage die E-Mail-Adresse deines Google-Kontos ein. Folge den angezeigten Fragen. Welche Nachweise angeboten werden, hängt von deinem Konto ab.",
        "shortText": "Die E-Mail-Adresse des betroffenen Google-Kontos angeben."
      },
      {
        "title": "Die Inhaberschaft bestätigen",
        "text": "Beantworte die Fragen so genau wie möglich. Nutze einen angebotenen Bestätigungscode nur auf der selbst geöffneten Google-Seite. Gib ihn niemandem weiter.",
        "shortText": "Die angebotenen Fragen beantworten. Codes nur auf der selbst geöffneten Google-Seite eingeben."
      },
      {
        "title": "Ein neues Passwort festlegen",
        "text": "Wenn Google dich dazu auffordert, wähle ein starkes Passwort, das du für dieses Konto noch nicht benutzt hast. Bewahre es in deinem Passwortmanager auf.",
        "shortText": "Falls angeboten, ein neues eigenes Passwort festlegen und sicher aufbewahren."
      }
    ],
    "tip": "Eine Wiederherstellung ist nicht garantiert. Google arbeitet nicht mit Diensten zusammen, die gegen Geld einen Kontozugang versprechen. Für Arbeitskonten ist die zuständige Administration der erste Kontakt.",
    "sources": [
      {
        "title": "Google: Konto oder Gmail-Zugang wiederherstellen",
        "url": "https://support.google.com/accounts/answer/7682439?hl=de"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Du kommst nicht mehr in dein privates Google-Konto. Wir nutzen die offizielle Wiederherstellung, statt einen zweiten Zugang anzulegen.",
      "preparation": [
        "Halte deine Google-E-Mail-Adresse bereit.",
        "Nutze nach Möglichkeit ein vertrautes Gerät und gib Bestätigungscodes niemandem weiter."
      ],
      "result": "Konntest du dich mit dem wiederhergestellten Zugang anmelden? Prüfe danach im Konto deine Wiederherstellungsangaben.",
      "ifStuck": "Nutze nur die offizielle Hilfe. Bei Arbeitskonten ist die zuständige Administration der richtige Kontakt; zahle keinem Dienst für ein versprochenes Entsperren."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "lesezeichen",
    "title": "Lesezeichen speichern",
    "subtitle": "Lieblingsseiten in Chrome schnell wieder öffnen.",
    "category": "Internet",
    "theme": "tuerkis",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Google Chrome · Computer",
    "steps": [
      {
        "title": "Die richtige Seite öffnen",
        "text": "Rufe die Webseite auf, die du öfter brauchst. Prüfe, ob du wirklich auf der gewünschten Seite bist, bevor du sie speicherst.",
        "shortText": "Die gewünschte Webseite öffnen und die Adresse prüfen."
      },
      {
        "title": "Den Stern anklicken",
        "text": "Klicke rechts neben der Adressleiste auf den Stern. Chrome speichert die Seite als Lesezeichen. Ein kurzer, eindeutiger Name hilft beim Wiederfinden.",
        "shortText": "Den Stern an der Adressleiste anklicken und einen verständlichen Namen vergeben."
      },
      {
        "title": "Das Lesezeichen wiederfinden",
        "text": "Öffne oben rechts das Dreipunkt-Menü. Wähle „Lesezeichen und Listen“ und dann „Lesezeichenmanager“. Dort kannst du die gespeicherte Seite auswählen.",
        "shortText": "Im Dreipunkt-Menü „Lesezeichen und Listen“ → „Lesezeichenmanager“ öffnen."
      },
      {
        "title": "Die Leiste einblenden",
        "text": "Für häufige Seiten öffne im Dreipunkt-Menü „Lesezeichen und Listen“ und aktiviere „Lesezeichenleiste anzeigen“. Die Leiste bietet schnellen Zugriff.",
        "shortText": "Für schnellen Zugriff bei Bedarf im selben Menü die Lesezeichenleiste anzeigen."
      }
    ],
    "tip": "Ein Lesezeichen speichert die Adresse, keine Kopie der Webseite. Wenn sich die Seite verändert, siehst du beim nächsten Öffnen den neuen Inhalt.",
    "sources": [
      {
        "title": "Google: Lesezeichen in Chrome verwalten",
        "url": "https://support.google.com/chrome/answer/188842?hl=de"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Du möchtest eine häufig benötigte Webseite schnell wiederfinden. Ein Lesezeichen merkt sich ihre Adresse für dich.",
      "preparation": [
        "Nutze Google Chrome am Computer.",
        "Öffne eine Webseite, deren Anbieter und Adresse du kennst."
      ],
      "result": "Kannst du die Seite über deinen gespeicherten Namen erneut öffnen?",
      "ifStuck": "Ein Lesezeichen speichert keine unveränderliche Kopie. Ein anderer Seiteninhalt kann bedeuten, dass der Anbieter die Webseite aktualisiert hat."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "benachrichtigungen",
    "title": "Weniger Benachrichtigungen",
    "subtitle": "Selbst entscheiden, welche App dich unterbricht.",
    "category": "Geräte & Technik",
    "theme": "violett",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Android · Menünamen können je nach Gerät abweichen",
    "steps": [
      {
        "title": "Die Einstellungen öffnen",
        "text": "Öffne auf deinem Smartphone die Einstellungen und wähle „Benachrichtigungen“. Suche dort nach „App-Benachrichtigungen“.",
        "shortText": "Einstellungen → Benachrichtigungen → App-Benachrichtigungen öffnen."
      },
      {
        "title": "Eine App auswählen",
        "text": "Öffne eine App, die dich häufig unterbricht. Falls sie nicht unter den letzten Apps erscheint, lasse dir alle Apps anzeigen.",
        "shortText": "Eine App auswählen, die dich häufig unterbricht."
      },
      {
        "title": "Die Hinweise anpassen",
        "text": "Schalte nicht benötigte Benachrichtigungen aus. Bietet die App einzelne Kategorien an, kannst du nur diese ändern und andere Hinweise weiterhin erhalten.",
        "shortText": "Unnötige Hinweise oder einzelne angebotene Kategorien ausschalten."
      },
      {
        "title": "Die Änderung ausprobieren",
        "text": "Nutze dein Smartphone eine Weile. Fehlt dir eine wichtige Meldung, öffne denselben Bereich erneut und schalte sie wieder ein.",
        "shortText": "Die Wirkung im Alltag prüfen. Fehlende wichtige Hinweise im selben Bereich wieder einschalten."
      }
    ],
    "tip": "Beginne mit einer App. Auch ohne Benachrichtigung können neue Inhalte in der App ankommen; du bemerkst sie dann eventuell erst beim Öffnen.",
    "sources": [
      {
        "title": "Google: Benachrichtigungen unter Android verwalten",
        "url": "https://support.google.com/android/answer/9079661?hl=de"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Dein Smartphone unterbricht dich ständig. Wir ändern zunächst die Hinweise einer einzelnen App, damit du den Unterschied gut beurteilen kannst.",
      "preparation": [
        "Nutze dein Android-Smartphone.",
        "Wähle zuerst eine App, deren Hinweise du selten brauchst."
      ],
      "result": "Ist es im Alltag ruhiger, während wichtige Nachrichten weiterhin auffallen? Beobachte die Änderung eine Weile.",
      "ifStuck": "Fehlt eine wichtige Meldung, schalte den betreffenden Hinweis im selben Menü wieder ein. Inhalte können auch ohne Benachrichtigung in der App ankommen."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "app-berechtigungen",
    "title": "App-Zugriffe prüfen",
    "subtitle": "Kamera, Mikrofon und Standort bewusst freigeben.",
    "category": "Sicherheit",
    "theme": "gold",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Android · Beispiel Google Pixel ab Android 11",
    "steps": [
      {
        "title": "Die App-Einstellungen finden",
        "text": "Öffne „Einstellungen“ und dann „Apps“. Wähle die gewünschte App; über „Alle Apps anzeigen“ findest du weitere Einträge.",
        "shortText": "Einstellungen → Apps öffnen und die betreffende App wählen."
      },
      {
        "title": "Die Berechtigungen ansehen",
        "text": "Tippe auf „Berechtigungen“. Hier siehst du, welche Zugriffe die App erhalten hat und welche du bislang nicht erlaubt hast.",
        "shortText": "Unter „Berechtigungen“ erlaubte und nicht erlaubte Zugriffe ansehen."
      },
      {
        "title": "Einen Zugriff anpassen",
        "text": "Tippe zum Beispiel auf „Standort“. Wähle, sofern angeboten, „Nur während der Nutzung der App“ oder „Nicht zulassen“. Entscheide passend zur Funktion der App.",
        "shortText": "Einen Zugriff passend zur Aufgabe anpassen, etwa den Standort nur während der Nutzung erlauben."
      },
      {
        "title": "Die App ausprobieren",
        "text": "Öffne die App erneut. Funktioniert etwas nicht mehr, kannst du denselben Zugriff gezielt wieder erlauben. Eine Kamera-App braucht zum Fotografieren Kamerazugriff.",
        "shortText": "Die App ausprobieren. Benötigte Zugriffe bei Bedarf gezielt wieder erlauben."
      }
    ],
    "tip": "Nicht jede App braucht jeden Zugriff. Prüfe den konkreten Zweck. Auswahlmöglichkeiten unterscheiden sich je nach Berechtigung, Android-Version und Hersteller.",
    "sources": [
      {
        "title": "Google: App-Berechtigungen unter Android ändern",
        "url": "https://support.google.com/android/answer/9431959?hl=de"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Eine App fragt nach Kamera, Standort oder Mikrofon. Du kannst ihre Zugriffe passend zu dem einstellen, was du mit ihr machen möchtest.",
      "preparation": [
        "Die Beispiele gelten für Google Pixel ab Android 11; andere Geräte können anders aussehen.",
        "Ändere zuerst nur einen Zugriff einer einzelnen App."
      ],
      "result": "Funktioniert die gewünschte Aufgabe noch, während unnötige Zugriffe eingeschränkt sind?",
      "ifStuck": "Fehlt eine Funktion, kannst du den nötigen Zugriff im selben Bereich wieder erlauben. Eine Kamera-App braucht zum Fotografieren Kamerazugriff."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "dateien-teilen",
    "title": "Dateien gezielt teilen",
    "subtitle": "Eine Drive-Datei für eine bestimmte Person freigeben.",
    "category": "Fotos & Dateien",
    "theme": "magenta",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Google Drive · Computer · eigene Datei",
    "steps": [
      {
        "title": "Die Datei auswählen",
        "text": "Öffne drive.google.com und wähle die Datei aus. Klicke auf „Freigeben“ oder „Teilen“. Prüfe, ob es die richtige Datei ist.",
        "shortText": "In Google Drive die richtige Datei wählen und „Freigeben“ oder „Teilen“ öffnen."
      },
      {
        "title": "Die Person eintragen",
        "text": "Gib die E-Mail-Adresse der gewünschten Person ein. Prüfe die vollständige Adresse, damit die Datei nicht bei jemand anderem landet.",
        "shortText": "Die vollständige E-Mail-Adresse der gewünschten Person prüfen und eintragen."
      },
      {
        "title": "Die Rolle festlegen",
        "text": "Wähle „Betrachter“, wenn die Person nur lesen soll. „Mitbearbeiter“ ist sinnvoll, wenn sie den Inhalt verändern darf. Lass den allgemeinen Zugriff eingeschränkt.",
        "shortText": "„Betrachter“ zum Lesen oder „Mitbearbeiter“ zum Ändern wählen. Allgemeinen Zugriff eingeschränkt lassen."
      },
      {
        "title": "Die Freigabe abschließen",
        "text": "Klicke auf „Senden“ oder „Freigeben“. Eine Benachrichtigung wird verschickt, wenn sie aktiviert ist. Im Freigabefenster kannst du später die Zugriffe kontrollieren.",
        "shortText": "Freigabe bestätigen. Anschließend Person, Rolle und vorhandene Ordnerrechte kontrollieren."
      }
    ],
    "tip": "Dateien können Zugriffsrechte ihres Ordners übernehmen. Ein direkt eingeschränkter Dateilink hebt solche bestehenden Ordnerrechte nicht auf. Prüfe deshalb auch, wo die Datei liegt.",
    "sources": [
      {
        "title": "Google: Dateien in Drive freigeben",
        "url": "https://support.google.com/drive/answer/2494822?hl=de"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Du möchtest einer bestimmten Person eine Datei zeigen, ohne sie allgemein zugänglich zu machen. Wir prüfen Person und Zugriffsrecht vor der Freigabe.",
      "preparation": [
        "Nutze Google Drive am Computer und eine eigene Datei.",
        "Prüfe bei vertraulichen Inhalten auch die Freigaben des übergeordneten Ordners."
      ],
      "result": "Zeigt das Freigabefenster die richtige Person mit der passenden Rolle? Kann sie nur das tun, was du erlauben möchtest?",
      "ifStuck": "Eine Datei kann Rechte ihres Ordners übernehmen. Eine einzelne eingeschränkte Freigabe entfernt solche bestehenden Ordnerrechte nicht."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "listen",
    "title": "Listen zum Abhaken",
    "subtitle": "Einkäufe und kleine Aufgaben mit Google Notizen sammeln.",
    "category": "Organisation",
    "theme": "schiefer",
    "level": "Grundlagen",
    "minutes": 3,
    "scope": "Google Notizen (Keep) · Computer",
    "steps": [
      {
        "title": "Google Notizen öffnen",
        "text": "Rufe keep.google.com auf und melde dich mit deinem Google-Konto an. Deine Übersicht zeigt die bereits gespeicherten Notizen.",
        "shortText": "keep.google.com öffnen und beim eigenen Konto anmelden."
      },
      {
        "title": "Eine neue Liste beginnen",
        "text": "Klicke neben „Notiz schreiben“ auf das Symbol „Neue Liste“. Gib einen klaren Titel ein, zum Beispiel „Einkauf“ oder „Für den Ausflug“.",
        "shortText": "„Neue Liste“ wählen und einen verständlichen Titel eintragen."
      },
      {
        "title": "Die Punkte eintragen",
        "text": "Schreibe jeden Artikel oder jede Aufgabe in eine eigene Zeile. Klicke auf „Fertig“, wenn deine erste Liste steht.",
        "shortText": "Jeden Punkt in eine eigene Zeile schreiben und „Fertig“ wählen."
      },
      {
        "title": "Erledigte Punkte abhaken",
        "text": "Öffne die Liste erneut und klicke auf das Kästchen neben einem erledigten Punkt. Du kannst weitere Einträge ergänzen und ihre Reihenfolge durch Ziehen ändern.",
        "shortText": "Liste erneut öffnen und erledigte Punkte an den Kästchen abhaken."
      }
    ],
    "tip": "Halte die Liste zunächst kurz. Aufgaben wie „USB-Kabel einpacken“ sind leichter abzuhaken als allgemeine Vorhaben wie „alles vorbereiten“.",
    "sources": [
      {
        "title": "Google: Listen in Google Notizen erstellen",
        "url": "https://support.google.com/keep/answer/6395451?hl=de"
      }
    ],
    "learning": {
      "kind": "practice",
      "why": "Du möchtest Einkäufe oder kleine Aufgaben im Blick behalten. Wir erstellen eine kurze Liste, die du später abhaken kannst.",
      "preparation": [
        "Nutze Google Notizen (Keep) am Computer mit deinem Google-Konto.",
        "Drei konkrete Punkte reichen zum Ausprobieren."
      ],
      "result": "Findest du deine Liste wieder, und lässt sich ein erledigter Punkt abhaken?",
      "ifStuck": "Beginne mit kleinen Aufgaben wie „USB-Kabel einpacken“. Unklare Vorhaben lassen sich schwerer abhaken."
    },
    "updatedAt": "2026-09-14"
  },
  {
    "id": "app-grundlagen",
    "title": "Was ist eine App?",
    "subtitle": "Ein Programm für eine bestimmte Aufgabe – zum Beispiel Fotos, Wetter oder Nachrichten.",
    "category": "Geräte & Technik",
    "theme": "violett",
    "scope": "Smartphone, Tablet und Computer · ohne Vorkenntnisse",
    "steps": [
      {
        "title": "Ein Helfer für eine Aufgabe",
        "text": "App ist die Kurzform von „Applikation“, also Anwendung. Gemeint ist ein Programm: Die Kamera-App macht Fotos, der Wecker erinnert dich und eine Wetter-App zeigt die Vorhersage. Apps gibt es auch auf Computern.",
        "shortText": "Eine App ist ein Programm für eine Aufgabe, etwa Fotos aufnehmen oder die Uhrzeit anzeigen."
      },
      {
        "title": "Am Symbol wiedererkennen",
        "text": "Eine App erkennst du meist an ihrem Namen und einem kleinen Bild auf dem Bildschirm. Tippe das Symbol an, um sie zu öffnen. Zurück auf dem Startbildschirm ist die App weiterhin installiert.",
        "shortText": "Name und Symbol helfen beim Wiedererkennen. Antippen öffnet die App."
      },
      {
        "title": "App und Webseite unterscheiden",
        "text": "Das Wetter kannst du in einer eigenen App oder auf einer Webseite im Browser ansehen. Eine App muss also nicht für jede Aufgabe neu installiert werden. Der Browser selbst ist ebenfalls eine App.",
        "shortText": "Eine Aufgabe kann auch auf einer Webseite möglich sein. Der Browser selbst ist eine App."
      },
      {
        "title": "Schon da oder später ergänzt",
        "text": "Viele Apps sind beim Kauf vorhanden. Weitere findest du zum Beispiel im App Store oder Google Play Store. Lies vor dem Installieren, wer die App anbietet, was sie kostet und welche Zugriffe sie verlangt.",
        "shortText": "Viele Apps sind schon da; weitere gibt es im App-Store. Vorher Anbieter, Kosten und Zugriffe prüfen."
      }
    ],
    "tip": "„Installieren“ bedeutet, eine App auf das Gerät zu holen. „Öffnen“ bedeutet, sie zu benutzen. Ein Benutzerkonto ist ein eigener Zugang und nicht dasselbe wie die App.",
    "sources": [
      {
        "title": "Google: Apps auf Android-Geräte herunterladen",
        "url": "https://support.google.com/android/answer/9457058?hl=de"
      }
    ],
    "level": "Grundlagen",
    "minutes": 3,
    "updatedAt": "2026-09-14",
    "learning": {
      "kind": "explain",
      "why": "Jemand sagt: „Öffne die App.“ Du fragst dich, was damit gemeint ist? Wir schauen auf die kleinen Helfer, die du vielleicht schon täglich nutzt.",
      "preparation": [
        "Du brauchst nichts neu zu installieren.",
        "Denke zum Beispiel an die Kamera oder den Wecker auf deinem Gerät."
      ],
      "result": "Ein Foto aufnehmen? Dafür öffnest du die Kamera-App. Eine Wetterseite ansehen? Dafür genügt der Browser.",
      "ifStuck": "Siehst du viele Symbole, suche nach einem bekannten Namen wie „Kamera“. Ein Benutzerkonto ist dagegen dein persönlicher Zugang zu einem Dienst."
    }
  },
  {
    "id": "betriebssystem",
    "title": "Was ist ein Betriebssystem?",
    "subtitle": "Die grundlegende Software, die dein Gerät und deine Apps zusammenarbeiten lässt.",
    "category": "Geräte & Technik",
    "theme": "violett",
    "scope": "Smartphone, Tablet und Computer · ohne Vorkenntnisse",
    "steps": [
      {
        "title": "Die Grundlage deines Geräts",
        "text": "Das Betriebssystem organisiert Bildschirm, Speicher und Programme. Es sorgt dafür, dass du dein Gerät bedienen und Apps ausführen kannst. Du benutzt es täglich, auch ohne seinen Namen zu kennen.",
        "shortText": "Das Betriebssystem organisiert Bildschirm, Speicher und Programme eines Geräts."
      },
      {
        "title": "Gerät, System und App",
        "text": "Ein Beispiel: Dein Smartphone ist das Gerät, Android sein Betriebssystem und WhatsApp eine App darauf. Auf einem iPhone heißt das System iOS. Bei Computern begegnen dir etwa Windows, macOS oder Linux.",
        "shortText": "Beispiel: Smartphone = Gerät, Android = System, WhatsApp = App. Das iPhone nutzt iOS."
      },
      {
        "title": "Darum sehen Anleitungen anders aus",
        "text": "Das System beeinflusst, wo Einstellungen und Schaltflächen stehen. Auch die Version und der Hersteller spielen eine Rolle. Passt ein Bildschirmbild nicht zu deinem Gerät, suche eine Anleitung für dein System.",
        "shortText": "System, Version und Hersteller beeinflussen die Menüs. Darum kann eine Anleitung anders aussehen."
      },
      {
        "title": "Aktualisierungen gehören dazu",
        "text": "Ein Update verbessert die Software und kann Sicherheitslücken schließen. System und Apps erhalten eigene Updates. Nutze dafür die Einstellungen deines Geräts oder den App-Store, statt Aufforderungen auf fremden Webseiten zu folgen.",
        "shortText": "System und Apps bekommen eigene Updates. Dafür Geräteeinstellungen oder App-Store nutzen."
      }
    ],
    "tip": "Wenn du Hilfe suchst, nenne möglichst das Gerät und das Betriebssystem. Auf Android findest du die Systemversion meist in den Einstellungen unter „Über das Telefon“ und „Android-Version“.",
    "sources": [
      {
        "title": "Google: Android-Version prüfen",
        "url": "https://support.google.com/android/answer/7680439?hl=de"
      },
      {
        "title": "BSI: Warum Softwareupdates wichtig sind",
        "url": "https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Updates-Browser-Open-Source-Software/Wichtige-Softwareupdates/wichtige-softwareupdates_node.html"
      }
    ],
    "level": "Grundlagen",
    "minutes": 3,
    "updatedAt": "2026-09-14",
    "learning": {
      "kind": "explain",
      "why": "Eine Anleitung passt nicht zu deinem Bildschirm? Oft liegt das am Betriebssystem. Hier lernst du, wie Gerät, System und App zusammengehören.",
      "preparation": [
        "Du brauchst keine Einstellungen zu verändern.",
        "Denke an ein Gerät, das du regelmäßig benutzt."
      ],
      "result": "Das Gerät ist die Technik zum Anfassen, das Betriebssystem organisiert sie, und eine App übernimmt eine bestimmte Aufgabe.",
      "ifStuck": "Du musst die Namen nicht auswendig kennen. Für Hilfe reicht zunächst der Name deines Geräts; gemeinsam lässt sich das passende System herausfinden."
    }
  },
  {
    "id": "ios-android",
    "title": "iOS und Android",
    "subtitle": "Zwei Smartphone-Systeme: Ähnliche Aufgaben, manchmal andere Wege.",
    "category": "Geräte & Technik",
    "theme": "blau",
    "scope": "iPhone und Android-Smartphone · Orientierung",
    "steps": [
      {
        "title": "Welche Namen gehören zusammen?",
        "text": "iOS ist das Betriebssystem des iPhones von Apple. Android läuft auf Smartphones verschiedener Hersteller, zum Beispiel Samsung und Google. Beides ist bereits beim Kauf des jeweiligen Geräts eingerichtet.",
        "shortText": "iOS ist das System des iPhones. Android läuft zum Beispiel auf Smartphones von Samsung oder Google."
      },
      {
        "title": "Im Alltag kannst du Ähnliches tun",
        "text": "Mit beiden Systemen kannst du telefonieren, Fotos machen, Nachrichten schreiben und Webseiten öffnen. Viele bekannte Apps gibt es für beide. Die Symbole oder Menüs können trotzdem anders aussehen.",
        "shortText": "Mit beiden kannst du telefonieren, fotografieren, Nachrichten schreiben und Webseiten öffnen."
      },
      {
        "title": "Die passende Anleitung wählen",
        "text": "Steht in einer Anleitung „iPhone“ oder „iOS“, ist sie für ein iPhone gedacht. Für ein Android-Gerät helfen oft zusätzlich Hersteller und Modell. Der Google Play Store gehört zu vielen Android-Geräten, der App Store zum iPhone.",
        "shortText": "Für die richtige Anleitung auf iPhone/iOS oder Android sowie Hersteller und Modell achten."
      },
      {
        "title": "Gemeinsam in Kontakt bleiben",
        "text": "Ihr braucht nicht dasselbe System, um euch etwa über WhatsApp Nachrichten zu schicken. Wichtig ist die passende App auf beiden Geräten. Einzelne Funktionen oder andere Dienste können sich jedoch unterscheiden.",
        "shortText": "Für Kontakte über WhatsApp braucht ihr nicht dasselbe System, sondern die passende App auf beiden Geräten."
      }
    ],
    "tip": "Du musst die Fachnamen nicht auswendig lernen. Halte den Namen deines Geräts und seines Systems fest. So findest du leichter die passende Hilfe.",
    "sources": [
      {
        "title": "Apple: iPhone-Benutzerhandbuch",
        "url": "https://support.apple.com/de-de/guide/iphone/welcome/ios"
      },
      {
        "title": "Google: Android-Version prüfen",
        "url": "https://support.google.com/android/answer/7680439?hl=de"
      }
    ],
    "level": "Grundlagen",
    "minutes": 3,
    "updatedAt": "2026-09-14",
    "learning": {
      "kind": "explain",
      "why": "Du hörst die Begriffe iOS und Android und weißt nicht, welche Anleitung zu deinem Smartphone passt. Wir ordnen die Namen ein.",
      "preparation": [
        "Du brauchst nichts umzustellen.",
        "Der Herstellername oder die Modellbezeichnung deines Smartphones hilft bei der Zuordnung."
      ],
      "result": "iOS gehört zum iPhone von Apple. Android läuft auf Smartphones verschiedener Hersteller. Für viele Alltagsaufgaben können beide ähnliche Dinge.",
      "ifStuck": "Halte den Gerätenamen fest oder zeige ihn bei einer persönlichen Hilfe. Unterschiedliche Menüs bedeuten nicht, dass du etwas falsch gemacht hast."
    }
  },
  {
    "id": "internet-grundlagen",
    "title": "Wie funktioniert das Internet?",
    "subtitle": "Viele verbundene Geräte tauschen Informationen aus – auch dein Smartphone.",
    "category": "Internet",
    "theme": "tuerkis",
    "scope": "Smartphone und Computer · ohne Vorkenntnisse",
    "steps": [
      {
        "title": "Ein weltweites Netz",
        "text": "Das Internet verbindet viele Computernetze miteinander. Darüber reisen zum Beispiel Nachrichten, Bilder und Webseiten. Ein Browser zeigt Webseiten an; das Internet ist die Verbindung dahinter.",
        "shortText": "Das Internet verbindet Computernetze; darüber werden Nachrichten, Bilder und Webseiten übertragen."
      },
      {
        "title": "So kommt dein Gerät hinein",
        "text": "Zu Hause verbindet sich dein Smartphone meist per WLAN mit dem Router. Der Router stellt über deinen Anbieter die Verbindung ins Internet her. Unterwegs nutzt ein Smartphone häufig das Mobilfunknetz und mobile Daten.",
        "shortText": "Zu Hause führt der Weg meist über WLAN und Router, unterwegs über mobile Daten."
      },
      {
        "title": "Ein Beispiel: das Wetter ansehen",
        "text": "Du öffnest eine Wetterseite. Dein Gerät fragt den Computer des Anbieters nach den Informationen. Diese kommen in kleinen Datenpaketen zurück. Der Browser setzt sie wieder zur sichtbaren Seite zusammen.",
        "shortText": "Eine Wetterseite fragt Informationen beim Anbieter ab. Der Browser stellt sie auf deinem Bildschirm dar."
      },
      {
        "title": "Verbunden heißt nicht immer online",
        "text": "Das WLAN-Zeichen zeigt zunächst die Verbindung zum WLAN. Fällt der Internetanschluss aus, kann das Zeichen trotzdem da sein. Ohne Internet funktionieren manche Dinge weiter, etwa bereits gespeicherte Fotos ansehen oder den Wecker stellen.",
        "shortText": "Das WLAN-Zeichen allein beweist keinen Internetzugang. Gespeicherte Fotos oder ein Wecker können auch offline funktionieren."
      }
    ],
    "tip": "WLAN und Internet sind nicht dasselbe. Bei Problemen hilft die Frage: Ist nur mein Gerät betroffen oder können andere Geräte im selben WLAN ebenfalls keine Webseiten öffnen?",
    "sources": [
      {
        "title": "Mozilla/MDN: Wie funktioniert das Internet?",
        "url": "https://developer.mozilla.org/de/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work"
      }
    ],
    "level": "Grundlagen",
    "minutes": 3,
    "updatedAt": "2026-09-14",
    "learning": {
      "kind": "explain",
      "why": "Eine Webseite lädt nicht, obwohl das WLAN-Zeichen da ist. Um das einzuordnen, unterscheiden wir Internet, WLAN und Browser.",
      "preparation": [
        "Du brauchst keine Kabel umzustecken oder Einstellungen zu ändern.",
        "Als Beispiel genügt eine Wetterseite, die du schon kennst."
      ],
      "result": "Das WLAN verbindet dein Gerät mit dem Router. Der Internetanschluss führt darüber hinaus; der Browser zeigt dir Webseiten an.",
      "ifStuck": "Frage bei einer Störung: Kann nur mein Gerät keine Seite öffnen oder auch ein anderes Gerät im selben WLAN nicht? Das grenzt die Ursache ein."
    }
  },
  {
    "id": "benutzerkonto",
    "title": "Was ist ein Benutzerkonto?",
    "subtitle": "Dein persönlicher Zugang, damit ein Dienst dich und deine gespeicherten Angaben erkennt.",
    "category": "Konten",
    "theme": "blau",
    "scope": "Apps und Webseiten · ohne Vorkenntnisse",
    "steps": [
      {
        "title": "Ein persönlicher Bereich",
        "text": "Ein Benutzerkonto heißt manchmal auch Account. Es ordnet dir persönliche Angaben zu, zum Beispiel deine E-Mails oder gespeicherten Termine. „Konto“ meint hier keinen Geldbetrag auf einem Bankkonto.",
        "shortText": "Ein Benutzerkonto oder Account ordnet dir persönliche Daten bei einem Anbieter zu."
      },
      {
        "title": "Dein Zugang hat einen Namen",
        "text": "Bei vielen Diensten meldest du dich mit einer E-Mail-Adresse und einem Passwort an. Manche bieten andere Anmeldewege. Die Adresse sagt, welches Konto du meinst; der zusätzliche Nachweis schützt den Zugang.",
        "shortText": "Die E-Mail-Adresse bezeichnet häufig das Konto; Passwort oder ein anderer Nachweis schützt den Zugang."
      },
      {
        "title": "Anlegen und Anmelden unterscheiden",
        "text": "„Registrieren“ oder „Konto erstellen“ legt einen neuen Zugang an. „Anmelden“ öffnet deinen vorhandenen Zugang. Nutzt du bereits Gmail, hast du ein Google-Konto. Erstelle bei vergessenen Zugangsdaten nicht vorschnell ein weiteres.",
        "shortText": "Registrieren heißt neu anlegen, Anmelden heißt vorhandenen Zugang öffnen."
      },
      {
        "title": "Gerät und Konto sind verschieden",
        "text": "Ein Online-Konto gehört zum jeweiligen Anbieter. Du kannst es oft auf mehreren Geräten verwenden. Eine App zu schließen oder zu entfernen löscht das Konto normalerweise nicht. Auf fremden Geräten meldest du dich nach der Nutzung wieder ab.",
        "shortText": "Ein Konto lässt sich oft auf mehreren Geräten nutzen. Auf fremden Geräten nach der Nutzung abmelden."
      }
    ],
    "tip": "Bewahre den Namen des Anbieters und deine Anmeldeadresse gut auf. Nutze für jedes Konto ein eigenes Passwort und speichere es in einem Passwortmanager. Teile keine Passwörter oder Bestätigungscodes.",
    "sources": [
      {
        "title": "Google: Das Google-Konto im Überblick",
        "url": "https://www.google.com/intl/de/account/about/"
      }
    ],
    "level": "Grundlagen",
    "minutes": 3,
    "updatedAt": "2026-09-14",
    "learning": {
      "kind": "explain",
      "why": "Eine App fragt nach einem Konto oder einer Anmeldung. Hier erfährst du, was dein persönlicher Zugang ist und wann du schon einen hast.",
      "preparation": [
        "Du musst zum Lesen kein neues Konto erstellen.",
        "Denke an einen Dienst, den du bereits mit deiner E-Mail-Adresse nutzt."
      ],
      "result": "„Registrieren“ erstellt einen Zugang. „Anmelden“ nutzt einen vorhandenen. Gerät, App und Benutzerkonto sind verschiedene Dinge.",
      "ifStuck": "Ist dein Passwort vergessen, suche die Wiederherstellung des bestehenden Kontos. Ein neues Konto enthält die alten Daten normalerweise nicht."
    }
  }
];
