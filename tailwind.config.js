/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "amatic": ["Amatic SC"],
        "rubik": ["Rubik"]
      },
      fontSize: {
        "section-title-desktop": "5.5rem",
        "page-title-desktop": "3rem",
        "course-box-title-desktop": "2.2rem",
        "module-box-title-desktop": "1.5rem",
        "button-desktop": "1.2rem",
        "navbar-desktop": "1.8rem",
        "sign-in-or-sign-up-title-desktop": "2rem",
        "sign-in-or-sign-up-button-desktop": "1.6rem",
        "sign-in-or-sign-up-labels-desktop": "0.85rem"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        "var-1": "#DFACCD",
        "var-2": "#E09609",
        "var-3": "#0966E0",
        "var-1-hovered": "#D05AA6",
        "var-2-hovered": "#FFC933",
        "var-3-hovered": "#0B2E70"
      },
      width: {
        "5percent": "5%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "46percent": "46%",
        "85percent": "85%",
        "95percent": "95%"
      },
      colors: {
        "var-1": "#DFACCD",
        "var-2": "#E09609",
        "var-3": "#0966E0",
        "var-1-hovered": "#D05AA6",
        "var-2-hovered": "#FFC933",
        "var-3-hovered": "#0B2E70"
      }
    },
  },
  plugins: [],
}
