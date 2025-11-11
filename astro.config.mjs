// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://patentboxadvisor.it',
  integrations: [
    tailwind(),
    sitemap()
  ],
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    build: {
      minify: 'esbuild'
    }
  }
});
