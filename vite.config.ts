import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Sur GitHub Pages le site est servi sous /<nom-du-repo>/ : le workflow passe VITE_BASE.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
});
