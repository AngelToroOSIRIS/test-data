import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "image-login": "url('/images/LoginImage.jpg')",
        "image-login-dark": "url('/images/LoginImageDark.jpg')",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
    colors: {
      transparent: "#00000000",
      "blurred-white": "#ffffffc7",
      "default-white": "#ffff",
      "soft-white": "#f9f9f9",
      "off-white": "#f3f3f3",
      "custom-black": "#1B1B1B",
      "soft-gray": "#c5c5c5",
      gray: "#898989",
      "dark-gray": "#2B2B2B",
      "soft-green": "#75f0a0",
      green: "#1CCC5B",
      "dark-green": "#117a37",
      "soft-blue": "#729cff",
      blue: "#2D6BFF",
      "dark-blue": "#1F4AB2",
      yellow: "#f1c40f",
      "soft-red": "#ff8a8a",
      red: "#e72828",
      "dark-red": "#8b1111",
      "soft-purple": "#540000",
      purple: "#612D8A",
      "dark-purple": "#381850",
      civil: "#A71930",
      electrica: "#490E6F",
      sistemas: "#008542",
      industrial: "#E37222",
      electronica: "#0039A6",
      economia: "#0083A9",
      empresas: "#A1006B",
      matematicas: "#003C69",
      mecanica: "#F0AB00",
      biomedica: "#5BBBB7",
      ambiental: "#7BBA25",
      estadistica: "#00D900",
      doctorados: "#003946",
      proyectos: "#DE3831",
      osiris: "#0938a7",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {},
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: "#990000", foreground: "#ffff" },
            secondary: { DEFAULT: "#540000", foreground: "#ffff" },
            default: { DEFAULT: "#e9e9e9", foreground: "#4A4A4A" },
            background: { DEFAULT: "#f3f3f3", foreground: "#000" },
            foreground: { DEFAULT: "#000", foreground: "#ffff" },
            danger: { DEFAULT: "#e72828", foreground: "#ffff" },
            warning: { DEFAULT: "#e9b435", foreground: "#ffff" },
            success: { DEFAULT: "#1ccc5b", foreground: "#ffff" },
            focus: "#990000",
            content1: { DEFAULT: "#f3f3f3", foreground: "#000" },
            content2: "#e9e9e9",
            content3: "#e9e9e9",
            content4: "#1ccc5b",
            overlay: "#1ccc5b",
            divider: "#dbdbdb",
          },
        },
        dark: {
          colors: {
            primary: { DEFAULT: "#e72828", foreground: "#ffff" },
            secondary: { DEFAULT: "#540000", foreground: "#ffff" },
            default: { DEFAULT: "#4A4A4A", foreground: "#fff" },
            background: { DEFAULT: "#3B3B3B", foreground: "#fff" },
            foreground: { DEFAULT: "#ffff", foreground: "#000" },
            danger: { DEFAULT: "#e72828", foreground: "#ffff" },
            warning: { DEFAULT: "#e9b435", foreground: "#ffff" },
            success: { DEFAULT: "#1ccc5b", foreground: "#ffff" },
            focus: "#990000",
            content1: { DEFAULT: "#3B3B3B", foreground: "#fff" },
            content2: "#4A4A4A",
            content3: "#4A4A4A",
            content4: "#1ccc5b",
            overlay: "#1ccc5b",
            divider: "#5f5f5f",
          },
        },
      },
    }),
  ],
};
export default config;
