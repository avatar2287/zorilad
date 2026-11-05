import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Offline test shell: no Grok extensions, auth endpoints or server runtime.
export default defineConfig({
  root: 'mobile',
  publicDir: '../public',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [react()],
  build: { outDir: '../dist-mobile', emptyOutDir: true },
});
