import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "w-[50px]",
    "w-[100px]",
    "w-[150px]",
    "w-[200px]",
    "w-[250px]", // Add all needed widths
  ],
  theme: {
    extend: {
      colors: {
        mBodyBg: "#f0f2f5",
        mBlue: "#007fff",
        mBlueLight: "#d5e5fa",
        mGreen: "#14a37f",
        mRed: "#ff4569",
        mText: "#344767",
        mMenuText: "#6b7280",
        mHover: "#d5e5fa",
        mYellow: "#fae27c",
        mGray: "#e5e5e5",
        mGrayLight: "#f7f8fa",
        mGrayDark: "#6c757d",
        mBlack: "#000",
        mWhite: "#fff",
        mBorder: "#e5e5e5",
        mBorderDark: "#6c757d",
        mBorderLight: "#e5e5e5",
        mBorderHover: "#d5e5fa",
        mBorderFocus: "#007fff",
        mBorderError: "#ff4569",
        mBorderSuccess: "#14a37f",
        mBorderWarning: "#f5a623",
        mBorderInfo: "#0072bc",
        mBorderDisabled: "#e5e5e5",
        mBorderDisabledDark: "#6c757d",
        mBorderDisabledLight: "#e5e5e5",
        mBorderDisabledHover: "#d5e5fa",
        mBorderDisabledFocus: "#007fff",
        uBlue: "#0072bc",
      },
    },
  },
  plugins: [],
} satisfies Config;
