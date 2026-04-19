/**
 * Design Tokens for Sugar & Mark's Wedding Website
 * Centralized design system with colors, spacing, typography, and effects
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Primary (Cyan) - Main action color
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

  // Accent (Rose) - Secondary action and highlight
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

  // Neutrals (Gray) - Text, backgrounds, borders
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Status Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#145231',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Semantic
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

// ============================================================================
// SPACING TOKENS (in pixels, 4px base)
// ============================================================================

export const spacing = {
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
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: '"Geist Sans", system-ui, -apple-system, sans-serif',
    mono: '"Geist Mono", monospace',
  },

  // Font sizes (in pixels)
  fontSize: {
    xs: { size: '12px', lineHeight: '16px' },
    sm: { size: '14px', lineHeight: '20px' },
    base: { size: '16px', lineHeight: '24px' },
    lg: { size: '18px', lineHeight: '28px' },
    xl: { size: '20px', lineHeight: '28px' },
    '2xl': { size: '24px', lineHeight: '32px' },
    '3xl': { size: '30px', lineHeight: '36px' },
    '4xl': { size: '36px', lineHeight: '40px' },
    '5xl': { size: '48px', lineHeight: '48px' },
  },

  // Font weights
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
};

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

// ============================================================================
// TRANSITION & ANIMATION TOKENS
// ============================================================================

export const transitions = {
  // Durations
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  // Easing functions
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },

  // Common transitions
  common: {
    all: 'all 300ms ease-in-out',
    color: 'color 300ms ease-in-out',
    background: 'background-color 300ms ease-in-out',
    transform: 'transform 300ms ease-in-out',
    opacity: 'opacity 300ms ease-in-out',
  },
};

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '6px',
  md: '8px',
  lg: '12px',
  full: '9999px',
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  mobile: '320px',
  mobileLandscape: '667px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
  ultraWide: '1440px',
} as const;

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

export const zIndex = {
  hide: '-1',
  auto: 'auto',
  base: '0',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modal: '1040',
  popover: '1050',
  tooltip: '1060',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a color value with optional opacity
 * @example
 * getColor('primary', 500, 0.5) // 'rgba(6, 182, 212, 0.5)'
 */
export function getColor(
  colorName: keyof typeof colors | 'white' | 'black' | 'transparent',
  shade?: number,
  opacity?: number
): string {
  const colorObj = colors[colorName as keyof typeof colors];

  if (typeof colorObj === 'string') {
    return colorObj; // For white, black, transparent
  }

  if (!shade) return 'transparent';

  const hexColor = (colorObj as Record<number, string>)[shade];
  if (!hexColor) return 'transparent';

  if (!opacity || opacity === 1) return hexColor;

  // Convert hex to RGB then apply opacity
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
