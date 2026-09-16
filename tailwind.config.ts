import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          DEFAULT: '#0e3b2e',
          light: '#145c41',
        },
        chalk: {
          DEFAULT: '#f6f3ea',
          line: '#ddd6c4',
        },
        ink: {
          DEFAULT: '#16211c',
          soft: '#4a5850',
        },
        floodlight: {
          DEFAULT: '#e2a33b',
          dark: '#b97f22',
        },
        turf: '#1c6b4f',
        'card-red': '#b23a2e',
        // Legacy aliases kept so existing class names across the app
        // (accent-green/amber/red, slate-*) keep working while pages
        // are migrated to the new palette one at a time.
        accent: {
          green: '#1c6b4f',
          amber: '#e2a33b',
          red: '#b23a2e',
        },
        slate: {
          50: '#f6f3ea',
          100: '#efeadc',
          200: '#ddd6c4',
          500: '#4a5850',
          600: '#3a463e',
          700: '#2c362f',
          900: '#16211c',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['Menlo', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: '#2c362f',
            a: {
              color: '#1c6b4f',
              '&:hover': {
                color: '#145c41',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
