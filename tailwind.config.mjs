/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f3faf5',
          100: '#e0f0e4',
          200: '#c1dfc9',
          300: '#99c8a7',
          400: '#72ad86',
          500: '#4d8b66',
          600: '#356d4e',
          700: '#235a47',
          800: '#1b4638',
          900: '#15382e',
          950: '#0c211a',
        },
        mulberry: {
          50:  '#fcf7fa',
          100: '#f5e8ef',
          200: '#e9d0dd',
          300: '#d9aec5',
          400: '#c183a6',
          500: '#a85f87',
          600: '#8e4e72',
          700: '#77465f',
          800: '#61394e',
          900: '#4d2f40',
          950: '#301a29',
        },
        surface: {
          DEFAULT: '#121613',
          1: '#1a211c',
          2: '#252e27',
          3: '#313c33',
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
