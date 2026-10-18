/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6E8F7',
          100: '#C1C6ED',
          300: '#5661C4',
          600: '#0A1795',
          700: '#01139C',
          900: '#010A52',
        },
        ink: '#000000',
        neutral: {
          50: '#F7F8FA',
          100: '#EEF0F4',
          200: '#DCE0E8',
          500: '#6B7280',
          700: '#374151',
        },
        accent: '#B08D57',
        'accent-bright': '#FFCD5C',
        'accent-glow': '#FFE29A',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        arHeading: ['Tajawal', 'sans-serif'],
        arBody: ['Tajawal', 'sans-serif'],
      },
      keyframes: {
        'aerial-push': {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)', filter: 'saturate(.92) brightness(.9)' },
          '100%': { transform: 'scale(1.14) translate3d(0, -1.2%, 0)', filter: 'saturate(1) brightness(1)' },
        },
        'video-settle': {
          '0%': { transform: 'scale(1.035)' },
          '100%': { transform: 'scale(1)' },
        },
        'copy-reveal': {
          '0%': { opacity: '0', transform: 'translate3d(34px, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'gentle-zoom': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
      },
      animation: {
        'aerial-push': 'aerial-push 7000ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'video-settle': 'video-settle 7000ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'copy-reveal': 'copy-reveal 800ms 150ms cubic-bezier(0.22, 1, 0.36, 1) both',
        progress: 'progress 7000ms linear both',
        'gentle-zoom': 'gentle-zoom 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};