/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html, js}"],
  theme: {
    screens: {
      mobile: "375px",
      desktop: "1440px",
    },
    fontFamily: {
      sans: ["Space Grotesk", "sans-serif"],
    },
    colors: {
      white: "hsl(0, 0%, 100%)",
      lightGrayishViolet: "hsl(270, 3%, 87%)",
      darkGrayishViolet: "hsl(279, 6%, 55%)",
      veryDarkViolet: "hsl(278, 68%, 11%)",
      gradientOne: "hsl(249, 99%, 64%)",
      gradientTwo: "hsl(278, 94%, 30%)",
      red: "hsl(0, 100%, 66%)",
    },
    extend: {
      fontSize: {
        body_xs: "9px",
        body_sm: "12px",
        body_md: "12px",
        body_lg: "14px",
        heading_lg: "18px",
        heading_xl: "28px",
      },
      backgroundImage: {
        "mobile-hero": "url('./images/bg-main-mobile.png')",
        "desktop-hero": "url('./images/bg-main-desktop.png')",
      },
      boxShadow: {
        cardshadow: "0px 39px 60px rgba(0, 0, 0, 0.142481)",
      },
      letterSpacing: {
        body_xs_spacing: "1.29px",
        body_md_spacing: "2px",
        body_lg_spacing: "2px",
        body_lg_card_spacing: "2.2px",
        heading_xl_spacing: "3.42px",
      },
    },
  },
  plugins: [],
};
