/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    boxShadow: {
        'item-shadow': '0px 4px 14px 0px rgba(121, 121, 121, 0.05)',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
      'white': '#ffffff',
      'black' : '#000000',
      'select-hover' : '#F2F2F2',
      'select-border' : '#DEDEE0',
      'dark_1': '#373738',
      'dark_2': '#707070',
      'dark_3': '#E0E0E0',
      'blue_btn': '#148DFD',
      'orange_main': '#FD7114',
      'error': '#F44336'
    },
    },
  },
  plugins: [],
};
