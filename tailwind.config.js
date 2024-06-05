/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#3498db",
        "primary-300": "#1f6da8",
        "primary-500": "#1a4e7d",
        "secondary-300": "#4ecdc4",
        "secondary-500": "#3baf9f",
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
      },
      // backgroundImage: (theme) => ({
      //   "gradient-bluewhite":
      //     "linear-gradient(90deg, #9fbbf8 0%, #5e71db 100%)",
      // }),
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1060px",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};
