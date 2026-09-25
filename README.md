# Digital Guide Box · WordPress CMS Plugin (Version 2.9.9)

Exklusives WordPress-Plugin für Jan Dennis Brüning (`janbruening.de` / `cms.janbruening.de`), das die vollständige **Digital Guide Box** bereitstellt.

### Neu in Version 2.9.9:
- **Behebung der mobilen Inhaltsanzeige (Tabs öffnen verlässlich mit vollem Inhalt):**
  - Auf mobilen Bildschirmen und schmaleren Fenstern (≤ 1099px) kollabieren die Reiterinhalte von **Neuigkeiten**, **KI-Assistent** und **Anleitungen** nicht mehr auf 0 Höhe. Alle Nachrichtenbeiträge, Themenkategorien und Anleitungen werden in natürlicher Höhe vollständig dargestellt und sind flüssig durchscrollbar.
  - Der KI-Assistent erhält auf mobilen Geräten ein ergonomisches, dediziertes Chatfenster mit fixiertem Header und Eingabefeld.
- **Bündiger Abschluss des WhatsApp-Kanals & Beseitigung des Leerraums:**
  - Auf mobilen Geräten und schmaleren Auflösungen dehnt sich die Box nicht mehr künstlich ins Leere (`flex: 0 0 auto`). Die Karte **„Neu: WhatsApp-Kanal“** schließt bündig am unteren abgerundeten Rand der Box ab, ohne unschöne weiße Leerräume darunter.
- **Optimierung von „Sofort-Hilfe mit KI“ im Seitenbereich:**
  - Der Titel bricht nicht mehr unschön in drei Zeilen um („Sofort- / Hilfe mit [Neu] / KI“). Die Schriftgröße wurde harmonisiert und der Textumbruch mit `whitespace-nowrap` und flexibler Badge-Ausrichtung stabilisiert.
  - Auf Desktop-Bildschirmen ist die rechte Seitenleiste durch `minmax(290px, 340px)` garantiert ausreichend breit, sodass Akkordeons und Schnellaktionen immer großzügig Platz haben.
- **Perfektioniertes Umschaltverhalten der horizontalen Reiter:**
  - Der Schwellenwert für das nebeneinanderliegende 3-Reiter-Layout wurde auf ≥ 1550 px angehoben. Dadurch passen Statusangaben wie „Aktuell“, „Live-Hilfe“ und „35 verfügbar“ bei jeder Bildschirmgröße garantiert ohne Abschneiden oder Kantenüberlauf in die Buttons.

### Neu in Version 2.9.8:
- **Vollständig behobenes Responsive-Layout für schmale & mobile Ansichten:**
  - **Reiterleiste standardmäßig vertikal gestapelt:** Die 3 Tabs (Neuigkeiten, KI-Assistent, Anleitungen) sind standardmäßig als vollwertige, 100 % breite Karten untereinander angeordnet. Erst ab 1400 px Bildschirmbreite schalten sie nebeneinander um. Dadurch sind alle 3 Tabs immer sichtbar, barrierefrei erreichbar und können nie wieder abgeschnitten werden.
  - **Einspaltiger Workspace bei kleineren Bildschirmen (≤ 1024px):** Die Desktop-2-Spalten-Anordnung (`grid-template-columns: 13fr 7fr`) greift nun erst ab 1025 px. Auf Tablets, Smartphones und schmalen Browserfenstern klappt der Workspace verlässlich in eine einzige flüssige Spalte um: Tabs und Inhalte oben in voller Breite, Kontakt- und WhatsApp-Bereich darunter in voller Breite.
  - **Keine gequetschte Sidebar mehr:** Die WhatsApp-Karte wird auf mobilen Geräten nie mehr in eine schmale 150px-Spalte gequetscht, sondern besitzt stets volle Breite mit optimaler Lesbarkeit.

### Neu in Version 2.9.7:
- **Optimiertes Responsive-Verhalten & Container Queries für Tabs:**
  - **Dynamisches Umschalten per Container Query (`@container`):** Die 3 Hauptreiter (Neuigkeiten, KI-Assistent, Anleitungen) reagieren nun direkt auf die tatsächliche Breite ihres Elterncontainers (`.box-tabs`). Unter 860px Containerbreite (bzw. Viewport unter 1480px) schalten die Tabs nahtlos in die vertikale Stapelung um.
  - **Schutz vor Text- und Badge-Überlauf:** Die Status-Badges („Aktuell“, „Live-Hilfe“, „X verfügbar“) sind mit `flex-shrink: 0` und `white-space: nowrap` geschützt, sodass Badges und Texte bei jeder Fensterbreite sauber in der Box bleiben.
  - **Fluide Typografie:** Fließende Skalierung via `clamp()` bei Labeln und Badges sorgt für harmonische Proportionen.
  - **Früheres Workspace-Collapse:** Der 2-spaltige Workspace schaltet bei schmaleren Bildschirmen (unter 1200px) auf einspaltig um, wodurch Tabs und Sidebar nie beengt werden.
  - **Adaptive Viewport-Ränder:** Auf Tablets und Smartphones skalieren die Außenabstände dynamisch (4vw / 3vh bzw. 0.75rem), um wertvolle mobile Bildschirmfläche zu bewahren.

### Neu in Version 2.9.6:
- **Erweiterter Raum & Randabstände der Digital Guide Box:**
  - Der Außenabstand der Digital Guide Box zum Viewport wurde gezielt vergrößert:
    - **Oben und unten:** 5 % Abstand (`5vh`), sodass der mehrschichtige, sanfte Hintergrund über der Box und unter dem Footer luftig zur Geltung kommt.
    - **Links und rechts:** 8 % Abstand (`8vw`), wodurch die Box als edles, zentriertes Interface harmonisch im Sichtfeld eingebettet ist.
    - Die Leseansicht (`ReadingDialog`) übernimmt dieselbe proportionale Geometrie.

### Neu in Version 2.9.5:
- **Visuelles Designsystem implementiert:**
  - **Farbwelt harmonisiert:** Petrol (`#014B6F`), Türkis (`#0B9EBC`), Cyan (`#2AE7FE`), Magenta (`#FD2675`), Creme (`#FDF4E4`), Pfirsich (`#FCC59A`), warmes Gold (`#F7C270`) und tiefe Textfarbe (`#01060C`).
  - **Atmosphärischer Mehrschicht-Hintergrund:** Cremefarbener Grundverlauf kombiniert mit radialen Lichtpunkten in Cyan/Türkis, Pfirsich, Magenta und warmem Gold.
  - **Markantes Signature-Profil-Portrait:** Kreisrunder Avatar-Ausschnitt mit Farbverlauf von Cyan über Petrol zu Magenta (`linear-gradient(135deg, #2AE7FE, #014B6F 48%, #FD2675)`), feiner heller Innenkante in Creme (`#FDF4E4`) und weichem Tiefenschatten – konsistent angewendet über Header, Begrüßungstor, KI-Assistent, Lesemodus und Kontaktbereich.
  - **Glasmorphismus & weiche Oberflächen:** Halbtransparente Flächen mit 20px Blur, feinen Petrol-Rahmen (`rgba(1, 75, 111, 0.12)`) und weichen, organischen Radien.
  - **Tabs & Navigation:** Klare visuelle Differenzierung zwischen inaktiven und aktiven Tabs mit erhabener Fläche und präziser Petrol-/Türkis-Akzentuierung.
  - **Thematische Farbfamilien:** Klare Trennung zwischen Kreativ-/Design-Themen (Magenta/Pfirsich), Digital-/Technik-Themen (Petrol/Türkis/Cyan) und Erhalt der Social-Identitäten (WhatsApp-Grün).

### Neu in Version 2.9.4:
- **Neuigkeiten-Reiter:**
  - Der starre Zähler „60 Beiträge“ wurde durch den aufgeräumten, zukunftssicheren Status **„Aktuell“** mit blauem Aktiv-Indikator ersetzt. So bleibt die Leiste auch bei wachsendem Beitragsarchiv kompakt und übersichtlich.
- **Harmonisierung der Icon-Größen beim KI-Assistenten:**
  - Sämtliche Icons in der Steuerungszeile des Assistenten (`Digital-Assistent`, `Schnell`, `Standard`, `Komplex`, Chatverlauf leeren) wurden auf einheitliche `12px` (`w-3 h-3`) skaliert, passend zur Schrifthöhe der Buttons.
- **KI-Modell-Anbindung & Modi:**
  - Die Modi **Schnell**, **Standard** und **Komplex** wurden mit den echten, hochperformanten Google Gemini Modellen verknüpft (`gemini-2.0-flash`, `gemini-2.0-flash-lite`, `gemini-1.5-pro`). Fiktive Platzhalter-Modellnamen im Backend und Frontend wurden behoben.
- **Verbesserter Reset-Button („Chatverlauf leeren“):**
  - Der Reload-Button ist nun deaktiviert, solange noch kein Chatverlauf existiert. Bei aktivem Verlauf leert er die Konversation nach Bestätigung verlässlich und setzt den Zustand zurück.

### Neu in Version 2.9.2:
- **Titel-Korrektur beim KI-Assistenten:**
  - Der Kopfbereich des KI-Assistenten lautet nun einheitlich und verständlich **„Jan Dennis · KI Assistenz rundum die Uhr“** (Korrektur des vorherigen Platzhalters).

### Neu in Version 2.9.1:
- **Optimierung der Bewertungskarte bei Anleitungen:**
  - Der Hinweis `(Deine Stimme gezählt)` bei bereits bewerteten Anleitungen wird nun aufgeräumt und sauber unterhalb von `★ 4.8 von 5 · 48 Bewertungen` platziert, anstatt den Text horizontal zu überladen.

### Neu in Version 2.9.0:
- **Erweitertes Filter- und Sortier-Menü für Anleitungen:**
  - Klick auf den neuen Button **„Filter & Sortierung“** öffnet ein übersichtliches Dropdown-Menü mit mehreren Filter- und Sortieroptionen.
  - **Sortierung nach „Am besten bewertet“:** Anleitungen können jetzt direkt nach der höchsten durchschnittlichen Sternebewertung (z. B. 5.0 ★, 4.9 ★) sortiert werden.
  - Weitere Sortiermöglichkeiten: **Empfohlen**, **Alphabetisch (A–Z)**, **Kürzeste Lesezeit** und **Ausführlichste Anleitungen**.
  - **Erweiterte Schnellfilter:**
    - **Mindestbewertung:** Ab 4.8 Sterne (Top-Tipps), Ab 4.5 Sterne oder Alle.
    - **Lesezeit / Dauer:** Unter 5 Minuten (Schnelltipps), 5–7 Minuten, Ab 8 Minuten oder Alle Zeiten.
    - **Gerät / Plattform:** Smartphone & Tablet (Android / iPhone / iPad), Computer & Laptop (Windows / Mac) oder Alle.
  - Aktive Filter werden als praktische Entfern-Tags unter der Suche angezeigt und können einzeln oder mit einem Klick auf **„Alle zurücksetzen“** geleert werden.
- **Interaktives Sterne-Bewertungssystem für Anleitungen:**
  - Jede Anleitung besitzt jetzt eine sichtbare Sterne-Bewertung (z. B. `★ 4.9 (28)`), die direkt auf den Kärtchen und im Lesekopf angezeigt wird.
  - **Bewertung in der Leseansicht:** Am Ende jeder geöffneten Anleitung können Leser mit 1 bis 5 interaktiven Sternen direkt Feedback abgeben („War diese Anleitung hilfreich?“).
  - Hover-Vorschau und sofortige Rückmeldung („Danke für dein Feedback! Du hast X von 5 Sternen vergeben.“).
  - Bewertungen werden dauerhaft gespeichert (`localStorage`), fließen sofort in den Gesamtschnitt der Anleitung ein und aktualisieren die Sortierung in Echtzeit.

### Neu in Version 2.8.3:
- **Farbliche Differenzierung der Beitragsarten & Warnmeldungen bei den Neuigkeiten:**
  - Oben rechts auf jeder Neuigkeiten-Karte wird die Beitragsart (z. B. **„Warnung“**, **„Alltagstipp“**, **„Praxistipp“**, **„Ratgeber“**, **„Box-Update“**, **„Schritt-für-Schritt“**) nun als passend eingefärbter Pill-Badge mit passendem Icon dargestellt.
  - **„Warnung“** sticht in markantem Signalrot (`#b91c1c` auf dezentem `#fef2f2` mit feinem Rahmen `#fca5a5`) und einem `AlertTriangle`-Warnsymbol sofort ins Auge. Zusätzlich erhalten Warnbeiträge einen dezenten roten Akzentstreifen am linken Kartenrand.
  - Auch die übrigen Beitragsarten verfügen über maßgeschneiderte, sympathische Farbtöne (z. B. Smaragdgrün für Praxistipps/Alltagstipps, Digital-Guide-Blau für Box-Updates, Himmelsblau für Ratgeber, Violett für Schritt-für-Schritt).
  - Das Veröffentlichungsdatum steht harmonisch und übersichtlich daneben.
  - In der Vollbild-Leseansicht (`ReadingDialog`) wird derselbe typisierte Badge konsistent weitergeführt.

### Neu in Version 2.8.2:
- **Flüssige, nachvollziehbare Animation beim Hovern der Support-Karten:**
  - Die drei Akkordeon-Karten **„Du kommst nicht weiter?“**, **„Dringende Hilfe“** und **„Feedback & Wünsche“** springen beim Darüberfahren mit der Maus (Hover) nicht mehr ruckartig auf.
  - Mittels CSS Grid-Transition (`grid-template-rows: 0fr` zu `1fr`) und weicher Opazitätsüberblendung (`cubic-bezier(0.16, 1, 0.3, 1)`) gleiten die Inhalte geschmeidig und natürlich auf und zu.
  - Der Pfeil (`ChevronDown`) dreht sich synchron und sanft über 280ms mit.
  - Ein erweiterter Puffer (160ms) verhindert jedes Flackern, wenn die Maus zwischen Kopfbereich und Formularfeldern bewegt wird.
- **Entfernung technischer Modellbezeichnungen („Gemini 3“):**
  - Der Hinweis auf ein spezifisches technisches Modell („Gemini 3“) wurde aus der Benutzeroberfläche entfernt.
  - Im Hauptreiter oben wird stattdessen ein sympathischer, lebendiger Badge **„Live-Hilfe“** mit dezentem Pulse-Indikator angezeigt.
  - Im Assistentenbereich und den Sprechblasen werden neutrale, serviceorientierte Bezeichnungen wie **„Digital-Assistent“** und **„KI-Assistent“** verwendet.

### Neu in Version 2.8.1:
- **Harmonisierung der Neuigkeiten-Boxen (Runde Ecken):**
  - Die Beitrags-Boxen im Bereich „Neuigkeiten“ (`.news-entry`, `.news-card`, `.news-trigger` und `.news-article-content`) besitzen nun durchgehend weiche, runde Ecken (`border-radius: 1rem` / `rounded-2xl`).
  - Dadurch fügen sich die Neuigkeiten nahtlos in das Gesamtkonzept der Digital-Guide-Box ein, bei dem alle Kärtchen (wie die Anleitungen, Support-Karten und Infobereiche) harmonisch abgerundet sind.
  - Auch die Unterboxen der Einordnung (`.news-assessment > div`), der Sortierbutton und der Scrollbereich wurden optisch an das abgerundete Gesamtdesign angepasst.

### Neu in Version 2.8.0:
- **Kontaktkarte: „Dein persönlicher Digitalguide“:**
  - In der Druckansicht der Kontaktkarte (`ContactCardPrintDialog`), auf dem tatsächlichen Druckformat (Standard-Visitenkarte 85 × 55 mm) und im direkten Kontaktbereich steht unter dem Namen von Jan Dennis Brüning nun exakt die Bezeichnung: **„Dein persönlicher Digitalguide“**.
  - Auch in den Standard-Einstellungen und im WordPress-Adminbereich (`class-dgbc-admin.php`, `class-dgbc-settings.php`) wurde die Standardbezeichnung entsprechend angepasst.
- **Desktop Hover-Akkordeons für Kontakt & Feedback:**
  - Auf Desktop-Geräten (Präzisionszeiger / Maus) öffnen sich die drei Kontaktkarten **„Du kommst nicht weiter?“**, **„Dringende Hilfe“** und **„Feedback & Wünsche“** automatisch, sobald man mit der Maus darüber fährt (Hover).
  - Sobald der Mauszeiger die Karte wieder verlässt, schließt sie sich automatisch. Wenn der Nutzer gerade ein Eingabefeld fokussiert hat (z. B. eine Nachricht schreibt), bleibt die Karte geöffnet, um ein versehentliches Schließen zu verhindern.
  - **Mobile Touch-Optimierung erhalten:** Auf Smartphones und Tablets (Touchscreen) bleibt das gewohnte Auf- und Zuklappen per Fingertipp erhalten – ohne störende oder unabsichtliche Hover-Effekte.

### Neu in Version 2.7.3:
- **Entfernung des redundanten Grundlagen-Blocks:** Der hervorgehobene Kasten *„Wichtigste Grundlagen auf einen Blick“* oberhalb der Anleitungen wurde vollständig entfernt. Alle Anleitungen beginnen nun direkt unter der Such- und Sortierleiste – übersichtlich, ohne doppelte Inhalte und mit sofortigem Zugriff auf alle Themen. Die Grundlagen-Anleitungen bleiben über das Buch-/Hut-Icon in der Kategorieleiste sowie in der Gesamtauswahl jederzeit direkt erreichbar.

### Neu in Version 2.7.2:
- **Einheitliche Höhe von Eingabefeld & „Fragen“-Button:** Das Texteingabefeld und der blaue Absende-Button des KI-Assistenten besitzen nun auf Desktop und Mobile exakt dieselbe ergonomische Höhe (56px bzw. mitwachsend im Flex-Stretch), sodass das Layout harmonisch und wie aus einem Guss wirkt.
- **Feinabstimmung von Abständen & Größen:**
  - *Schritt-Tabs im Lese-Dialog:* Nahtloser aktiver Zustand ohne Höhenversatz dank Inset-Glow; einheitliche Mindesthöhe von 38px für alle Tabs.
  - *Grundlagen-Karten:* Die Aktionsschaltfläche „Erklärung lesen“ erstreckt sich auf Mobilgeräten nun über die volle Breite – exakt synchron zu den regulären Anleitungs-Karten für optimale Touch-Bedienung.
  - *Konsistente Innen- und Außenabstände* in allen Ansichten, Dialogen und Bedienelementen.

### Neu in Version 2.7.1:
- **KI-Assistent aufgeräumt:** Die vorgefertigten Fragenchips („Häufige Fragen zum Ausprobieren“) oberhalb der Eingabebox wurden entfernt. Dadurch wirkt der Chatverlauf wesentlich ruhiger, aufgeräumter und das Eingabefeld steht uneingeschränkt im Fokus.

### Neu in Version 2.7.0:
- **Interaktive Schritt-Tabs mit Namen:** Die Schritte jeder Anleitung werden in der Leseansicht als moderne, horizontal scrollbare Tab-Leiste dargestellt. Jeder Tab zeigt neben der Schrittnummer (mit Indikator bei erledigten Schritten) den vollständigen Schrittnamen (z. B. *„Chat öffnen“*, *„Nachricht eingeben“*, *„Senden“*).
- **Butterweicher horizontaler Slide-Effekt:** Beim Wechseln zwischen den Schritten (per Klick auf einen Tab, Klick auf „Weiter“ / „Zurück“, Wischgeste auf Touchscreens oder Pfeiltasten ◄ / ► auf der Tastatur) gleitet der Schrittkarten-Inhalt sanft von der Seite hinein, sodass die Interaktion haptisch und intuitiv nachvollziehbar wird.
- **Automatisches Mitscrollen des aktiven Tabs:** Die Tab-Leiste scrollt den gerade aktiven Schritt immer sanft ins sichtbare Sichtfeld.
- **Volle PDF- & Druckkompatibilität:** Die PDF-Generierung sowie die Druckansicht (`Ctrl+P` / `Cmd+P`) bleiben zu 100 % erhalten – Druckdokumente und PDFs listen weiterhin alle Schritte vollständig, fortlaufend und barrierefrei auf.
- **Optionale Listenansicht:** Über den Umschalt-Button oben rechts kann weiterhin jederzeit zwischen der geführten Tab/Slide-Ansicht und einer durchgehenden Listenansicht gewechselt werden.

### Neu in Version 2.6.5:
- **Kategorie „Grundlagen“ an zweiter Position:** In der Kategorienleiste der Anleitungen steht „Grundlagen“ nun direkt an zweiter Stelle nach „Alle“ – mit Direktfilter auf alle 6 Grundlagen-Anleitungen.
- **Optimierter Grundlagen-Kopfbereich:** Schriftgröße von „Wichtigste Grundlagen auf einen Blick“ vergrößert, Buchstabenabstand für maximale Lesbarkeit optimiert, und überflüssige Hilfstexte sowie Filter-Buttons entfernt.
- **Kompakterer Sortier-Button:** Die Schaltfläche „Empfohlene Reihenfolge“ ist nun dezenter und platzsparender dimensioniert.
- **Komprimiertes, nutzerfreundliches Kartenlayout für „Alle Anleitungen“:**
  - Kategorie-Tag und Titel befinden sich nun in einer gemeinsamen Zeile nebeneinander.
  - Der Aktions-Button „Anleitung lesen“ bildet eine eigenständige, saubere Zeile unterhalb der Kurzbeschreibung.
  - Die Kurzinformationen (Lesezeit, Schrittanzahl, Gerätetyp und Aktualisierungsstand) sind elegant auf der rechten Kartenseite platziert.
  - Die vertikale Kartenhöhe wurde spürbar reduziert – für eine deutlich kompaktere, schnell erfassbare Übersicht ohne visuelle Überladung.

### Neu in Version 2.6.4:
- **Vollflächige Leseansicht im Dialog:** Der gesamte Inhalt der Anleitungen (Vorbereitungsbox „Bevor du beginnst“, Schritt-für-Schritt-Karten, Navigations- und Erfolgs-Checks) füllt nun die volle Breite des Lesefensters aus. Die unschöne leere weiße Fläche auf der rechten Seite wurde vollständig eliminiert.

### Neu in Version 2.6.3:
- **Grundlagen-Kopfbereich entzerrt:** Titel und Kurzerklärung der Grundlagen nutzen nun die volle Breite; der Filter-Button („Alle X Grundlagen filtern“) sitzt in einer separaten Sub-Zeile und bricht nicht mehr in 3 Zeilen um.

### Neu in Version 2.6.2:
- **Kategorie-Positionierung optimiert:** Die Kategorie sitzt nun als sauberes, linksbündiges Thema-Tag („Eyebrow“) direkt über dem Anleitungstitel und schwebt nicht mehr abgetrennt im Raum über dem Aktions-Button.
- **Fließende visuelle Hierarchie:** Jede Zeilenkarte liest sich konsistent von oben nach unten (Kategorie-Tag → Titel → Kurzerklärung → Metadaten) mit dem Aktions-Button rechts.

### Neu in Version 2.6.1:
- **Grundlagen vollflächig gestapelt:** Die Schnelleinstiegs-Karten für Grundlagen werden nun vollflächig untereinander (100% Breite) dargestellt, statt in zwei gequetschten Spalten.
- **Such- und Sortierbereich vertikal entzerrt:** Das Suchfeld oben nimmt die volle Breite ein, darunter sitzen sauber angeordnet der Anleitungs-Zähler und der Sortier-Button.
- **Optimierte Tastatur- und Barrierefreiheit:** Vollständige ARIA-Unterstützung und optimierte Touch-Ziele auf allen Geräten.

### Neu in Version 2.6.0:
- **Redesign der Anleitungen:** Vollflächige Darstellung aller Anleitungen gestapelt unter- und übereinander (kein 3-spaltig gequetschtes Layout mehr).
- **Spannende visuelle Hierarchie:** Großzügige Themen-Icons (56px), gestochen scharfe Überschriften, barrierefreie unboxed Metadaten (Lesezeit, Schrittanzahl, Gerätetyp, Aktualisierungsstand).
- **Taktile Interaktionsbuttons:** Komfortable „Anleitung lesen“-Aktionsschaltflächen mit Richtungs-Icons.
- **Entzerrte Grundlagen:** „Wichtigste Grundlagen auf einen Blick“ in einem geräumigen 2-Spalten-Raster mit klaren, verständlichen Kurzantworten.
- **Integrierte Schnellsuche:** Direkte Echtzeit-Filterung über Anleitungen, Untertitel und Kategorien.

---

## 🌟 Funktionen

1. **Passwort-Zugangstor (Gate-Screen):**
   - Standard-Passwort: **`digitalguidejan`** (im WordPress-Admin jederzeit änderbar).
   - Nach erfolgreicher Eingabe bleibt der Zugang auf dem Gerät für **8 Stunden** freigeschaltet.
   - Bei fehlerhafter Eingabe erscheint eine klare deutsche Fehlermeldung.
   - Klick auf **„Box schließen“** sperrt die Seite sofort wieder.

2. **Eigener sauberer URL-Endpunkt:**
   - Erreichbar unter: `https://deine-domain.de/digital-guide-box/`
   - Vollständig isoliertes Layout ohne störende Theme-Header oder -Footer für optimale Leseerfahrung.

3. **Flexibler Shortcode:**
   - `[digital_guide_box]` – kann in jede beliebige Seite (auch Elementor) eingebunden werden.

4. **Inhalte & Benutzerfreundlichkeit:**
   - **35+ Anleitungen** (`Die wichtigsten Grundlagen`, `Häufig gebraucht` und 6 Themenbereiche).
   - **Neuigkeiten & Sicherheitswarnungen** mit praktischer Ampel-Einschätzung.
   - **Volltextsuche** über alle Anleitungen und Beiträge.
   - **Ansicht anpassen:** Schriftgröße (Standard / Größer / Noch größer), Kontrastmodus und Hintergrund-Farbpaletten (Original / Blau / Ruhig).
   - **Kontakt-Sidebar:** Direkte Anbindung für Hilfsanfragen („Du kommst gerade nicht weiter?“) mit E-Mail-Zustellung an `office@janbruening.de`, Druckkarte und WhatsApp-Kanal.

5. **WordPress Adminbereich:**
   - Eigener Menüpunkt **„Digital Guide Box“** im WordPress-Dashboard.
   - Schneller Kopiermechanismus für den Zugangslink zum Versenden an Käufer.
   - Passwort- und E-Mail-Verwaltung.
   - Übersicht der letzten eingegangenen Anfragen.

---

## 📦 Installation in WordPress

1. Lade die Datei `digital-guide-box.zip` herunter.
2. Gehe in deinem WordPress-Adminbereich auf **Plugins → Installieren → Plugin hochladen**.
3. Wähle die `digital-guide-box.zip` aus und klicke auf **Jetzt installieren**.
4. Klicke auf **Plugin aktivieren**.
5. Rufe im WordPress-Menü **Digital Guide Box** auf, um den Zugangslink einzusehen oder das Passwort anzupassen.
