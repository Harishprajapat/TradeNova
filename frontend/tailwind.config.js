/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#030712",
          900: "#0b1120",
          850: "#111827",
          800: "#172033",
        },
        surface: {
          900: "rgba(10, 16, 29, 0.82)",
          800: "rgba(15, 23, 42, 0.72)",
          700: "rgba(17, 24, 39, 0.62)",
        },
        border: {
          soft: "rgba(148, 163, 184, 0.16)",
          strong: "rgba(148, 163, 184, 0.28)",
        },
        accent: {
          50: "#eef9ff",
          100: "#d8f1ff",
          400: "#4cc9f0",
          500: "#29b6f6",
          600: "#149adb",
          700: "#0d78ad",
        },
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f59e0b",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(41, 182, 246, 0.12), 0 18px 48px rgba(0, 0, 0, 0.32)",
        panel: "0 12px 32px rgba(0, 0, 0, 0.24)",
      },
      backgroundImage: {
        "ink-grid":
          "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(circle at top left, rgba(41,182,246,0.18), transparent 40%), radial-gradient(circle at top right, rgba(34,197,94,0.12), transparent 32%), radial-gradient(circle at bottom, rgba(236,72,153,0.08), transparent 35%)",
      },
      fontFamily: {
        display: ["Space Grotesk", "Plus Jakarta Sans", "sans-serif"],
        sans: ["Plus Jakarta Sans", "Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floaty: "floaty 8s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};
