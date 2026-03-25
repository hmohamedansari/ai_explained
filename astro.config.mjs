import { defineConfig } from 'astro/config';
import darkPlus from '@shikijs/themes/dark-plus';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const noGreenDarkPlus = {
  ...darkPlus,
  name: 'dark-plus-no-green',
  tokenColors: darkPlus.tokenColors.map((rule) => {
    const foreground = rule?.settings?.foreground?.toUpperCase();
    const replacement = {
      '#4EC9B0': '#4FC1FF',
      '#6A9955': '#8B949E',
      '#B5CEA8': '#D7BA7D',
    }[foreground];

    if (!replacement) return rule;
    return {
      ...rule,
      settings: {
        ...rule.settings,
        foreground: replacement,
      },
    };
  }),
};

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
      theme: noGreenDarkPlus,
      wrap: false,
    },
  },
  redirects: {
    // Old prototype module URL — redirect to the learn index
    '/learn/how-agents-work': '/learn',
  },
});
