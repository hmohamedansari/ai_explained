import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://hmohamedansari.com',
  integrations: [
    mdx(),
    react(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
  redirects: {
    // Old prototype module URL — redirect to the learn index
    '/learn/how-agents-work': '/learn',
  },
});
