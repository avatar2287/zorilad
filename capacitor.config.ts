import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.zorilad.test',
  appName: 'ZORILAD Test',
  webDir: 'dist-mobile',
  server: { androidScheme: 'https', cleartext: false },
  android: { allowMixedContent: false, webContentsDebuggingEnabled: false },
};

export default config;
