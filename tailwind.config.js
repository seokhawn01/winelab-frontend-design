/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // WineLab 브랜드 색상 — 와이어프레임 기준 burgundy 팔레트
      // 주요 포인트: #722f37 (burgundy ★ main), #FFF8F0 (cream), #C5A028 (gold)
      colors: {
        winelab: {
          50:  "#FFF0F1",   // 거의 흰색 (배경 틴트)
          100: "#F5DDE0",   // 블러시 (밝은 배경)
          200: "#E8B8BF",   // 연한 로즈
          300: "#D48D99",   // 로즈 (비활성 텍스트)
          400: "#BE6B77",   // 미디엄 로즈
          500: "#A54A55",   // 미디엄 버건디
          600: "#8B3A44",   // 진한 버건디
          700: "#722f37",   // ★ 와인 레드 / 버건디 (메인 primary)
          800: "#4A1F1F",   // 딥 마룬 (다크 배경 보조)
          900: "#2C1A1A",   // 거의 검정 (다크 모드 배경)
        },
        // 크림 배경 — 와이어프레임 밝은 배경색
        cream: "#FFF8F0",
        // 골드 — 별점, 통계 강조 색상
        gold: "#C5A028",
      },
    },
  },
  plugins: [],
}

