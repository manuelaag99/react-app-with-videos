/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      zIndex: {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "10": "10",
        "11": "11",
        "12": "12",
        "13": "13",
        "14": "14",
        "15": "15",
        "16": "16",
        "17": "17",
        "18": "18",
        "19": "19",
        "20": "20",
        "21": "21",
        "22": "22",
        "23": "23",
        "24": "24",
        "25": "25",
        "30": "30",
        "35": "35",
        "40": "40",
        "45": "45",
        "50": "50",
        "55": "55",
        "60": "60",
        "65": "65",
        "70": "70",
        "75": "75",
        "80": "80",
        "85": "85",
        "90": "90"
      },
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
        "navbar-desktop": "1.5rem",
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
        "var-4": "#BEF0ED",
        "var-1-hovered": "#FFDEDE",
        "var-2-hovered": "#FFC933",
        "var-3-hovered": "#7eaeff"
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
        "var-1-hovered": "#FFDDDD",
        "var-2-hovered": "#FFC933",
        "var-3-hovered": "#7eaeff"
      }
    },
  },
  plugins: [],
}
