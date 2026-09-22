# Projekt-Regeln & Richtlinien für Digital Guide Box

## Versionsnummerierung bei Plugin-Releases (WICHTIG)

1. **Versionsnummer immer erhöhen**:
   - Bei jeder Erstellung, Aktualisierung oder Bereitstellung einer neuen Plugin-ZIP-Datei **MUSS** die Versionsnummer semantisch erhöht werden (z. B. `2.0.0` → `2.1.0` bei neuen Funktionen/Features, `2.1.1` bei Bugfixes oder kleineren Nachbesserungen).

2. **Synchronität der Versionsnummer**:
   - Im WordPress Plugin-Header (`digital-guide-box-v2.php`): `Version: x.y.z`
   - In der PHP-Konstante (`digital-guide-box-v2.php`): `define( 'DGBC_VERSION', 'x.y.z' );`
   - Im WP-Admin Dashboard: Dynamische Anzeige über `DGBC_VERSION`
   - Im Cache-Busting der Assets: `app.css?ver=` und `app.js?ver=`
   - In der Dokumentation: `walkthrough.md` und `README.md`

3. **ZIP-Paketierung & GitHub**:
   - Die ZIP-Datei wird immer unter Ausschluss von `.git/`, `node_modules/` und temporären Dateien gepackt.
   - Alle Änderungen werden mit aussagekräftiger Commit-Nachricht auf GitHub versioniert.
