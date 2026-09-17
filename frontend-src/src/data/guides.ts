import { Guide } from '../types';

export const ALL_GUIDES: Guide[] = [
  {
    id: 'whatsapp',
    title: 'Eine Nachricht schreiben',
    subtitle: 'Mit WhatsApp in Kontakt bleiben.',
    category: 'Kommunikation',
    theme: 'gruen',
    minutes: 3,
    updatedAt: '2026-09-12',
    scope: 'Für Android und iPhone',
    learning: {
      kind: 'step',
      why: 'WhatsApp ist der einfachste Weg, um mit Kindern, Enkeln und Freunden in Kontakt zu bleiben, ohne SMS-Gebühren zu zahlen.',
      preparation: [
        'WhatsApp auf deinem Smartphone geöffnet',
        'Die Telefonnummer deines Kontakts im Adressbuch gespeichert',
        'Eine aktive Internetverbindung (WLAN oder mobile Daten)'
      ]
    },
    steps: [
      {
        title: 'Chat öffnen',
        text: 'Tippe auf das grüne WhatsApp-Symbol auf deinem Startbildschirm. Wähle in der Chat-Übersicht den Namen der Person aus, der du schreiben möchtest, oder tippe unten rechts auf das grüne Sprechblasen-Symbol, um einen neuen Kontakt zu wählen.',
        check: 'Siehst du den Namen der Person oben und unten eine leere weiße Zeile?',
        icon: 'contact-round'
      },
      {
        title: 'Nachricht eingeben',
        text: 'Tippe unten in das weiße Textfeld mit dem Hinweistext „Nachricht schreiben“. Sofort klappt deine Tastatur auf. Tippe deinen Text ein. Fehler korrigierst du mit der Rückschritt-Taste mit dem kleinen Kreuz oben rechts auf der Tastatur.',
        check: 'Steht dein geschriebener Text im Eingabefeld?',
        icon: 'send'
      },
      {
        title: 'Foto oder Sprachnachricht beifügen (optional)',
        text: 'Möchtest du ein Foto mitsenden? Tippe auf die kleine Büroklammer (Android) oder das Plus-Zeichen (iPhone) neben dem Eingabefeld und wähle „Galerie“ oder „Fotos“. Für eine Sprachnachricht hältst du das grüne Mikrofon-Symbol gedrückt, während du sprichst.',
        check: 'Wurde das ausgewählte Foto als Vorschau angezeigt?',
        icon: 'paperclip'
      },
      {
        title: 'Absenden und Haken verstehen',
        text: 'Tippe rechts neben dem Textfeld auf den grünen Kreis mit dem kleinen Papierflieger. Deine Nachricht wird sofort versendet. Ein grauer Haken bedeutet: abgeschickt. Zwei graue Haken: auf dem Empfängergerät angekommen. Zwei blaue Haken: die Nachricht wurde geöffnet und gelesen.',
        check: 'Erscheint deine Nachricht in einer grünen Sprechblase auf der rechten Bildschirmseite?',
        icon: 'message-circle'
      }
    ],
    sources: [
      { title: 'Offizielle WhatsApp-Hilfe für Chats', url: 'https://faq.whatsapp.com/5913398998672934' }
    ]
  },
  {
    id: 'google-konto',
    title: 'Google-Konto verwalten',
    subtitle: 'Sicherheit, Daten und Einstellungen im Blick behalten.',
    category: 'Konten',
    theme: 'blau',
    minutes: 4,
    updatedAt: '2026-09-10',
    scope: 'Für Android, iPhone, iPad und Computer',
    learning: {
      kind: 'step',
      why: 'Dein Google-Konto ist der Schlüssel für Play Store, Gmail, Google Fotos und Gerätesicherungen.',
      preparation: [
        'Eingeloggt mit deinem Google-Konto',
        'Dein aktuelles Google-Passwort griffbereit'
      ]
    },
    steps: [
      {
        title: 'Kontoverwaltung öffnen',
        text: 'Öffne die App „Einstellungen“ auf deinem Android-Smartphone und tippe auf „Google“. Oder besuche im Webbrowser die Adresse myaccount.google.com und melde dich an.',
        check: 'Siehst du dein Profilbild oder deine Initialen und deine E-Mail-Adresse?',
        icon: 'search'
      },
      {
        title: 'Persönliche Daten prüfen',
        text: 'Tippe auf den Reiter „Persönliche Daten“. Hier siehst du deinen Namen, dein Geburtsdatum und die hinterlegte Telefonnummer. Prüfe, ob deine Handynummer noch aktuell ist – sie dient zur Passwortwiederherstellung!',
        check: 'Stimmt die angezeigte Telefonnummer mit deiner aktuellen Rufnummer überein?',
        icon: 'user-plus'
      },
      {
        title: 'Sicherheits-Check durchführen',
        text: 'Wechsle auf „Sicherheit“. Google bietet dir einen praktischen „Sicherheitscheck“ mit einem grünen Schild. Tippe darauf, um verdächtige Anmeldungen oder alte, nicht mehr genutzte Geräte zu entfernen.',
        check: 'Werden dir nur deine eigenen, vertrauten Geräte angezeigt?',
        icon: 'key-round'
      },
      {
        title: '2-Schritt-Verifizierung aktivieren',
        text: 'Schütze dein Konto zusätzlich mit der Bestätigung in zwei Schritten. Damit reicht ein gestohlenes Passwort Kriminellen nicht mehr aus – bei einer neuen Anmeldung erhältst du eine kurze Bestätigung auf dein Smartphone.',
        check: 'Ist der Status bei „Bestätigung in zwei Schritten“ als „Aktiv“ markiert?',
        icon: 'shield-check'
      }
    ],
    sources: [
      { title: 'Google Kontoverwaltung & Hilfe', url: 'https://support.google.com/accounts' }
    ]
  },
  {
    id: 'gmail',
    title: 'E-Mails mit Gmail schreiben & empfangen',
    subtitle: 'Wichtige Nachrichten sicher lesen und beantworten.',
    category: 'Kommunikation',
    theme: 'blau',
    minutes: 4,
    updatedAt: '2026-09-08',
    scope: 'Für Android, iPhone und Computer',
    learning: {
      kind: 'step',
      why: 'E-Mails sind der Standard für Rechnungen, Behörden und offizielle Mitteilungen. Mit Gmail behältst du den Überblick.',
      preparation: [
        'Gmail-App auf deinem Smartphone',
        'E-Mail-Adresse des Empfängers'
      ]
    },
    steps: [
      {
        title: 'Posteingang öffnen',
        text: 'Tippe auf das bunte Gmail-M-Symbol. Ungelesene Nachrichten erkennst du an der fettgedruckten Schrift. Tippe auf eine Zeile, um die ganze E-Mail zu lesen.',
        check: 'Hast du die E-Mail geöffnet und kannst den Text scrollen?',
        icon: 'mail'
      },
      {
        title: 'Neue E-Mail verfassen',
        text: 'Tippe unten rechts auf den runden Knopf „Verfassen“ (mit dem Stift-Symbol). Gib oben im Feld „An“ die genaue E-Mail-Adresse ein. Im Feld „Betreff“ schreibst du in zwei bis drei Worten, worum es geht.',
        check: 'Enthält das Betreff-Feld eine kurze Zusammenfassung deines Anliegens?',
        icon: 'type'
      },
      {
        title: 'Text schreiben und Datei anhängen',
        text: 'Tippe in das große weiße Textfeld und formuliere deine Nachricht. Wenn du ein Foto oder eine PDF-Datei mitsenden willst, tippe oben auf das Büroklammer-Symbol und wähle die Datei aus.',
        check: 'Wird der Dateianhang als kleines Kästchen unter deinem Text aufgeführt?',
        icon: 'paperclip'
      },
      {
        title: 'E-Mail senden & Rückmeldung erhalten',
        text: 'Tippe oben rechts auf den blauen Pfeil (Papierflieger), um die E-Mail abzuschicken. Unten erscheint kurz die Meldung „Gesendet“. Du kannst innerhalb von 5 Sekunden auf „Rückgängig“ tippen, falls du etwas vergessen hast.',
        check: 'Ist die Meldung „Gesendet“ erschienen und das Verfassen-Fenster geschlossen?',
        icon: 'send'
      }
    ],
    sources: [
      { title: 'Gmail Hilfeübersicht', url: 'https://support.google.com/mail' }
    ]
  },
  {
    id: 'webbrowser',
    title: 'Was ist ein Webbrowser?',
    subtitle: 'Webseiten öffnen und den Browser erkennen.',
    category: 'Internet',
    theme: 'tuerkis',
    minutes: 3,
    updatedAt: '2026-09-05',
    scope: 'Grundwissen für alle Geräte',
    learning: {
      kind: 'explain',
      why: 'Ein Webbrowser ist dein Schaufenster und Fahrzeug ins weltweite Netz. Egal ob Bahnfahrpläne, Wetterbericht oder Nachrichten – alles läuft über deinen Browser.',
      preparation: [
        'Dein Smartphone, Tablet oder Computer vor dir'
      ]
    },
    steps: [
      {
        title: 'Den Browser auf deinem Gerät erkennen',
        text: 'Auf Android-Geräten heißt der vorinstallierte Browser meist „Google Chrome“ (ein bunter Kreis in rot, gelb, grün und blau). Auf Apple-Geräten (iPhone/iPad/Mac) heißt er „Safari“ (ein blauer Kompass). Am Windows-PC heißt er oft „Microsoft Edge“ (ein blau-türkiser Wirbel).',
        check: 'Findest du eines dieser Symbole auf deinem Bildschirm?',
        icon: 'globe'
      },
      {
        title: 'Die Adresszeile oben verstehen',
        text: 'Ganz oben im Browser befindet sich eine lange Leiste. Das ist die Adresszeile. Hier kannst du entweder eine genaue Internetadresse eingeben (wie z. B. www.tagesschau.de) oder einfach ein Suchwort eintippen (wie „Wetter Berlin“).',
        check: 'Siehst du die Leiste ganz oben am Bildschirmrand?',
        icon: 'link'
      },
      {
        title: 'Sichere Verbindungen am Vorhängeschloss erkennen',
        text: 'Achte auf das kleine Schlosssymbol links in der Adresszeile. Es zeigt an, dass die Verbindung verschlüsselt ist und Daten wie Passwörter nicht unterwegs mitgelesen werden können.',
        check: 'Siehst du bei bekannten Webseiten das Schlosssymbol?',
        icon: 'search'
      },
      {
        title: 'Tabs (Registerkarten) öffnen und schließen',
        text: 'Du kannst mehrere Webseiten gleichzeitig geöffnet haben. Jede Seite liegt in einem sogenannten „Tab“ (Kartenreiter). Tippe auf das kleine Quadrat mit der Zahl darin, um alle geöffneten Seiten zu sehen und überflüssige mit dem „X“ zu schließen.',
        check: 'Kannst du die Übersicht deiner offenen Tabs aufrufen?',
        icon: 'folder-open'
      }
    ],
    sources: [
      { title: 'Bundesamt für Sicherheit in der Informationstechnik (BSI) – Sicher surfen', url: 'https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Online-surfen-aber-sicher/online-surfen-aber-sicher_node.html' }
    ]
  },
  {
    id: 'wlan',
    title: 'Mit WLAN verbinden',
    subtitle: 'Dein Gerät zu Hause ins Internet bringen.',
    category: 'Geräte & Technik',
    theme: 'violett',
    minutes: 4,
    updatedAt: '2026-09-11',
    scope: 'Für Android, iPhone, iPad und Laptops',
    learning: {
      kind: 'step',
      why: 'Im heimischen WLAN surfst du schnell, stabil und verbrauchst kein teures mobiles Datenvolumen deines Handytarifs.',
      preparation: [
        'WLAN-Name (SSID) und WLAN-Passwort (meist auf der Unterseite deines Internet-Routers aufgedruckt)',
        'In Reichweite deines Routers sein'
      ]
    },
    steps: [
      {
        title: 'WLAN-Einstellungen öffnen',
        text: 'Öffne auf deinem Smartphone die App „Einstellungen“ und tippe ganz oben auf „WLAN“ (oder „Netzwerk & Internet“). Stelle sicher, dass der WLAN-Schalter auf Ein (blau/grün) steht.',
        check: 'Wird dir eine Liste mit Namen verfügbarer Funknetzwerke angezeigt?',
        icon: 'wifi'
      },
      {
        title: 'Dein eigenes Heimnetz auswählen',
        text: 'Suche in der Liste nach dem Namen deines Routers (z. B. „FRITZ!Box 7590“ oder „Speedport“). Tippe auf den Namen deines Netzwerks.',
        check: 'Öffnet sich ein Eingabefeld für das Passwort?',
        icon: 'settings'
      },
      {
        title: 'WLAN-Schlüssel sorgfältig eintippen',
        text: 'Tippe den WLAN-Netzwerkschlüssel ein. Tipp: Aktiviere die Option „Passwort anzeigen“ (kleines Augensymbol), um Tippfehler bei langen Zahlenketten oder Groß-/Kleinschreibung sofort zu sehen.',
        check: 'Stimmt jedes Zeichen genau mit dem Aufkleber am Router überein?',
        icon: 'key-round'
      },
      {
        title: 'Verbinden und Verbindungssymbol prüfen',
        text: 'Tippe auf „Verbinden“. Nach wenigen Sekunden erscheint unter dem Namen der Hinweis „Verbunden“ und ganz oben in der Statusleiste deines Smartphones siehst du den gefüllten WLAN-Fächer.',
        check: 'Ist der WLAN-Fächer ganz oben neben der Akkuanzeige sichtbar?',
        icon: 'circle-check'
      }
    ],
    sources: [
      { title: 'AVM FRITZ!Box WLAN-Hilfe', url: 'https://avm.de/service/wlan/' }
    ]
  },
  {
    id: 'updates',
    title: 'Updates richtig installieren',
    subtitle: 'Dein Smartphone und Computer immer geschützt halten.',
    category: 'Sicherheit',
    theme: 'gold',
    minutes: 4,
    updatedAt: '2026-09-09',
    scope: 'Für alle Geräte',
    learning: {
      kind: 'step',
      why: 'Updates schließen Sicherheitslücken, bevor Betrüger sie ausnutzen können, und verbessern die Geschwindigkeit deines Geräts.',
      preparation: [
        'Smartphone zu mindestens 50 % aufgeladen oder am Ladekabel',
        'Mit einem stabilen WLAN verbunden'
      ]
    },
    steps: [
      {
        title: 'Systemeinstellungen aufrufen',
        text: 'Öffne die „Einstellungen“-App. Scrolle ganz nach unten und tippe auf „System“ oder „Systemupdate“ (bei Android) bzw. auf „Allgemein“ > „Softwareupdate“ (beim iPhone).',
        check: 'Siehst du den Bereich zur Aktualisierung des Betriebssystems?',
        icon: 'smartphone'
      },
      {
        title: 'Nach Aktualisierungen suchen',
        text: 'Dein Gerät prüft jetzt automatisch, ob ein neues Update vorliegt. Liegt ein Update bereit, siehst du die Versionsnummer und die Neuerungen.',
        check: 'Wird dir ein verfügbares Update oder die Meldung „System ist aktuell“ angezeigt?',
        icon: 'settings'
      },
      {
        title: 'Download und Installation starten',
        text: 'Tippe auf „Herunterladen und installieren“. Das Herunterladen kann je nach Internetgeschwindigkeit einige Minuten dauern. Lass das Gerät währenddessen einfach liegen.',
        check: 'Läuft der Ladebalken für das Update gleichmäßig voran?',
        icon: 'settings'
      },
      {
        title: 'Neustart abwarten',
        text: 'Sobald die Daten geladen sind, startet das Smartphone neu. Der Bildschirm wird kurz schwarz und zeigt ein Logo oder einen Fortschrittskreis. Unterbrich diesen Vorgang nicht!',
        check: 'Hat das Gerät neu gestartet und fordert deine normale PIN zur Entsperrung an?',
        icon: 'refresh-cw'
      }
    ],
    sources: [
      { title: 'BSI – Updates einspielen', url: 'https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Updates-patchen/updates-patchen_node.html' }
    ]
  },
  {
    id: 'passwoerter',
    title: 'Passwörter sicher nutzen',
    subtitle: 'Deine Zugänge besser schützen.',
    category: 'Sicherheit',
    theme: 'gold',
    minutes: 5,
    updatedAt: '2026-09-13',
    scope: 'Für alle Online-Dienste',
    learning: {
      kind: 'step',
      why: 'Sichere Passwörter verhindern, dass Kriminelle deine E-Mails lesen, in deinem Namen einkaufen oder an deine Bankdaten gelangen.',
      preparation: [
        'Etwas Ruhe zum Nachdenken',
        'Einen sicheren Notizort oder einen Passwort-Manager'
      ]
    },
    steps: [
      {
        title: 'Die Satz-Methode anwenden',
        text: 'Verwende keine einzelnen Namen oder Geburtsdaten. Bilde stattdessen einen Merksatz: „Mein Hund Bello geht jeden Tag 3 Mal spazieren!“. Nimm die Anfangsbuchstaben: „MhBgjT3Ms!“. Schon hast du ein extrem starkes Passwort mit Groß- und Kleinbuchstaben, Zahl und Sonderzeichen.',
        check: 'Besteht dein gewähltes Passwort aus mindestens 10 Zeichen und verschiedenen Zeichenarten?',
        icon: 'key-round'
      },
      {
        title: 'Niemals dasselbe Passwort doppelt nutzen',
        text: 'Die wichtigste Grundregel: Dein E-Mail-Passwort muss einzigartig sein! Wenn ein Online-Shop gehackt wird, probieren die Täter die Kombination sofort bei deiner E-Mail und bei Bezahldiensten aus.',
        check: 'Nutzt du für dein E-Mail-Postfach ein eigenes, nur dort verwendetes Passwort?',
        icon: 'shield-check'
      },
      {
        title: 'Passwort-Manager im Smartphone nutzen',
        text: 'Du musst dir nicht 30 Passwörter merken! Nutze den integrierten Passwort-Manager von Google (Android) oder den iCloud-Schlüsselbund (iPhone). Er schlägt sichere Passwörter vor und füllt sie bei der Anmeldung automatisch aus.',
        check: 'Fragt dein Smartphone beim Anmelden: „Möchten Sie das Passwort speichern?“',
        icon: 'save'
      },
      {
        title: 'Passwort-Kompromittierungen prüfen',
        text: 'Sowohl Google als auch Apple warnen dich automatisch, falls ein von dir verwendetes Passwort bei einem bekannten Datenleck im Internet aufgetaucht ist. Ändere betroffene Passwörter sofort.',
        check: 'Sind im Sicherheitsbereich deines Kontos keine roten Warnhinweise zu finden?',
        icon: 'shield-check'
      }
    ],
    sources: [
      { title: 'BSI Ratgeber: Sichere Passwörter erstellen', url: 'https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Passwoerter/passwoerter_node.html' }
    ]
  },
  {
    id: 'betrugsnachrichten',
    title: 'Verdächtige Nachrichten erkennen',
    subtitle: 'Phishing, falsche Paket-SMS und Trickbetrug entlarven.',
    category: 'Sicherheit',
    theme: 'gold',
    minutes: 4,
    updatedAt: '2026-09-14',
    scope: 'Für SMS, WhatsApp und E-Mails',
    learning: {
      kind: 'step',
      why: 'Kriminelle fälschen Absender von Banken, Paketdiensten oder geben sich als Tochter/Sohn aus („Hallo Mama, mein Handy ist kaputt“). Erkenne die Maschen sofort.',
      preparation: [
        'Gesunde Skepsis vor Eile und Geldanfragen'
      ]
    },
    steps: [
      {
        title: 'Druck und Zeitnot als Alarmsignal werten',
        text: 'Betrüger setzen dich fast immer unter Druck: „Ihr Konto wird in 24 Stunden gesperrt“, „Paket konnte nicht zugestellt werden, jetzt Zoll zahlen“ oder „Dringender Notfall“. Banken und Behörden verlangen niemals überstürzte Online-Aktionen!',
        check: 'Klingt der Text auffällig drängend oder bedrohlich?',
        icon: 'shield-alert'
      },
      {
        title: 'Links niemals leichtfertig antippen',
        text: 'Tippe niemals auf Links in unverlangten SMS oder E-Mails. Schau dir die Internetadresse genau an: Statt dhl.de steht dort oft dhl-paket-service-info.com. Wenn du unsicher bist, öffne die offizielle App des Anbieters selbst.',
        check: 'Stammt der Link von einer kryptischen Adresse mit Bindestrichen oder Zahlen?',
        icon: 'search'
      },
      {
        title: 'Die „Hallo Mama / Hallo Papa“-Masche durchschauen',
        text: 'Erreicht dich eine Nachricht von einer unbekannten Nummer: „Hallo Mama, ich habe mein Handy verloren, das ist meine neue Nummer“? Rufe die Person IMMER zuerst auf der alten, dir bekannten Nummer an oder stelle eine persönliche Kontrollfrage.',
        check: 'Hast du die Person vor einer Geldüberweisung persönlich am Telefon gesprochen?',
        icon: 'message-circle'
      },
      {
        title: 'Nachricht blockieren und löschen',
        text: 'Antworte Betrügern niemals. Tippe auf die drei Punkte oben im Chat oder die Absendernummer und wähle „Blockieren und als Spam melden“. Lösche die Nachricht anschließend.',
        check: 'Wurde der Kontakt blockiert und aus deiner Nachrichtenübersicht entfernt?',
        icon: 'shield-check'
      }
    ],
    sources: [
      { title: 'Polizeiliche Kriminalprävention – Phishing & Betrug', url: 'https://www.polizei-beratung.de/themen-und-tipps/gefahren-im-internet/e-commerce/phishing/' }
    ]
  },
  {
    id: 'fotos-sichern',
    title: 'Fotos sicher speichern',
    subtitle: 'Bilder sichern und Speicherplatz freigeben.',
    category: 'Fotos & Dateien',
    theme: 'magenta',
    minutes: 5,
    updatedAt: '2026-09-07',
    scope: 'Für Android und iPhone',
    learning: {
      kind: 'step',
      why: 'Fotos sind unersetzliche Erinnerungen. Geht das Smartphone verloren oder fällt ins Wasser, sind deine Bilder dank automatischer Sicherung in der Cloud gerettet.',
      preparation: [
        'Mit deinem Google- oder Apple-Konto angemeldet',
        'Mit einem WLAN verbunden'
      ]
    },
    steps: [
      {
        title: 'Fotos-App öffnen und Sicherungsstatus prüfen',
        text: 'Öffne „Google Fotos“ (Android) oder „Fotos“ (iPhone). Tippe oben rechts auf dein Profilbild oder Initialen. Dort siehst du den Status der Sicherung.',
        check: 'Steht dort „Sicherung abgeschlossen“ oder siehst du ein Rädchen, das gerade hochlädt?',
        icon: 'user-round'
      },
      {
        title: 'Automatische Sicherung aktivieren',
        text: 'Tippe auf „Fotos-Einstellungen“ > „Sichern & Synchronisieren“ (oder bei Apple unter „Einstellungen“ > „Fotos“ > „iCloud-Fotos“). Aktiviere den Schalter.',
        check: 'Ist der Schalter grün oder blau hinterlegt?',
        icon: 'cloud-upload'
      },
      {
        title: 'Speicherplatz auf dem Gerät freigeben',
        text: 'Wenn der interne Speicher deines Handys voll wird, tippe in Google Fotos auf „Speicherplatz freigeben“. Die App löscht nur jene Fotos vom Gerät, die bereits sicher in der Cloud liegen!',
        check: 'Wird dir angezeigt, wie viele Megabyte oder Gigabyte freigegeben werden können?',
        icon: 'hard-drive'
      },
      {
        title: 'Fotos auf neuem Gerät oder PC wiederfinden',
        text: 'Öffne auf deinem Tablet oder Computer die Webseite photos.google.com oder icloud.com und melde dich mit deinen Kontodaten an. Alle deine Fotos sind sofort sichtbar.',
        check: 'Siehst du deine Urlaubs- und Familienfotos auch am Computerbildschirm?',
        icon: 'file-check'
      }
    ],
    sources: [
      { title: 'Google Fotos Hilfebereich', url: 'https://support.google.com/photos' }
    ]
  },
  {
    id: 'qr-codes',
    title: 'QR-Codes scannen',
    subtitle: 'Speisekarten, Tickets und Webseiten mit der Kamera öffnen.',
    category: 'Unterwegs',
    theme: 'tuerkis',
    minutes: 2,
    updatedAt: '2026-09-06',
    scope: 'Für alle modernen Smartphones',
    learning: {
      kind: 'step',
      why: 'Ein QR-Code ist ein quadratisches Punktemuster, das eine Web-Adresse enthält. Du musst die lange Adresse nicht mehr mühsam abtippen.',
      preparation: [
        'Einen QR-Code in Sichtweite (z. B. auf einem Flyer, Magazin oder Speisekarte)'
      ]
    },
    steps: [
      {
        title: 'Kamera-App deines Smartphones öffnen',
        text: 'Du brauchst keine extra App! Öffne einfach die ganz normale Foto-Kamera-App deines Smartphones.',
        check: 'Siehst du das Live-Kamerabild auf deinem Display?',
        icon: 'camera'
      },
      {
        title: 'Kamera ruhig auf den Code richten',
        text: 'Halte dein Smartphone so, dass das schwarz-weiße Quadrat gut im Bildschirm zu sehen ist. Du musst kein Foto auslösen – die Kamera erkennt das Muster von selbst.',
        check: 'Erscheint nach 1–2 Sekunden ein gelber oder weißer Rahmen um den QR-Code?',
        icon: 'qr-code'
      },
      {
        title: 'Angezeigten Web-Link prüfen',
        text: 'Direkt über oder unter dem Code erscheint eine kleine gelbe oder weiße Schaltfläche mit dem Link oder dem Namen der Internetseite.',
        check: 'Erkennst du den Link und wirkt die Adresse vertrauenswürdig?',
        icon: 'search'
      },
      {
        title: 'Schaltfläche antippen und Inhalt öffnen',
        text: 'Tippe mit dem Finger auf die gelbe Schaltfläche. Dein Webbrowser öffnet sich und zeigt die Speisekarte, Fahrkarte oder Infoseite sofort an.',
        check: 'Hat sich die gewünschte Webseite geöffnet?',
        icon: 'arrow-up-right'
      }
    ],
    sources: [
      { title: 'Verbraucherzentrale – QR-Codes sicher nutzen', url: 'https://www.verbraucherzentrale.de/wissen/digitale-welt/datenschutz/qrcodes-was-sie-koennen-und-wo-die-risiken-liegen-10874' }
    ]
  },
  {
    id: 'screenshots',
    title: 'Bildschirmfoto machen',
    subtitle: 'Wichtige Anzeigen aufnehmen und speichern.',
    category: 'Geräte & Technik',
    theme: 'violett',
    minutes: 3,
    updatedAt: '2026-09-04',
    scope: 'Für Android und iPhone',
    learning: {
      kind: 'step',
      why: 'Ein Bildschirmfoto (Screenshot) speichert genau das, was du gerade siehst – ideal für Buchungsbestätigungen, Fehlermeldungen oder Rezept-Ideen.',
      preparation: [
        'Den Inhalt, den du fotografieren willst, auf dem Bildschirm anzeigen'
      ]
    },
    steps: [
      {
        title: 'Tastenkombination finden',
        text: 'Bei fast allen modernen Smartphones drückst du gleichzeitig die Ein-/Aus-Taste und die Leiser-Taste für eine halbe Sekunde. Bei älteren iPhones ist es die Ein-/Aus-Taste und der Home-Button.',
        check: 'Weißt du, wo sich die Tasten an den Seiten deines Geräts befinden?',
        icon: 'smartphone'
      },
      {
        title: 'Gleichzeitig kurz drücken',
        text: 'Drücke beide Tasten genau im selben Moment kurz und fest. Der Bildschirm blitzt kurz weiß auf und du hörst eventuell ein kurzes Klick-Geräusch wie bei einer Kamera.',
        check: 'Hat der Bildschirm kurz aufgeblitzt?',
        icon: 'camera'
      },
      {
        title: 'Vorschau unten in der Ecke antippen',
        text: 'Unten links erscheint für wenige Sekunden ein kleines Vorschaubild. Tippst du darauf, kannst du das Bild zuschneiden oder mit einem virtuellen Stift wichtige Dinge einkreisen.',
        check: 'Siehst du das kleine Vorschaubild nach dem Drücken?',
        icon: 'image'
      },
      {
        title: 'Speichern und teilen',
        text: 'Das Bildschirmfoto wird automatisch in deiner Galerie im Album „Screenshots“ abgelegt. Du kannst es direkt per WhatsApp oder E-Mail weiterleiten.',
        check: 'Findest du das Bild in deiner Fotos-App wieder?',
        icon: 'send'
      }
    ],
    sources: [
      { title: 'Android Hilfe – Screenshot erstellen', url: 'https://support.google.com/android/answer/9075928' }
    ]
  },
  {
    id: 'schriftgroesse',
    title: 'Schriftgröße anpassen',
    subtitle: 'Texte auf dem Smartphone größer und leichter lesbar machen.',
    category: 'Geräte & Technik',
    theme: 'violett',
    minutes: 2,
    updatedAt: '2026-09-03',
    scope: 'Für alle Smartphones und Tablets',
    learning: {
      kind: 'step',
      why: 'Wenn dir Texte auf dem Handy zu klein sind, kannst du die Schriftgröße für das gesamte System dauerhaft angenehm vergrößern.',
      preparation: [
        'Smartphone entsperrt vor dir'
      ]
    },
    steps: [
      {
        title: 'Einstellungen für das Display aufrufen',
        text: 'Öffne die App „Einstellungen“ und tippe auf „Display“ oder „Bedienungshilfen“ (bei Apple: „Anzeige & Helligkeit“).',
        check: 'Bist du im Einstellungsmenü für die Bildschirmanzeige?',
        icon: 'settings'
      },
      {
        title: 'Schriftgröße und Anzeigegröße wählen',
        text: 'Tippe auf den Eintrag „Schriftgröße“ oder „Textgröße“. Du siehst einen Beispieltext und darunter einen Schieberegler mit Punkten.',
        check: 'Wird dir der Schieberegler von A (klein) bis A (groß) angezeigt?',
        icon: 'type'
      },
      {
        title: 'Schieberegler nach rechts bewegen',
        text: 'Ziehe den runden Regler mit dem Finger Schritt für Schritt nach rechts. Beobachte den Beispieltext oben – er wächst sofort mit.',
        check: 'Ist der Text jetzt ohne Brille oder Anstrengung gut lesbar?',
        icon: 'sliders-horizontal'
      },
      {
        title: 'Übernahme prüfen',
        text: 'Verlasse die Einstellungen und öffne deine Nachrichten oder WhatsApp. Alle Texte und Menünamen erscheinen nun in deiner gewählten Wunschgröße.',
        check: 'Sind auch deine Chats und Kontakte deutlich größer dargestellt?',
        icon: 'circle-check'
      }
    ],
    sources: [
      { title: 'Google Barrierefreiheit – Schriftgröße', url: 'https://support.google.com/accessibility/android/answer/6006972' }
    ]
  },
  {
    id: 'kontakte',
    title: 'Kontakte anlegen und pflegen',
    subtitle: 'Telefonnummern und Adressen übersichtlich speichern.',
    category: 'Kommunikation',
    theme: 'blau',
    minutes: 4,
    updatedAt: '2026-09-02',
    scope: 'Für Android und iPhone',
    learning: {
      kind: 'step',
      why: 'Ein sauberes Adressbuch spart Suchzeit, hilft beim Telefonieren und synchronisiert sich automatisch mit WhatsApp und deinen anderen Geräten.',
      preparation: [
        'Name und Telefonnummer der Person parat haben'
      ]
    },
    steps: [
      {
        title: 'Kontakte-App öffnen',
        text: 'Öffne die App „Kontakte“ (oft ein Adressbuch-Symbol oder ein blaues Männchen-Symbol).',
        check: 'Siehst du deine alphabetische Liste bisheriger Kontakte?',
        icon: 'contact-round'
      },
      {
        title: 'Neuen Kontakt anlegen (+)',
        text: 'Tippe unten rechts oder oben auf das Plus-Symbol (+). Es öffnet sich das leere Kontaktformular.',
        check: 'Siehst du Eingabefelder für Vorname, Nachname und Telefonnummer?',
        icon: 'user-plus'
      },
      {
        title: 'Vorname, Nachname und Rufnummer eintragen',
        text: 'Tippe Vor- und Nachnamen ein. Trage die Telefonnummer am besten mit Ländervorwahl ein (z. B. +49 170 ...), damit sie auch im Auslandsurlaub oder in WhatsApp sicher funktioniert.',
        check: 'Sind Name und Telefonnummer fehlerfrei eingetragen?',
        icon: 'phone'
      },
      {
        title: 'Speicherort beachten & speichern',
        text: 'Achte darauf, dass als Speicherort dein Google-Konto oder iCloud ausgewählt ist (nicht nur die SIM-Karte). Tippe oben auf „Speichern“.',
        check: 'Erscheint der neue Name jetzt in deiner Kontaktliste?',
        icon: 'save'
      }
    ],
    sources: [
      { title: 'Google Kontakte Hilfe', url: 'https://support.google.com/contacts' }
    ]
  },
  {
    id: 'apps-installieren',
    title: 'Apps sicher herunterladen',
    subtitle: 'Aus dem Play Store oder App Store neue Programme installieren.',
    category: 'Geräte & Technik',
    theme: 'violett',
    minutes: 4,
    updatedAt: '2026-09-01',
    scope: 'Für Android (Play Store) und Apple (App Store)',
    learning: {
      kind: 'step',
      why: 'Ob DB Navigator für Zugfahrten, Wetter-App oder Online-Banking: Der offizielle App-Laden ist der sicherste Ort für neue Programme.',
      preparation: [
        'Google Play Store oder Apple App Store auf deinem Gerät',
        'Stabile WLAN-Verbindung'
      ]
    },
    steps: [
      {
        title: 'Den offiziellen Store öffnen',
        text: 'Öffne den „Google Play Store“ (buntes Dreieck) auf Android bzw. den „App Store“ (weißes A auf blauem Grund) auf dem iPhone.',
        check: 'Bist du auf der Startseite des App-Stores?',
        icon: 'download'
      },
      {
        title: 'Suchbegriff eingeben',
        text: 'Tippe oben oder unten auf die Lupe „Suchen“. Gib den Namen der gewünschten App ein, z. B. „DB Navigator“ oder „WDR aktuell“.',
        check: 'Werden dir passende Suchergebnisse mit Firmenlogo angezeigt?',
        icon: 'search'
      },
      {
        title: 'Entwickler und Bewertungen prüfen',
        text: 'Achte vor dem Laden auf den Namen des Anbieters (z. B. „Deutsche Bahn AG“ bei DB Navigator). Vermeide Nachahmer-Apps mit schlechten Bewertungen.',
        check: 'Stimmt der Herausgeber mit dem Originalanbieter überein?',
        icon: 'file-check'
      },
      {
        title: 'Installieren antippen',
        text: 'Tippe auf die Schaltfläche „Installieren“ (oder „Laden“). Die App lädt herunter und installiert sich automatisch. Anschließend findest du ihr Symbol auf deinem Startbildschirm.',
        check: 'Hat sich die Beschriftung des Knopfes zu „Öffnen“ geändert?',
        icon: 'circle-check'
      }
    ],
    sources: [
      { title: 'Google Play – Apps suchen und installieren', url: 'https://support.google.com/googleplay/answer/113410' }
    ]
  },
  {
    id: 'google-maps',
    title: 'Orientierung mit Google Maps',
    subtitle: 'Adressen suchen, Routen planen und Wege finden.',
    category: 'Unterwegs',
    theme: 'tuerkis',
    minutes: 5,
    updatedAt: '2026-08-30',
    scope: 'Für Android und iPhone',
    learning: {
      kind: 'step',
      why: 'Nie wieder verfahren oder verlaufen: Google Maps zeigt dir den besten Weg zu Fuß, mit Bus & Bahn oder mit dem Auto.',
      preparation: [
        'Standortfunktion (GPS) am Smartphone aktiviert'
      ]
    },
    steps: [
      {
        title: 'Zieladresse in die Suchleiste eingeben',
        text: 'Öffne Google Maps. Tippe ganz oben in die Suchzeile und gib die Adresse oder den Namen des Ortes ein (z. B. „Apotheke Hauptstraße“ oder „Bahnhof Mannheim“).',
        check: 'Erscheint ein roter Stecknadel-Pin am Zielort auf der Karte?',
        icon: 'search'
      },
      {
        title: 'Routen-Vorschau öffnen',
        text: 'Tippe unten auf den blauen Knopf „Route“. Maps berechnet sofort den Weg von deinem aktuellen Standort.',
        check: 'Siehst du eine blaue Linie auf der Karte, die den Weg markiert?',
        icon: 'map-pin'
      },
      {
        title: 'Verkehrsmittel auswählen',
        text: 'Wähle oben das passende Symbol: Auto, öffentliche Verkehrsmittel (Bus/Bahn), Fußgänger oder Fahrrad. Du siehst sofort die geschätzte Dauer.',
        check: 'Hast du das richtige Fortbewegungsmittel ausgewählt?',
        icon: 'footprints'
      },
      {
        title: 'Navigation starten',
        text: 'Tippe unten auf den grünen Knopf „Starten“. Dein Smartphone führt dich nun mit gesprochenen Abbiegeanweisungen Schritt für Schritt an dein Ziel.',
        check: 'Hörst du die Sprachansage und bewegt sich der Pfeil mit dir mit?',
        icon: 'route'
      }
    ],
    sources: [
      { title: 'Google Maps Hilfe und Navigation', url: 'https://support.google.com/maps' }
    ]
  },
  {
    id: 'bluetooth',
    title: 'Bluetooth-Geräte verbinden',
    subtitle: 'Kopfhörer, Lautsprecher oder Freisprechanlage koppeln.',
    category: 'Geräte & Technik',
    theme: 'violett',
    minutes: 3,
    updatedAt: '2026-08-28',
    scope: 'Für alle Smartphones und Laptops',
    learning: {
      kind: 'step',
      why: 'Kabellos Musik hören oder sicher im Auto telefonieren: Mit Bluetooth verbindest du Zubehör ohne Kabelsalat.',
      preparation: [
        'Das Zubehörteil (z. B. Kopfhörer) geladen und eingeschaltet'
      ]
    },
    steps: [
      {
        title: 'Zubehör in den Kopplungsmodus versetzen',
        text: 'Halte am Kopfhörer oder Lautsprecher die Einschalttaste für einige Sekunden gedrückt, bis eine kleine LED schnell blau/weiß blinkt oder eine Stimme „Pairing“ sagt.',
        check: 'Blinkt die Anzeige am Zubehörgerät im Kopplungsmodus?',
        icon: 'bluetooth'
      },
      {
        title: 'Bluetooth am Smartphone einschalten',
        text: 'Öffne auf deinem Smartphone „Einstellungen“ > „Bluetooth“ (oder „Verbundene Geräte“) und aktiviere Bluetooth.',
        check: 'Ist der Bluetooth-Schalter aktiv?',
        icon: 'settings'
      },
      {
        title: 'Neues Gerät in der Liste antippen',
        text: 'Tippe auf „Neues Gerät koppeln“. Dein Smartphone sucht nach Zubehör in der Nähe. Tippe auf den Namen deines Kopfhörers in der Liste.',
        check: 'Taucht der Modellname deines Kopfhörers in der Liste auf?',
        icon: 'search'
      },
      {
        title: 'Kopplung bestätigen',
        text: 'Tippe bei der Abfrage auf „Koppeln“. Das Gerät meldet „Connected“ und der Ton deines Smartphones wird nun kabellos über das Zubehör abgespielt.',
        check: 'Steht neben dem Namen der Vermerk „Verbunden“?',
        icon: 'circle-check'
      }
    ],
    sources: [
      { title: 'Bluetooth-Kopplung Android Hilfe', url: 'https://support.google.com/android/answer/9075840' }
    ]
  },
  {
    id: 'dokumente-scannen',
    title: 'Dokumente mit dem Handy scannen',
    subtitle: 'Briefe und Rechnungen als PDF fotografieren.',
    category: 'Fotos & Dateien',
    theme: 'magenta',
    minutes: 4,
    updatedAt: '2026-08-25',
    scope: 'Für Android und iPhone',
    learning: {
      kind: 'step',
      why: 'Kein sperriger Scanner nötig: Dein Smartphone schneidet Dokumente automatisch gerade zu und speichert sie als lesbare, versandfertige PDF-Datei.',
      preparation: [
        'Das Dokument flach auf einen gut beleuchteten, kontrastreichen Tisch legen'
      ]
    },
    steps: [
      {
        title: 'Scan-Funktion öffnen',
        text: 'Öffne auf Android die App „Google Drive“ und tippe unten rechts auf das Plus (+) und dann auf „Scannen“. Auf dem iPhone öffnest du die App „Notizen“, erstellst eine Notiz, tippst auf das Kamera-Symbol und wählst „Dokumente scannen“.',
        check: 'Bist du im Kamera-Modus für Dokumentenscans?',
        icon: 'camera'
      },
      {
        title: 'Kamera ruhig über das Blatt halten',
        text: 'Halte das Smartphone waagerecht über die Seite. Die Kamera erkennt die vier Kanten des Papiers automatisch mit einem blauen oder gelben Rahmen.',
        check: 'Wurde das gesamte Dokument vom Rahmen erfasst?',
        icon: 'scan-line'
      },
      {
        title: 'Zuschnitt und Lesbarkeit prüfen',
        text: 'Das Smartphone schneidet Schatten und Tischkanten weg und stellt den Text scharf und kontrastreich wie auf einer Fotokopie dar.',
        check: 'Ist der Text im Vorschaubild gestochen scharf zu lesen?',
        icon: 'file-check'
      },
      {
        title: 'Als PDF speichern oder versenden',
        text: 'Tippe auf „Speichern“. Du hast nun eine echte PDF-Datei, die du direkt per E-Mail an Versicherungen, Ämter oder Ärzte weiterleiten kannst.',
        check: 'Wurde die fertige PDF-Datei abgespeichert?',
        icon: 'save'
      }
    ],
    sources: [
      { title: 'Google Drive Hilfe – Dokumente mit Smartphone scannen', url: 'https://support.google.com/drive/answer/3145835' }
    ]
  },
  {
    id: 'uebersetzen',
    title: 'Texte und Sprache übersetzen',
    subtitle: 'Mit dem Smartphone fremde Sprachen verstehen.',
    category: 'Unterwegs',
    theme: 'tuerkis',
    minutes: 3,
    updatedAt: '2026-08-22',
    scope: 'Für Auslandsreisen und fremdsprachige Briefe',
    learning: {
      kind: 'step',
      why: 'Ob Speisekarten in Italien oder Hinweisschilder im Urlaub: Übersetze geschriebenen Text oder gesprochene Worte sekundenschnell auf Deutsch.',
      preparation: [
        'App „Google Übersetzer“ oder „Apple Übersetzen“ installiert'
      ]
    },
    steps: [
      {
        title: 'Sprachen auswählen',
        text: 'Öffne die Übersetzer-App. Wähle links die Ausgangssprache (oder „Sprache erkennen“) und rechts „Deutsch“.',
        check: 'Steht auf der rechten Seite Deutsch als Zielsprache?',
        icon: 'languages'
      },
      {
        title: 'Text tippen oder sprechen',
        text: 'Tippe einen Text ein oder tippe auf das Mikrofon-Symbol und sprich deinen Satz einfach auf Deutsch ein. Die App übersetzt sofort in die Fremdsprache.',
        check: 'Erscheint die Übersetzung im unteren Kasten?',
        icon: 'type'
      },
      {
        title: 'Kamera-Übersetzung für Schilder und Speisekarten',
        text: 'Tippe auf das Kamera-Symbol. Halte die Kamera auf einen fremdsprachigen Text. Die fremden Wörter werden wie durch Zauberhand auf dem Bildschirm durch deutsche Wörter ersetzt!',
        check: 'Siehst du den deutschen Text direkt über dem Schild eingeblendet?',
        icon: 'search'
      },
      {
        title: 'Übersetzung laut vorlesen lassen',
        text: 'Tippe auf das Lautsprecher-Symbol neben der Übersetzung. Dein Smartphone spricht den Satz mit korrekter Aussprache für dich laut aus.',
        check: 'Wird der Satz klar und verständlich vorgelesen?',
        icon: 'volume-2'
      }
    ],
    sources: [
      { title: 'Google Übersetzer Hilfeseite', url: 'https://support.google.com/translate' }
    ]
  },
  {
    id: 'kalender',
    title: 'Termine im digitalen Kalender',
    subtitle: 'Erinnerungen einrichten und Termine nicht mehr verpassen.',
    category: 'Organisation',
    theme: 'schiefer',
    minutes: 4,
    updatedAt: '2026-08-20',
    scope: 'Für Android, iPhone und PC',
    learning: {
      kind: 'step',
      why: 'Arztbesuche, Geburtstage und Müllabfuhr im Griff haben: Dein Smartphone erinnert dich rechtzeitig vor jedem Termin mit Ton.',
      preparation: [
        'Datum und Uhrzeit deines nächsten Termins'
      ]
    },
    steps: [
      {
        title: 'Kalender öffnen und Tag wählen',
        text: 'Öffne die App „Kalender“. Tippe auf den Tag im Monats- oder Wochenüberblick, an dem der Termin stattfinden soll.',
        check: 'Ist der gewünschte Tag aufgerufen?',
        icon: 'calendar-plus'
      },
      {
        title: 'Neuen Termin anlegen',
        text: 'Tippe auf das Plus-Symbol (+). Gib im obersten Feld den Titel ein (z. B. „Zahnarzt Dr. Müller“).',
        check: 'Hast du den Terminnamen eingetragen?',
        icon: 'type'
      },
      {
        title: 'Uhrzeit und Erinnerung einstellen',
        text: 'Stelle Beginn und Ende ein. Tippe auf „Benachrichtigung“ und wähle aus, wann du erinnert werden möchtest – zum Beispiel „2 Stunden vorher“ oder „1 Tag vorher“.',
        check: 'Ist eine Erinnerungszeit eingerichtet?',
        icon: 'clock-3'
      },
      {
        title: 'Termin speichern',
        text: 'Tippe oben rechts auf „Speichern“. Der Termin erscheint als farbiger Balken in deiner Übersicht und du wirst automatisch rechtzeitig benachrichtigt.',
        check: 'Siehst du den neuen Termin in deiner Kalenderansicht?',
        icon: 'save'
      }
    ],
    sources: [
      { title: 'Google Kalender Hilfe', url: 'https://support.google.com/calendar' }
    ]
  },
  {
    id: 'wecker',
    title: 'Wecker und Timer stellen',
    subtitle: 'Zur richtigen Zeit geweckt und an Aufgaben erinnert werden.',
    category: 'Organisation',
    theme: 'schiefer',
    minutes: 2,
    updatedAt: '2026-08-18',
    scope: 'Für alle Handys',
    learning: {
      kind: 'step',
      why: 'Perfekt zum Aufstehen, für das Backen im Ofen oder die pünktliche Einnahme von Medikamenten.',
      preparation: [
        'Uhr-App auf deinem Startbildschirm'
      ]
    },
    steps: [
      {
        title: 'Uhr-App öffnen und Wecker wählen',
        text: 'Öffne die App „Uhr“ und tippe unten auf den Reiter „Wecker“.',
        check: 'Bist du in der Wecker-Übersicht?',
        icon: 'alarm-clock'
      },
      {
        title: 'Weckzeit einstellen',
        text: 'Tippe auf das Plus (+) oder eine bestehende Weckzeit. Stelle Stunde und Minute mit dem Ziffernblatt oder Schieber ein.',
        check: 'Stimmt die eingestellte Weckzeit?',
        icon: 'clock-3'
      },
      {
        title: 'Wochentage und Ton festlegen',
        text: 'Wähle aus, ob der Wecker nur einmal oder montags bis freitags täglich klingeln soll. Wähle bei Bedarf einen angenehmen Weckton aus.',
        check: 'Sind die gewünschten Wochentage ausgewählt?',
        icon: 'volume-2'
      },
      {
        title: 'Wecker aktivieren',
        text: 'Tippe auf „Speichern“. Achte darauf, dass der Schiebeschalter neben der Weckzeit eingeschaltet ist. Oben in der Leiste erscheint ein kleines Wecker-Symbol.',
        check: 'Ist das Weckersymbol ganz oben in der Statusleiste sichtbar?',
        icon: 'circle-check'
      }
    ],
    sources: [
      { title: 'Google Uhr Hilfe', url: 'https://support.google.com/clock' }
    ]
  },
  {
    id: 'downloads',
    title: 'Heruntergeladene Dateien finden',
    subtitle: 'PDFs und Fahrkarten auf dem Smartphone wiederfinden.',
    category: 'Fotos & Dateien',
    theme: 'magenta',
    minutes: 3,
    updatedAt: '2026-08-15',
    scope: 'Für Android und iPhone',
    learning: {
      kind: 'step',
      why: 'Häufig lädt man eine Bahnfahrkarte, eine Rechnung oder eine Bedienungsanleitung im Browser herunter und weiß danach nicht, wo die Datei gelandet ist.',
      preparation: [
        'Eine heruntergeladene Datei auf deinem Gerät'
      ]
    },
    steps: [
      {
        title: 'Die App „Dateien“ öffnen',
        text: 'Öffne auf Android die App „Dateien“ (oder „Files by Google“). Auf dem iPhone heißt die passende App „Dateien“ mit einem blauen Ordner-Symbol.',
        check: 'Siehst du die Datei-Ordner-App auf deinem Bildschirm?',
        icon: 'folder-open'
      },
      {
        title: 'Kategorie „Downloads“ aufrufen',
        text: 'Tippe in der Übersicht auf den Ordner oder die Kategorie „Downloads“.',
        check: 'Bist du im Downloads-Verzeichnis angekommen?',
        icon: 'download'
      },
      {
        title: 'Nach Datum sortieren',
        text: 'Die neuesten Dateien stehen meist ganz oben. Anhand des Dateinamens (z. B. fahrkarte.pdf) erkennst du deine gesuchte Datei.',
        check: 'Siehst du deine zuletzt heruntergeladene Datei an oberster Stelle?',
        icon: 'file-search'
      },
      {
        title: 'Datei antippen und ansehen',
        text: 'Tippe einmal auf die Zeile. Die Datei öffnet sich sofort zum Lesen. Über die drei Punkte kannst du sie ausdrucken oder weiterleiten.',
        check: 'Konnte das Dokument erfolgreich geöffnet werden?',
        icon: 'file-text'
      }
    ],
    sources: [
      { title: 'Dateien auf Android finden – Hilfe', url: 'https://support.google.com/android/answer/9075847' }
    ]
  },
  {
    id: 'gmail-anhaenge',
    title: 'Anhänge in E-Mails öffnen & speichern',
    subtitle: 'Fotos und Dokumente sicher empfangen.',
    category: 'Kommunikation',
    theme: 'blau',
    minutes: 3,
    updatedAt: '2026-08-12',
    scope: 'Für alle E-Mail-Apps',
    learning: {
      kind: 'step',
      why: 'Arztbriefe, Rechnungen oder Familienfotos kommen oft als Anhang einer E-Mail. Lerne, wie du sie sicher öffnest.',
      preparation: [
        'Eine E-Mail mit Anhang in deinem Posteingang'
      ]
    },
    steps: [
      {
        title: 'E-Mail mit Anhang erkennen',
        text: 'E-Mails mit Anhang haben in der Übersicht meist ein kleines Büroklammer-Symbol. Öffne die Nachricht.',
        check: 'Siehst du unter dem Text rechteckige Kästchen für die angehängten Dateien?',
        icon: 'mail'
      },
      {
        title: 'Dateiendung vor dem Öffnen prüfen',
        text: 'Sichere Anhänge enden auf .pdf, .jpg, .png oder .docx. Vorsicht bei Anhängen mit .exe, .zip oder .vbs – öffne solche Dateien niemals von unbekannten Absendern!',
        check: 'Endet die Datei auf eine bekannte Dokument- oder Foto-Endung?',
        icon: 'paperclip'
      },
      {
        title: 'Anhang zur Vorschau antippen',
        text: 'Tippe auf das Vorschaubild oder den Namen des Anhangs. Das Dokument öffnet sich sicher zur Voransicht.',
        check: 'Wird der Inhalt des Dokuments angezeigt?',
        icon: 'file-check'
      },
      {
        title: 'Auf dem Smartphone dauerhaft sichern',
        text: 'Tippe oben oder neben dem Anhang auf den Pfeil nach unten (Herunterladen-Symbol). Die Datei liegt nun sicher in deinem Download-Ordner.',
        check: 'Erscheint die Meldung „Datei heruntergeladen“?',
        icon: 'send'
      }
    ],
    sources: [
      { title: 'Gmail – Anhänge anzeigen und herunterladen', url: 'https://support.google.com/mail/answer/3070160' }
    ]
  },
  {
    id: 'gmail-ordnen',
    title: 'E-Mails ordnen und löschen',
    subtitle: 'Das Postfach aufgeräumt und übersichtlich halten.',
    category: 'Kommunikation',
    theme: 'blau',
    minutes: 4,
    updatedAt: '2026-08-10',
    scope: 'Für Gmail',
    learning: {
      kind: 'step',
      why: 'Ein überfülltes Postfach sorgt für Stress und verbraucht Speicherplatz. Mit wenigen Handgriffen wird dein Posteingang wieder blitzsauber.',
      preparation: [
        'Gmail-Posteingang geöffnet'
      ]
    },
    steps: [
      {
        title: 'Überflüssige Werbemails markieren',
        text: 'Tippe links neben einer E-Mail auf das runde Absender-Symbol (oder halte die Zeile eine Sekunde gedrückt). Ein blauer Haken erscheint.',
        check: 'Wurde die E-Mail mit einem Haken markiert?',
        icon: 'mail'
      },
      {
        title: 'In den Papierkorb werfen',
        text: 'Tippe ganz oben in der Aktionsleiste auf das Mülleimer-Symbol. Die E-Mail wandert in den Papierkorb und wird nach 30 Tagen endgültig gelöscht.',
        check: 'Ist die unerwünschte Nachricht aus dem Posteingang verschwunden?',
        icon: 'archive'
      },
      {
        title: 'Suchfunktion für alte Nachrichten nutzen',
        text: 'Suche nicht manuell durch Hunderte Mails. Tippe oben auf die Lupe und gib den Namen des Absenders oder ein Stichwort ein (z. B. „Stadtwerke“).',
        check: 'Werden dir sofort alle Nachrichten zu diesem Stichwort angezeigt?',
        icon: 'search'
      },
      {
        title: 'Wichtige Nachrichten mit Stern hervorheben',
        text: 'Tippe bei Rechnungen oder Terminen auf den kleinen Stern rechts. Über das Menü „Markiert“ findest du diese wichtigen E-Mails jederzeit sofort wieder.',
        check: 'Leuchtet der Stern gelb?',
        icon: 'inbox'
      }
    ],
    sources: [
      { title: 'Gmail Posteingang organisieren', url: 'https://support.google.com/mail/answer/6579' }
    ]
  },
  {
    id: 'google-meet',
    title: 'Videoanrufe mit Google Meet',
    subtitle: 'Mit Familie und Freunden per Video sprechen.',
    category: 'Kommunikation',
    theme: 'blau',
    minutes: 4,
    updatedAt: '2026-08-08',
    scope: 'Für Computer, Android und iPad/iPhone',
    learning: {
      kind: 'step',
      why: 'Enkel beim Großwerden zuschauen oder mit weit entfernt lebenden Freunden sprechen, als säße man am selben Kaffeetisch.',
      preparation: [
        'Google-Konto vorhanden',
        'Kamera und Mikrofon am Gerät funktionsfähig'
      ]
    },
    steps: [
      {
        title: 'Google Meet aufrufen',
        text: 'Öffne die App „Meet“ auf deinem Smartphone oder öffne meet.google.com im Browser deines Computers.',
        check: 'Bist du auf der Übersichtsseite von Google Meet?',
        icon: 'link'
      },
      {
        title: 'Neues Meeting starten oder Link öffnen',
        text: 'Tippe auf „Neue Videokonferenz“ oder klicke einfach auf den Einladungslink, den dir jemand per E-Mail oder WhatsApp geschickt hat.',
        check: 'Öffnet sich das Vorbereitungsfenster mit deinem Kamerabild?',
        icon: 'video'
      },
      {
        title: 'Kamera und Mikrofon freigeben',
        text: 'Falls dein Browser fragt: Erlaube den Zugriff auf Kamera und Mikrofon. Du siehst dein eigenes Bild zur Kontrolle im Bildschirm.',
        check: 'Siehst du dich selbst klar und deutlich im Display?',
        icon: 'user-round'
      },
      {
        title: 'Dem Gespräch beitreten & sprechen',
        text: 'Tippe auf „Jetzt teilnehmen“. Während des Gesprächs kannst du mit dem Mikrofon-Knopf deinen Ton stumm schalten, wenn du nur zuhören möchtest. Mit dem roten Hörer legst du auf.',
        check: 'Siehst und hörst du die anderen Teilnehmer?',
        icon: 'mic'
      }
    ],
    sources: [
      { title: 'Google Meet Hilfebereich', url: 'https://support.google.com/meet' }
    ]
  },
  {
    id: 'konto-wiederherstellen',
    title: 'Konto wiederherstellen',
    subtitle: 'Wenn das Passwort vergessen wurde oder der Zugang blockiert ist.',
    category: 'Konten',
    theme: 'blau',
    minutes: 5,
    updatedAt: '2026-08-05',
    scope: 'Für Google-, Apple- und Mail-Konten',
    learning: {
      kind: 'step',
      why: 'Passwort vergessen? Keine Panik. Mit den richtigen Wiederherstellungs-Schritten erlangst du deinen Zugang sicher zurück.',
      preparation: [
        'Zugriff auf dein Smartphone mit deiner SIM-Karte für SMS-Codes',
        'Eventuell hinterlegte zweite E-Mail-Adresse'
      ]
    },
    steps: [
      {
        title: 'Wiederherstellungsseite aufrufen',
        text: 'Gehe auf accounts.google.com/signin/recovery (oder die Seite des jeweiligen Anbieters) und gib deine E-Mail-Adresse ein.',
        check: 'Steht auf der Seite „Kontowiederherstellung“?',
        icon: 'globe'
      },
      {
        title: '„Passwort vergessen?“ wählen',
        text: 'Tippe unter dem Passworteingabefeld auf den blauen Link „Passwort vergessen?“.',
        check: 'Fragt der Dienst nach einer alternativen Bestätigung?',
        icon: 'user-round'
      },
      {
        title: 'Bestätigungscode per SMS anfordern',
        text: 'Wähle die Option „Code an meine Telefonnummer senden“. Innerhalb von 30 Sekunden erhältst du eine SMS mit einem 6-stelligen Zahlencode (z. B. G-123456).',
        check: 'Hast du die SMS mit dem Prüfcode erhalten?',
        icon: 'shield-check'
      },
      {
        title: 'Neues, sicheres Passwort vergeben',
        text: 'Tippe den empfangenen Code ein. Anschließend darfst du ein neues, sicheres Passwort wählen. Notiere es dir an einem sicheren Ort.',
        check: 'Konnte die Anmeldung mit dem neuen Passwort erfolgreich abgeschlossen werden?',
        icon: 'key-round'
      }
    ],
    sources: [
      { title: 'Google Kontowiederherstellung Leitfaden', url: 'https://support.google.com/accounts/troubleshooter/2402620' }
    ]
  },
  {
    id: 'lesezeichen',
    title: 'Lesezeichen im Browser anlegen',
    subtitle: 'Lieblingsseiten mit einem Klick wieder aufrufen.',
    category: 'Internet',
    theme: 'tuerkis',
    minutes: 3,
    updatedAt: '2026-08-02',
    scope: 'Für Chrome, Safari und Edge',
    learning: {
      kind: 'step',
      why: 'Statt jedes Mal komplizierte Internetadressen einzutippen, legst du deine Lieblingsseiten einfach als Lesezeichen (Favoriten) ab.',
      preparation: [
        'Die gewünschte Webseite im Browser geöffnet'
      ]
    },
    steps: [
      {
        title: 'Lieblingswebseite öffnen',
        text: 'Öffne im Browser die Seite, die du speichern möchtest (z. B. deine Tageszeitung, die Mediathek oder den Wetterbericht).',
        check: 'Bist du auf der gewünschten Internetseite?',
        icon: 'globe'
      },
      {
        title: 'Lesezeichen-Stern antippen',
        text: 'Tippe oben rechts auf die drei Punkte und dann auf den Stern (bei Chrome) oder unten auf das Teilen-Symbol und dann „Lesezeichen hinzufügen“ (bei Safari).',
        check: 'Erscheint die Meldung „Lesezeichen hinzugefügt“?',
        icon: 'bookmark'
      },
      {
        title: 'Namen bei Bedarf anpassen',
        text: 'Du kannst den Text kürzen, z. B. einfach „Wetter“ statt „Wetterbericht Deutschland heute vor Ort“. Tippe auf „Speichern“.',
        check: 'Hast du einen kurzen, verständlichen Namen gewählt?',
        icon: 'folder-open'
      },
      {
        title: 'Lesezeichen-Leiste schnell öffnen',
        text: 'Tippe in Zukunft einfach auf die drei Punkte > „Lesezeichen“. Ein Fingertipp genügt und die Seite öffnet sich sofort.',
        check: 'Siehst du dein neues Lesezeichen in der Liste?',
        icon: 'mouse-pointer-2'
      }
    ],
    sources: [
      { title: 'Google Chrome – Lesezeichen verwalten', url: 'https://support.google.com/chrome/answer/188842' }
    ]
  },
  {
    id: 'benachrichtigungen',
    title: 'Benachrichtigungen einstellen',
    subtitle: 'Nur noch wichtige Töne und Meldungen erhalten.',
    category: 'Geräte & Technik',
    theme: 'violett',
    minutes: 3,
    updatedAt: '2026-07-28',
    scope: 'Für alle Smartphones',
    learning: {
      kind: 'step',
      why: 'Ständiges Piepen und Bimmeln nervt. Schalte Werbemeldungen von Spielen oder Shopping-Apps stumm, während wichtige Anrufe weiterhin klingeln.',
      preparation: [
        'Dein Smartphone zur Hand'
      ]
    },
    steps: [
      {
        title: 'Benachrichtigungs-Menü aufrufen',
        text: 'Öffne „Einstellungen“ > „Benachrichtigungen“ (oder „Apps & Benachrichtigungen“).',
        check: 'Siehst du die Liste deiner kürzlich benachrichtigten Apps?',
        icon: 'settings'
      },
      {
        title: 'App-Liste durchsehen',
        text: 'Tippe auf „App-Einstellungen“ oder „Alle Apps anzeigen“. Du siehst nun jede App mit einem Schalter.',
        check: 'Werden dir alle installierten Apps aufgelistet?',
        icon: 'bell'
      },
      {
        title: 'Unerwünschte Apps stummschalten',
        text: 'Schalte den Schalter bei Apps aus, von denen du keine Werbung oder unnötigen Töne hören willst (z. B. Spiele, Online-Shops).',
        check: 'Sind unwichtige Apps auf Grau (Aus) gestellt?',
        icon: 'sliders-horizontal'
      },
      {
        title: 'Wichtige Kanäle aktiv lassen',
        text: 'Lasse Telefon, SMS, Kalender und WhatsApp unbedingt aktiviert, damit du dringende Nachrichten und Termine weiterhin mitbekommst.',
        check: 'Bleiben wichtige Kommunikations-Apps weiterhin aktiv?',
        icon: 'circle-check'
      }
    ],
    sources: [
      { title: 'Android Benachrichtigungen steuern', url: 'https://support.google.com/android/answer/9079661' }
    ]
  },
  {
    id: 'app-berechtigungen',
    title: 'App-Berechtigungen prüfen',
    subtitle: 'Kamera, Standort und Kontakte nur gezielt freigeben.',
    category: 'Sicherheit',
    theme: 'gold',
    minutes: 4,
    updatedAt: '2026-07-24',
    scope: 'Für Android und iPhone',
    learning: {
      kind: 'step',
      why: 'Eine Taschenlampen-App braucht weder deinen Standort noch deine Kontakte. Behalte die Kontrolle über deine Privatsphäre.',
      preparation: [
        'Dein Smartphone entsperrt'
      ]
    },
    steps: [
      {
        title: 'Datenschutz-Einstellungen aufrufen',
        text: 'Öffne „Einstellungen“ > „Datenschutz“ > „Berechtigungsmanager“ (oder „Apps“ > „Berechtigungen“).',
        check: 'Siehst du Kategorien wie Kamera, Kontakte, Mikrofon und Standort?',
        icon: 'settings'
      },
      {
        title: 'Standort-Zugriff überprüfen',
        text: 'Tippe auf „Standort“. Hier siehst du, welche Apps deinen Aufenthaltsort kennen dürfen. Wähle bei Navi-Apps „Nur beim Verwenden der App“, bei anderen „Nicht zulassen“.',
        check: 'Haben nur Navigations- und Wetter-Apps Zugriff auf deinen Standort?',
        icon: 'shield-check'
      },
      {
        title: 'Kamera und Mikrofon prüfen',
        text: 'Gehe die Liste bei „Mikrofon“ und „Kamera“ durch. Nur Apps, mit denen du telefonierst oder Fotos machst, sollten hier aktiv sein.',
        check: 'Gibt es unbekannte oder verdächtige Apps mit Mikrofonzugriff?',
        icon: 'sliders-horizontal'
      },
      {
        title: 'Unnötige Berechtigungen entziehen',
        text: 'Tippe auf eine fragwürdige App und wähle „Nicht zulassen“. Die App funktioniert meist trotzdem weiter – nur ohne Daten abzugreifen.',
        check: 'Wurden überflüssige Freigaben erfolgreich entfernt?',
        icon: 'circle-check'
      }
    ],
    sources: [
      { title: 'BSI – App-Berechtigungen richtig verwalten', url: 'https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Mobil-unterwegs/Smartphones-sichern/smartphones-sichern_node.html' }
    ]
  },
  {
    id: 'dateien-teilen',
    title: 'Dateien und Fotos sicher teilen',
    subtitle: 'Fotos an Freunde senden, ohne die Qualität zu verlieren.',
    category: 'Fotos & Dateien',
    theme: 'magenta',
    minutes: 3,
    updatedAt: '2026-07-20',
    scope: 'Für alle Geräte',
    learning: {
      kind: 'step',
      why: 'WhatsApp verkleinert Fotos oft stark. Wenn du Bilder in voller Schärfe weitergeben willst, gibt es clevere Direktwege.',
      preparation: [
        'Das Foto oder die Datei in deiner Galerie ausgewählt'
      ]
    },
    steps: [
      {
        title: 'Foto auswählen und Teilen-Symbol suchen',
        text: 'Tippe das Foto in deiner Galerie an. Suche unten nach dem Teilen-Symbol (drei Punkte mit zwei Linien bei Android bzw. ein Viereck mit Pfeil nach oben bei Apple).',
        check: 'Tippst du auf das Teilen-Symbol und es öffnet sich ein Auswahlmenü?',
        icon: 'folder-open'
      },
      {
        title: 'Quick Share oder AirDrop für Personen in der Nähe',
        text: 'Steht die Person direkt neben dir? Nutze „Quick Share“ (Android/Windows) oder „AirDrop“ (Apple). Die Datei fliegt in Sekundenschnelle per Funk direkt aufs andere Gerät.',
        check: 'Wird das Gerät deiner Bekannten in der Auswahlliste angezeigt?',
        icon: 'user-plus'
      },
      {
        title: 'Link teilen für große Fotoalben',
        text: 'Möchtest du 50 Urlaubsfotos teilen? Erstelle in Google Fotos oder iCloud ein „Geteiltes Album“ und versende nur den Zugriffslink per Mail oder WhatsApp.',
        check: 'Wurde der Album-Link in deine Zwischenablage kopiert?',
        icon: 'eye'
      },
      {
        title: 'Freigabe bei Bedarf wieder aufheben',
        text: 'Du kannst den geteilten Link jederzeit wieder löschen, wenn die Empfänger die Bilder heruntergeladen haben.',
        check: 'Hast du die Kontrolle über den geteilten Ordner behalten?',
        icon: 'share-2'
      }
    ],
    sources: [
      { title: 'Google Quick Share Anleitung', url: 'https://support.google.com/android/answer/9286773' }
    ]
  },
  {
    id: 'listen',
    title: 'Digitale Notizen & Einkaufslisten',
    subtitle: 'Erledigungen und Einkäufe bequem abhaken.',
    category: 'Organisation',
    theme: 'schiefer',
    minutes: 3,
    updatedAt: '2026-07-15',
    scope: 'Für Google Notizen, Apple Notizen & Co.',
    learning: {
      kind: 'step',
      why: 'Kein verlorener Zettel mehr im Supermarkt: Schreibe Einkäufe aufs Smartphone und hake erledigte Dinge mit einem Fingertipp ab.',
      preparation: [
        'App „Google Notizen“ (gelbes Notizblatt) oder Apple „Notizen“'
      ]
    },
    steps: [
      {
        title: 'Notizen-App öffnen',
        text: 'Öffne die App „Google Notizen“ auf Android oder „Notizen“ auf dem iPhone.',
        check: 'Bist du in der Notizen-Übersicht?',
        icon: 'list-checks'
      },
      {
        title: 'Neue Häkchen-Liste anlegen',
        text: 'Tippe unten auf das kleine Kästchen-Symbol mit dem Häkchen (Neue Checkliste). Gib oben einen Titel ein, z. B. „Einkauf Samstag“.',
        check: 'Siehst du eine Zeile mit einem leeren quadratischen Kontrollkästchen davor?',
        icon: 'plus'
      },
      {
        title: 'Einträge aufschreiben',
        text: 'Tippe deinen ersten Artikel ein (z. B. „Milch“) und drücke auf der Tastatur auf Enter (neue Zeile). Es erscheint automatisch das nächste Kästchen („Äpfel“, „Brot“ usw.).',
        check: 'Hast du deine Einkaufsliste vollständig eingetippt?',
        icon: 'type'
      },
      {
        title: 'Im Laden mit einem Tipp abhaken',
        text: 'Im Supermarkt tippst du einfach auf das Kästchen neben der Milch. Der Eintrag wird durchgestrichen und rutscht nach unten in den Bereich „Erledigt“.',
        check: 'Hakt sich der Eintrag sauber ab und bleibt übersichtlich?',
        icon: 'circle-check'
      }
    ],
    sources: [
      { title: 'Google Notizen Hilfe', url: 'https://support.google.com/keep' }
    ]
  },
  // Foundations:
  {
    id: 'app-grundlagen',
    title: 'Was ist eine App?',
    subtitle: 'Kleine Programme, die dir im Alltag helfen.',
    category: 'Geräte & Technik',
    theme: 'blau',
    minutes: 3,
    updatedAt: '2026-07-10',
    scope: 'Grundlagenwissen',
    learning: {
      kind: 'explain',
      why: 'Das Wort „App“ ist die Abkürzung für das englische Wort „Application“, was Anwendung oder Programm bedeutet. Apps sind kleine Werkzeuge auf deinem Smartphone.',
      preparation: [
        'Blick auf deinen Smartphone-Bildschirm'
      ]
    },
    steps: [
      {
        title: 'Die bunten Symbole verstehen',
        text: 'Jedes bunte Kästchen auf deinem Startbildschirm ist eine App. Es gibt Apps für fast jeden Zweck: Fahrpläne, Wetterberichte, Fotobearbeitung oder Spiele.',
        check: 'Erkennst du, dass WhatsApp, Kalender und Rechner jeweils eigene Apps sind?',
        icon: 'lightbulb'
      },
      {
        title: 'Vorinstallierte und nachladbare Apps',
        text: 'Einige Apps waren schon beim Kauf auf dem Gerät (wie Telefon und Kamera). Viele weitere praktische Apps kannst du dir nach Bedarf kostenlos oder gegen Bezahlung aus dem App-Store laden.',
        check: 'Weißt du, welche Apps du am häufigsten im Alltag nutzt?',
        icon: 'mouse-pointer-2'
      },
      {
        title: 'Wie Apps ins Internet gehen',
        text: 'Die meisten Apps holen sich ihre Informationen über das Internet (WLAN oder mobile Daten). Ein digitaler Fahrplan zeigt deshalb immer minutengenau an, ob der Zug pünktlich ist.',
        check: 'Verstehst du, warum manche Apps eine Internetverbindung benötigen?',
        icon: 'globe'
      },
      {
        title: 'Apps beenden und Ordnung halten',
        text: 'Apps verbrauchen nur wenig Strom, wenn sie im Hintergrund liegen. Du musst sie nicht ständig mühsam schließen. Nicht mehr gebrauchte Apps löschst du einfach durch langes Gedrückthalten.',
        check: 'Weißt du, wie du eine App vom Bildschirm entfernst?',
        icon: 'download'
      }
    ],
    sources: [
      { title: 'Bundeszentrale für politische Bildung – Smartphone-Apps erklärt', url: 'https://www.bpb.de' }
    ]
  },
  {
    id: 'betriebssystem',
    title: 'Was ist ein Betriebssystem?',
    subtitle: 'Die Grundlage, auf der dein Gerät arbeitet.',
    category: 'Geräte & Technik',
    theme: 'blau',
    minutes: 3,
    updatedAt: '2026-07-08',
    scope: 'Grundlagenwissen',
    learning: {
      kind: 'explain',
      why: 'Das Betriebssystem ist wie der Dirigent in einem Orchester. Es sorgt dafür, dass Bildschirm, Tasten, Akku, Lautsprecher und Apps harmonisch zusammenarbeiten.',
      preparation: [
        'Interesse an der Technik deines Geräts'
      ]
    },
    steps: [
      {
        title: 'Die Hauptaufgabe des Betriebssystems',
        text: 'Ohne Betriebssystem wäre dein Smartphone nur ein toter Haufen aus Glas, Metall und Chips. Das System übersetzt deine Fingertipps in elektrische Befehle und startet deine gewünschten Programme.',
        check: 'Ist dir klar, dass das Betriebssystem die Basis für alles andere ist?',
        icon: 'monitor'
      },
      {
        title: 'Die zwei großen Welten auf Smartphones',
        text: 'Auf Smartphones gibt es zwei dominierende Systeme: „Android“ (entwickelt von Google, genutzt von Samsung, Xiaomi, Motorola etc.) und „iOS“ (exklusiv auf Apple iPhones).',
        check: 'Weißt du, ob du ein Android-Gerät oder ein iPhone besitzt?',
        icon: 'smartphone'
      },
      {
        title: 'Die Systeme auf Computern',
        text: 'Auf Laptops und Desktop-Computern heißt das bekannteste Betriebssystem „Microsoft Windows“. Apple-Computer nutzen „macOS“.',
        check: 'Erkennst du den Unterschied zwischen Smartphone- und PC-Systemen?',
        icon: 'search'
      },
      {
        title: 'Warum das System regelmäßig erneuert werden muss',
        text: 'Mit Betriebssystem-Updates erhält dein Gerät neue Funktionen, wird schneller und vor allem gegen neu entdeckte Sicherheitslücken geschützt.',
        check: 'Führst du empfohlene System-Updates gewissenhaft durch?',
        icon: 'refresh-cw'
      }
    ],
    sources: [
      { title: 'BSI – Das Betriebssystem einfach erklärt', url: 'https://www.bsi.bund.de' }
    ]
  },
  {
    id: 'ios-android',
    title: 'Was ist der Unterschied zwischen iOS und Android?',
    subtitle: 'Zwei Smartphone-Systeme einfach unterscheiden.',
    category: 'Geräte & Technik',
    theme: 'blau',
    minutes: 3,
    updatedAt: '2026-07-05',
    scope: 'Grundlagenwissen',
    learning: {
      kind: 'explain',
      why: 'Wenn Freunde oder Familie dir beim Handy helfen wollen, fragen sie fast immer: „Hast du Android oder ein iPhone?“. Hier erfährst du, was das bedeutet.',
      preparation: [
        'Dein eigenes Smartphone ansehen'
      ]
    },
    steps: [
      {
        title: 'Android: Riesige Auswahl und Offenheit',
        text: 'Android gehört Google. Fast alle Smartphone-Hersteller (außer Apple) nutzen Android. Du hast eine riesige Auswahl an Geräten in allen Preisklassen – von 100 Euro bis über 1000 Euro.',
        check: 'Hat dein Smartphone ein Herstellerlogo wie Samsung, Google, Xiaomi oder Nokia auf der Rückseite?',
        icon: 'smartphone'
      },
      {
        title: 'iOS: Exklusiv, abgestimmt und einheitlich',
        text: 'iOS läuft ausschließlich auf dem iPhone von Apple. Hardware und Software kommen aus einer Hand. Die Bedienung ist auf allen iPhones nahezu identisch und sehr übersichtlich.',
        check: 'Hat dein Gerät einen angebissenen Apfel auf der Rückseite?',
        icon: 'message-circle'
      },
      {
        title: 'Die App-Läden unterscheiden',
        text: 'Bei Android lädst du Apps aus dem „Google Play Store“. Beim iPhone lädst du Apps aus dem „Apple App Store“. Die meisten beliebten Apps (WhatsApp, Bahn, Sparkasse) gibt es für beide Systeme.',
        check: 'Heißt dein App-Laden Play Store oder App Store?',
        icon: 'search'
      },
      {
        title: 'Zusammenarbeit im Alltag',
        text: 'Egal ob deine Freunde Android oder iPhone haben: Ihr könnt problemlos miteinander telefonieren, WhatsApp-Nachrichten austauschen und Fotos teilen.',
        check: 'Weißt du jetzt sicher, welches System du nutzt?',
        icon: 'send'
      }
    ],
    sources: [
      { title: 'Stiftung Warentest – Smartphone-Systeme im Vergleich', url: 'https://www.test.de' }
    ]
  },
  {
    id: 'internet-grundlagen',
    title: 'Wie funktioniert das Internet?',
    subtitle: 'Wie dein Gerät mit der Welt verbunden ist.',
    category: 'Internet',
    theme: 'tuerkis',
    minutes: 3,
    updatedAt: '2026-07-01',
    scope: 'Grundlagenwissen',
    learning: {
      kind: 'explain',
      why: 'Das Internet ist kein geheimnisvoller Zauberkasten, sondern ein weltumspannendes Netz aus Computern und Kabeln, die miteinander Daten austauschen.',
      preparation: [
        'Neugierde auf die Funktionsweise'
      ]
    },
    steps: [
      {
        title: 'Das weltweite Netz der Computer',
        text: 'Wenn du eine Internetseite aufrufst, schickt dein Smartphone eine Anfrage an einen Computer irgendwo auf der Welt (einen sogenannten „Server“). Dieser schickt die Seite in Bruchteilen einer Sekunde an dich zurück.',
        check: 'Verstehst du das Prinzip von Frage und Antwort im Netz?',
        icon: 'globe'
      },
      {
        title: 'Die Brücke zu Hause: Dein WLAN-Router',
        text: 'Zu Hause sendet dein Smartphone per Funk (WLAN) an deinen Router (die kleine Box an der Wand). Dieser ist über ein Telefon- oder Glasfaserkabel fest mit dem Internet verbunden.',
        check: 'Weißt du, wo dein Router in der Wohnung steht?',
        icon: 'wifi'
      },
      {
        title: 'Unterwegs: Die Mobilfunkmasten',
        text: 'Unterwegs schickt dein Smartphone Funksignale an die nächsten Mobilfunkmasten (LTE / 4G oder 5G). Diese leiten deine Daten ebenfalls in das feste Kabelnetz weiter.',
        check: 'Siehst du unterwegs das 4G- oder 5G-Symbol in deiner Statusleiste?',
        icon: 'share-2'
      },
      {
        title: 'Sicherheit auf der Datenreise',
        text: 'Moderne Datenübertragung ist verschlüsselt (erkennbar am Schloss in der Browser-Adresszeile). Dadurch kann niemand auf dem Weg deine Passwörter oder Bankdaten abfangen.',
        check: 'Achtetest du bereits auf das kleine Schlosssymbol?',
        icon: 'shield-alert'
      }
    ],
    sources: [
      { title: 'Internet-ABC – Wie funktioniert das Internet?', url: 'https://www.internet-abc.de' }
    ]
  },
  {
    id: 'benutzerkonto',
    title: 'Was ist ein Benutzerkonto?',
    subtitle: 'Deinen persönlichen Zugang zu einem Dienst verstehen.',
    category: 'Konten',
    theme: 'blau',
    minutes: 3,
    updatedAt: '2026-06-25',
    scope: 'Grundlagenwissen',
    learning: {
      kind: 'explain',
      why: 'Ein Benutzerkonto ist wie ein persönliches Schließfach im Internet. Nur mit deinem Schlüssel (E-Mail und Passwort) hast du Zugriff auf deine Daten.',
      preparation: [
        'Gedanken an deine bestehenden Online-Dienste'
      ]
    },
    steps: [
      {
        title: 'Warum man Benutzerkonten braucht',
        text: 'Ob bei Google, Amazon, deiner Bank oder beim Arztportal: Das Konto sorgt dafür, dass die Webseite weiß, wer du bist, und niemand Fremdes deine Bestellungen oder Nachrichten einsehen kann.',
        check: 'Ist dir klar, warum ein Konto deine persönlichen Daten schützt?',
        icon: 'user-round'
      },
      {
        title: 'Benutzername und Passwort',
        text: 'Als Benutzername dient heute fast immer deine persönliche E-Mail-Adresse. Zusammen mit deinem geheimen Passwort bildet sie das Schloss zu deinem Konto.',
        check: 'Weißt du deine Haupt-E-Mail-Adresse auswendig?',
        icon: 'key-round'
      },
      {
        title: 'Die Abmeldefunktion (Logout)',
        text: 'Nutzt du ein fremdes Gerät (z. B. in der Bibliothek oder bei Bekannten), solltest du dich nach der Nutzung immer über „Abmelden“ oder „Logout“ aus deinem Konto ausloggen.',
        check: 'Meldest du dich an fremden Computern nach der Arbeit stets ab?',
        icon: 'user-plus'
      },
      {
        title: 'Konto schützen mit zwei Faktoren',
        text: 'Aktiviere wo immer möglich die Zwei-Faktor-Authentifizierung. Dann reicht Kriminellen dein Passwort allein nicht mehr – sie bräuchten auch dein physisches Handy.',
        check: 'Hast du für deine wichtigsten Konten die Bestätigung in zwei Schritten aktiviert?',
        icon: 'log-out'
      }
    ],
    sources: [
      { title: 'BSI – Benutzerkonten sicher verwalten', url: 'https://www.bsi.bund.de' }
    ]
  }
];
