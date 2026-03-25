/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0d2036',   // darkest
          800: '#1a3a5c',   // primary brand (navbar, headings)
          700: '#2d5986',   // darker hover
          600: '#3b72a8',
          500: '#4d8ec0',
          100: '#dceefa',   // lightest tint
        },
        accent: {
          600: '#b5511a',   // warm amber for CTAs
          500: '#d4622a',
          400: '#e8773f',
        },
        neutral: {
          50:  '#f9f7f4',   // off-white background
          100: '#f0ede6',
          200: '#e0ddd5',
          700: '#4a4740',
          900: '#1c1a17',
        },
      },
      fontFamily: {
        serif:    ['"Playfair Display"', 'Georgia', 'serif'],  // headings
        sans:     ['"Source Sans 3"', 'system-ui', 'sans-serif'], // body
        mono:     ['"JetBrains Mono"', 'monospace'],            // code/DOI
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
