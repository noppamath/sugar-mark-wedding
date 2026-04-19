import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      // Colors - Explicit palette from design tokens
      colors: {
        // Primary (Pine Green) - Rocky Mountain forests
        primary: {
          50: '#f0f7f4',
          100: '#d6ece5',
          200: '#aed8cc',
          300: '#7bbfad',
          400: '#4da08a',
          500: '#2c5f4a',
          600: '#245040',
          700: '#1d4235',
          800: '#16342a',
          900: '#0f261e',
        },

        // Accent (Glacier Blue) - Rocky Mountain alpine lakes
        accent: {
          50: '#eef6f9',
          100: '#cfe8f0',
          200: '#9fd1e1',
          300: '#6fb9d2',
          400: '#4a90a4',
          500: '#3d7a8c',
          600: '#316475',
          700: '#254e5d',
          800: '#1a3845',
          900: '#0f222e',
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
