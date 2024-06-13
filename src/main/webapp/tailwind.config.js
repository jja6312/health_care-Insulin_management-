module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 다크 모드 설정
  theme: {
    extend: {
      colors: {
        // dark: "#1a202c", // 다크 모드 배경 색상
        dark: "#18171D", // 다크 모드 배경 색상
        nhgreen: "#409e59",
        nhblue: "#0078d4",
      },
    },
  },
  plugins: [],
};
