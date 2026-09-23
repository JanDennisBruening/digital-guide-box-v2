# Digital Guide Box · WordPress CMS Plugin (Version 2.6.5)

Exklusives WordPress-Plugin für Jan Dennis Brüning (`janbruening.de` / `cms.janbruening.de`), das die vollständige **Digital Guide Box** bereitstellt.

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
