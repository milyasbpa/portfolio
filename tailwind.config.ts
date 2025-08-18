import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
      },
      screens: {
        xs: "475px",
        mobile: "0px",
        tablet: "768px",
        desktop: "1024px",
        "2xl": "1440px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        
        // Primary Blue-Purple Balanced Palette (Less Dominant Purple)
        primary: {
          50: "#F0F4FF",
          100: "#E6EFFF", 
          200: "#D1E0FF",
          300: "#B3C7FF",
          400: "#8FA3FF",
          500: "#6B7FFF", // Main primary - Blue-purple balance
          600: "#5865F2", // Discord blue tone
          700: "#4F46E5", // Balanced blue-purple
          800: "#4338CA",
          900: "#3730A3",
          950: "#1E1B4B",
        },
        
        // Secondary Teal-Cyan Palette (Better with blue-purple)
        secondary: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6", // Teal - complements blue-purple better
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        
        // Accent Colors - More Harmonious
        accent: {
          emerald: "#10B981",   // Green accent
          orange: "#F97316",    // Warm orange instead of amber
          rose: "#F43F5E",      // Pink accent
          indigo: "#6366F1",    // Deep indigo
        },
        
        // Neutral Grays - Light Mode
        neutral: {
          0: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },
        
        // Dark Mode Specific Colors
        dark: {
          0: "#FAFAFA",
          50: "#F5F5F5", 
          100: "#E5E5E5",
          200: "#D4D4D4",
          300: "#A3A3A3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#0F0F0F",
          950: "#050505",
        },
        
        // Night Mode (Extra Dark)
        night: {
          50: "#1A1A1A",
          100: "#111111",
          200: "#0D0D0D", 
          300: "#080808",
          400: "#050505",
          500: "#030303",
          600: "#020202",
          700: "#010101",
          800: "#000000",
        },
        
        // Legacy colors for backward compatibility
        purple60: "#6E60FA",
        purple70: "#8B7DFB", 
        purple78: "#A290FC",
        purple84: "#BBAEFD",
        purple88: "#CBC2FE",
        purple92: "#DCD6FE",
        purple97: "#F2F0FE",
        purple99: "#FBFAFE",
        dark02: "#050505",
        dark06: "#101010",
        dark08: "#141414",
        dark10: "#191919",
        dark12: "#1F1F1F",
        dark13: "#212121",
        dark16: "#282828",
        dark18: "#2D2D2D",
        dark22: "#383838",
        dark25: "#404040",
        grey40: "#666666",
        grey46: "#757575",
        grey60: "#999999",
        grey80: "#CCCCCC",
        grey85: "#D9D9D9",
        grey90: "#E6E6E6",
        grey95: "#F2F2F2",
        grey99: "#FCFCFC",
        white: "#FFFFFF",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #6E60FA, 0 0 10px #6E60FA, 0 0 15px #6E60FA' },
          '100%': { boxShadow: '0 0 10px #A290FC, 0 0 20px #A290FC, 0 0 30px #A290FC' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
