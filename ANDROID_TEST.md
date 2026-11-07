# ZORILAD — Android test build

This is an offline demonstration, not a Play Store release. Four elements are
free; Ether can be opened with the explicitly labelled free demo button. No
money is charged. Demo access is stored separately from the web version.

Package: `app.zorilad.test`. Android 7/API 24 or newer. Compile/target SDK: 36.
The application bundles images, videos and text. System fallback fonts are used
offline. No Grok extension scripts or web authentication server are bundled.

Install Node 22+, Android Studio 2025.2.1+, JDK 21 and Android SDK 36, then:

```sh
npm ci
npm run android:setup
```

On Windows PowerShell:

```powershell
cd android
.\gradlew.bat assembleDebug
```

On Linux/macOS:

```sh
cd android
./gradlew assembleDebug
```

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.
Generated `android/` is ignored; regenerate it with `npm run android:setup`.
Do not store signing keys or SDK paths in the repository.

This APK is debug-signed. Its identifier, signature and demo access are for
testing. A production app needs its own permanent package ID, release signing,
Play Billing and purchase verification, restoration/refund handling, a privacy
policy, content review and physical-device QA. See `AUDIT_2026-11-05.md`.
