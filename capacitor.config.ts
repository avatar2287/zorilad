import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: process.env.VITE_OWNER_REVIEW === 'true' ? 'app.zorilad.owner' : 'app.zorilad.mobile',
  appName: 'ZORILAD',
  webDir: 'dist-mobile',
  server: { androidScheme: 'https', cleartext: false },
  android: { allowMixedContent: false, webContentsDebuggingEnabled: false },
};

export default config;
