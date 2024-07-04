/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url('public/images/bg_login.jpg')",
        home_background: "url('public/images/bg_home.jpg')",
      },
      fontFamily: {
        font_tittle: "Montserrat",
        "sans-serif": "Poppins",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
