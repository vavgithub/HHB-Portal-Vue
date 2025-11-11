/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./.storybook/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        // Base color palettes using CSS variables
        grayscale: {
          50: 'var(--color-grayscale-50)',
          100: 'var(--color-grayscale-100)',
          150: 'var(--color-grayscale-150)',
          200: 'var(--color-grayscale-200)',
          300: 'var(--color-grayscale-300)',
          400: 'var(--color-grayscale-400)',
          500: 'var(--color-grayscale-500)',
          600: 'var(--color-grayscale-600)',
          700: 'var(--color-grayscale-700)',
          800: 'var(--color-grayscale-800)',
          900: 'var(--color-grayscale-900)',
          950: 'var(--color-grayscale-950)',
        },
        accent: {
          900: 'var(--color-accent-900)',
          50: 'var(--color-accent-50)',
        },
        primary: {
          900: 'var(--color-primary-900)',
        },
        secondary: {
          900: 'var(--color-secondary-900)',
        },
        success: {
          900: 'var(--color-success-900)',
          800: 'var(--color-success-800)',
        },
        error: {
          900: 'var(--color-error-900)',
          800: 'var(--color-error-800)',
        },
        alert: {
          900: 'var(--color-alert-900)',
          800: 'var(--color-alert-800)',
        },
        info: {
          900: 'var(--color-info-900)',
          800: 'var(--color-info-800)',
        },
        
        // Background colors
        background: {
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
        },
        
        // Text colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          accent: 'var(--color-text-accent)',
        },
        
        // Border colors
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          accent: 'var(--border-accent)',
          error: 'var(--border-error)',
          success: 'var(--border-success)',
          warning: 'var(--border-warning)',
          info: 'var(--border-info)',
        },
        
        // Status colors
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error: 'var(--status-error)',
          info: 'var(--status-info)',
        },
      },
      
      // Spacing using CSS variables
      spacing: {
        0: 'var(--spacing-0)',
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        8: 'var(--spacing-8)',
        10: 'var(--spacing-10)',
        12: 'var(--spacing-12)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        24: 'var(--spacing-24)',
        32: 'var(--spacing-32)',
        40: 'var(--spacing-40)',
        48: 'var(--spacing-48)',
        56: 'var(--spacing-56)',
        64: 'var(--spacing-64)',
      },
      
      // Border radius using CSS variables
      borderRadius: {
        none: 'var(--border-radius-none)',
        sm: 'var(--border-radius-sm)',
        base: 'var(--border-radius-base)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
        xl: 'var(--border-radius-xl)',
        '2xl': 'var(--border-radius-2xl)',
        '3xl': 'var(--border-radius-3xl)',
        full: 'var(--border-radius-full)',
      },
      
      // Typography using CSS variables
      fontFamily: {
        satoshi: 'var(--typography-font-family-satoshi)',
      },
      
      fontSize: {
        h1: ['var(--typography-font-size-5xl)', { lineHeight: "1.1" ,letterSpacing : "1px"}],
        h2: ['var(--typography-font-size-4xl)', { lineHeight: "1.2"  ,letterSpacing : "1px"}],
        h3: ['var(--typography-font-size-3xl)', { lineHeight: "1.2" ,letterSpacing : "1px"}],
        h4: ['var(--typography-font-size-2xl)', { lineHeight: "1.2" ,letterSpacing : "1px"}],
        h5: ['var(--typography-font-size-xl)', { lineHeight: "1.2" ,letterSpacing : "1px"}],
        h6: ['var(--typography-font-size-base)', { lineHeight: "1.5" ,letterSpacing : "1px"}],
        body: ['var(--typography-font-size-base)', { lineHeight: "1.5" ,letterSpacing : "0.65px"}],
        "display-d1": ['var(--typography-font-size-7xl)', { lineHeight: "1" ,letterSpacing : "1px"}],
        "display-d2": ['var(--typography-font-size-6xl)', { lineHeight: "1" ,letterSpacing : "1px"}],
        "small-p": ['var(--typography-font-size-xs)', { lineHeight: "1.5" }],
        "large-p": ['var(--typography-font-size-base)', { lineHeight: "1.5" }],
        xs: 'var(--typography-font-size-xs)',
        sm: 'var(--typography-font-size-sm)',
        base: 'var(--typography-font-size-base)',
        lg: 'var(--typography-font-size-lg)',
        xl: 'var(--typography-font-size-xl)',
        '2xl': 'var(--typography-font-size-2xl)',
        '3xl': 'var(--typography-font-size-3xl)',
        '4xl': 'var(--typography-font-size-4xl)',
        '5xl': 'var(--typography-font-size-5xl)',
        '6xl': 'var(--typography-font-size-6xl)',
        '7xl': 'var(--typography-font-size-7xl)',
        '8xl': 'var(--typography-font-size-8xl)',
        '9xl': 'var(--typography-font-size-9xl)',
      },
      
      fontWeight: {
        thin: 'var(--typography-font-weight-thin)',
        extralight: 'var(--typography-font-weight-extralight)',
        light: 'var(--typography-font-weight-light)',
        normal: 'var(--typography-font-weight-normal)',
        medium: 'var(--typography-font-weight-medium)',
        semibold: 'var(--typography-font-weight-semibold)',
        bold: 'var(--typography-font-weight-bold)',
        extrabold: 'var(--typography-font-weight-extrabold)',
        black: 'var(--typography-font-weight-black)',
      },
      
      // Box shadow using CSS variables
      boxShadow: {
        sm: 'var(--shadow-sm)',
        base: 'var(--shadow-base)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
      },
    },
  },
  plugins: [],
}
