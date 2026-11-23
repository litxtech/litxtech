/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Sora'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      colors: {
        litx: {
          primary: "var(--litx-primary, #5b9dff)",
          accent: "var(--litx-accent, #a78bfa)",
          secondary: "var(--litx-secondary, #22d3ee)",
          "primary-dark": "var(--litx-primary-dark, #2563eb)",
          "accent-dark": "var(--litx-accent-dark, #7c3aed)",
          ink: "#06080f",
          surface: "#0a0e18",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '4xl': '2rem',
      },
      boxShadow: {
        premium: '0 24px 60px -32px rgba(0,0,0,0.9)',
        'premium-lg': '0 40px 90px -40px rgba(0,0,0,0.95)',
        glow: '0 18px 40px -18px rgba(99,102,241,0.8)',
      },
      backgroundImage: {
        'ltx-aurora':
          'radial-gradient(ellipse 60% 45% at 50% -10%, rgba(59,130,246,0.2), transparent 70%), radial-gradient(ellipse 45% 40% at 85% 8%, rgba(139,92,246,0.14), transparent 72%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
