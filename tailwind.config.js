/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        sans: ['Orbitron', 'sans-serif'],
      },
      colors: {
        
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-accent': 'var(--color-bg-accent)',
        
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-accent': 'var(--color-text-accent)',
        
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
        
        'border': 'var(--color-border)',
      },
      boxShadow: {
        'custom': 'var(--shadow-color)',
      },
      keyframes: {
        shine: {
          '100%': { transform: 'translateX(200%)' },
        }
      },
      animation: {
        shine: 'shine 1s ease-in',
      }
    },
  },
  plugins: [],
} 