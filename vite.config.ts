import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User-site GitHub Pages deployment (sharathraparthy.github.io) serves from the domain root.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
