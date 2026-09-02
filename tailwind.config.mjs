/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf8f5',
          100: '#f9ede5',
          200: '#f1d6c6',
          300: '#e4b899',
          400: '#d5916b',
          500: '#c96b43',
          600: '#ad5330',
          700: '#8d3f27',
          800: '#713421',
          900: '#5d2d1f',
          950: '#32160e',
        },
        surface: {
          DEFAULT: '#171412',
          1: '#211b17',
          2: '#2c241e',
          3: '#382d26',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-code': theme('colors.slate[300]'),
            '--tw-prose-pre-bg': theme('colors.surface[2]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
