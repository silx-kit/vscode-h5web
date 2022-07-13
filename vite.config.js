import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: './app',
  publicDir: false,
  plugins: [react()],
  build: {
    target: 'es2020', // required by @h5web/h5wasm for BigInt `123n` notation support
    sourcemap: 'inline', // can't load external sourcemaps from webviews
    outDir: '../dist',
    emptyOutDir: true,
    manifest: true, // so the extension knows what the app's built files are called
  },
});
