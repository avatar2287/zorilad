# ZORILAD — Play preparation status

The default mobile build has no demo banner or demo unlock. Four elements are free. Ether stays locked pending a verified Play Billing integration; legacy localStorage flags cannot grant access. No money is collected.

## Owner review

Build with `VITE_OWNER_REVIEW=true npm run android:setup` for the separate `app.zorilad.owner` package, then `cd android && ./gradlew assembleDebug`. All Ether material is open in this review package. Never publish this package on Google Play. The flag grants access to anyone holding that APK; it is not account authentication. CI uploads it as a review artifact, not to the public APK download branch.

## Default preparation build

Run `npm run android:setup` without the owner flag. Package: `app.zorilad.mobile`, app name: ZORILAD. `cd android && ./gradlew bundleRelease` generates an unsigned preparation AAB. This is not a publish-ready paid release.

## Remaining release blockers

- Create the permanent Play Console app and confirm its package ID before the first upload.
- Configure a one-time Ether product, implement Play Billing purchase/restore/pending/cancel/refund handling and backend token verification. Show the localized price returned by Play, not a hardcoded dollar amount.
- Configure upload signing outside source control and Play App Signing; sign the release AAB.
- Supply the publisher identity, support contact, public privacy policy and Play Data Safety declarations based on the final SDKs and data flows.
- Review Naruto character references and artwork/content rights. Audit health/neuroscience claims and breathing practices before making store claims.
- Run physical Android tests (gesture and three-button navigation, display cutout, rotation, background/resume) and Play internal testing.

## Viewport fix

The shell consumes Capacitor SystemBars safe-area variables with browser env fallbacks. Nested full-screen scenes inherit the remaining shell height; fixed reading panels also reserve top/bottom system insets. This fixes the gate button below the navigation bar seen in the supplied video.
