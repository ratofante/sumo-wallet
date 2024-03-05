/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  fontFamily: {
    sans: ['Inter', 'system-ui']
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      }
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#FAFAF9'
      },
      fontFamily: {
        serif: ['Britannic-Bold', ...defaultTheme.fontFamily.serif],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'big-title': ['82px', '0.85']
      }
    }
  },
  plugins: []
};
