import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    sourcemap: 'inline', // can't load external sourcemaps from webviews
    emptyOutDir: true,
    manifest: true, // generate manifest so extension can find output files
    rollupOptions: {
      // Overwrite default `index.html` entry
      // https://vite.dev/guide/backend-integration.html
      input: 'src/main.tsx',
    },
  },
});
