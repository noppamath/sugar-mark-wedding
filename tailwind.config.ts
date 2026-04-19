import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      // Colors - Explicit palette from design tokens
      colors: {
        // Primary (Cyan)
        primary: {
          50: '#ecf8fc',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },

        // Accent (Rose)
        accent: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda29b',
          400: '#f87171',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9d174d',
          900: '#831843',
        },

        // Status colors
        status: {
          success: '#22c55e',
          error: '#ef4444',
          warning: '#f59e0b',
        },
      },

      // Spacing - Explicit scale from design tokens
      spacing: {
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
      },

      // Font family - Explicit from design tokens
      fontFamily: {
        sans: '"Geist Sans", system-ui, -apple-system, sans-serif',
        mono: '"Geist Mono", monospace',
      },

      // Border radius - From design tokens
      borderRadius: {
        none: '0',
        sm: '4px',
        base: '6px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },

      // Box shadows - From design tokens
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },

      // Animation and transitions
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },

      transitionTimingFunction: {
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
      },

      // Z-index values
      zIndex: {
        hide: '-1',
        auto: 'auto',
        base: '0',
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        modal: '1040',
        popover: '1050',
        tooltip: '1060',
      },

      // Breakpoints - Explicit from design tokens
      screens: {
        'mobile': '320px',
        'mobile-landscape': '667px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1280px',
        'ultra-wide': '1440px',
      },
    },
  },

  plugins: [],
};

export default config;
