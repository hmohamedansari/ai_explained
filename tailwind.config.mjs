/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dde6ff',
          200: '#c2d1ff',
          300: '#9db2ff',
          400: '#7088ff',
          500: '#4f62fa',
          600: '#3d44ef',
          700: '#3234d4',
          800: '#2b2dab',
          900: '#292d87',
          950: '#181a50',
        },
        surface: {
          DEFAULT: '#0f1117',
          1: '#161820',
          2: '#1e2130',
          3: '#252840',
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
            '--tw-prose-code': theme('colors.brand[300]'),
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
