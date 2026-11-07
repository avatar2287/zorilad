import { cpSync, existsSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const cap = join(root, 'node_modules/@capacitor/cli/bin/capacitor');
const run = (...args) => {
  const result = spawnSync(process.execPath, [cap, ...args], { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};

if (!existsSync(join(root, 'dist-mobile/index.html'))) {
  throw new Error('Run npm run build:mobile first.');
}
if (!existsSync(join(root, 'android'))) run('add', 'android');
// Remove only generated web assets so old bundles cannot remain in the APK.
rmSync(join(root, 'android/app/src/main/assets/public'), { recursive: true, force: true });
run('sync', 'android');

cpSync(join(root, 'mobile/android-res'), join(root, 'android/app/src/main/res'), { recursive: true });

const manifest = join(root, 'android/app/src/main/AndroidManifest.xml');
let xml = readFileSync(manifest, 'utf8').replace('android:allowBackup="true"', 'android:allowBackup="false"');
if (!xml.includes('android:usesCleartextTraffic=')) {
  xml = xml.replace('<application', '<application android:usesCleartextTraffic="false"');
}
xml = xml
  .replace('@mipmap/ic_launcher_round', '@drawable/zorilad_launcher')
  .replace('@mipmap/ic_launcher', '@drawable/zorilad_launcher')
  .replace('@style/AppTheme.NoActionBarLaunch', '@style/ZoriladLaunch');
writeFileSync(manifest, xml);

const wrapper = join(root, 'android/gradle/wrapper/gradle-wrapper.properties');
writeFileSync(wrapper, readFileSync(wrapper, 'utf8')
  .replace('-all.zip', '-bin.zip')
  .replace('networkTimeout=10000', 'networkTimeout=120000'));
console.log('Android project prepared. Play Billing integration is still required for paid release.');
