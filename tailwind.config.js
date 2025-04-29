/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#DCE3FE',
          200: '#B9C6FD',
          300: '#96A9FC',
          400: '#738DFA',
          500: '#5070F9',
          600: '#2D57F9',
          700: '#1E3A8A',
          800: '#142B66',
          900: '#0A1D43',
        },
        secondary: {
          50: '#EFFDF9',
          100: '#D6FBF1',
          200: '#AEF7E3',
          300: '#67EDD3',
          400: '#2CDEC0',
          500: '#0D9488',
          600: '#0A756C',
          700: '#075651',
          800: '#053835',
          900: '#021B1A',
        },
        accent: {
          50: '#FEFBE8',
          100: '#FEF7D1',
          200: '#FDEDA3',
          300: '#FCE476',
          400: '#FBDB48',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#783010',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          700: '#B91C1C',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};