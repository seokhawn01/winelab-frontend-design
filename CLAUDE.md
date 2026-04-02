<<<<<<< HEAD
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

WineLab — AI 기반 음식·와인 페어링 추천 모바일 앱  
스택: **Expo (Expo Router v6) + React Native + NativeWind v4 + TypeScript**

---

## 명령어

```bash
npm start          # Expo 개발 서버 (QR코드 → Expo Go 앱)
npm run android    # Android 에뮬레이터
npm run ios        # iOS 시뮬레이터
npm run web        # 웹 브라우저 (참고용)
```

테스트 스크립트 없음.

---

## 아키텍처

### 라우팅

Expo Router — `app/` 디렉토리의 파일이 곧 라우트다.  
`app/_layout.tsx`에서 `<Stack screenOptions={{ headerShown: false }}>`로 헤더를 전부 숨기고, 각 화면이 직접 헤더를 렌더링한다.

현재 라우트:

| 파일 | 경로 | 설명 |
|------|------|------|
| `app/index.tsx` | `/` | 랜딩 (로그인/회원가입 진입) |
| `app/login.tsx` | `/login` | 로그인 |
| `app/signup.tsx` | `/signup` | 회원가입 |
| `app/onboarding.tsx` | `/onboarding` | 취향 설정 슬라이더 |
| `app/review.tsx` | `/review` | 리뷰 작성 + 탄닌 재질문 Modal |
| `app/home.tsx` | `/home` | 음식 선택 (스켈레톤) |
| `app/recommend.tsx` | `/recommend` | 와인 추천 결과 (스켈레톤) |
| `app/wine-detail.tsx` | `/wine-detail` | 와인 상세 (스켈레톤) |
| `app/search.tsx` | `/search` | 와인 검색 (스켈레톤) |
| `app/mypage.tsx` | `/mypage` | 마이페이지·캘린더 (스켈레톤) |
| `app/ocr.tsx` | `/ocr` | 라벨 스캔 (스켈레톤) |

로그인 이후 화면(`/home` ~ `/mypage`)은 화면 내부에 `BottomNav` 컴포넌트를 직접 렌더링한다 (Expo Router의 Tabs 레이아웃 미사용).

### NativeWind 설정 흐름

```
global.css          → @tailwind base/components/utilities
metro.config.js     → withNativeWind(config, { input: "./global.css" })
babel.config.js     → jsxImportSource: "nativewind" + "nativewind/babel"
tailwind.config.js  → content 경로, winelab 팔레트, cream, gold
app/_layout.tsx     → import "../global.css"  ← 이 import가 없으면 스타일 전체 미적용
```

NativeWind v4는 `className` prop으로 동작하며 `StyleSheet` 사용을 지양한다.  
`bg-cream`, `text-gold` 같은 커스텀 색상은 `tailwind.config.js`에 정의되어 있다.

### 색상 시스템

와이어프레임 기준 burgundy 팔레트 (`tailwind.config.js`):

| 토큰 | 값 | 용도 |
|------|-----|------|
| `winelab-700` | `#722f37` | ★ 메인 primary (버건디) |
| `winelab-900` | `#2C1A1A` | 다크 배경 (로그인·온보딩) |
| `winelab-300` | `#D48D99` | 비활성 텍스트, 플레이스홀더 |
| `cream` | `#FFF8F0` | 밝은 화면 배경 (홈 ~ 마이페이지) |
| `gold` | `#C5A028` | 별점, 통계 강조 |

로그인/온보딩: `bg-winelab-900` (다크)  
홈 이후 화면: `bg-cream` (라이트)

### 경로 별칭 (`tsconfig.json`)

```
@/components/*  →  ./components/*
@/screens/*     →  ./screens/*
@/hooks/*       →  ./hooks/*
@/lib/*         →  ./lib/*
```

`@/app/*` 별칭은 없다 — Expo Router가 `app/`을 직접 관리하므로 앱 파일은 `router.push("/route-name")`으로 이동한다.

### Babel 플러그인

`babel.config.js`에 `react-native-worklets/plugin`이 등록되어 있다.  
새 Babel 플러그인 추가 후에는 `npm start -- --clear` 로 Metro 캐시를 초기화해야 한다.

---

## 와이어프레임 → 화면 매핑

원본 HTML 와이어프레임은 `wireframes/` 디렉토리에 있다.

| 와이어프레임 | 화면 파일 | 구현 상태 |
|------------|----------|---------|
| 01-login.html | `app/login.tsx` | ✅ 완료 |
| 02-signup.html | `app/signup.tsx` | ✅ 완료 |
| 03-onboarding.html | `app/onboarding.tsx` | ✅ 완료 |
| 04-home.html | `app/home.tsx` | 🔲 스켈레톤 |
| 05-recommend.html | `app/recommend.tsx` | 🔲 스켈레톤 |
| 06-wine-detail.html | `app/wine-detail.tsx` | 🔲 스켈레톤 |
| 07-search.html | `app/search.tsx` | 🔲 스켈레톤 |
| 08-mypage.html | `app/mypage.tsx` | 🔲 스켈레톤 |
| 09-review.html | `app/review.tsx` | ✅ 완료 |
| 10-ocr.html | `app/ocr.tsx` | 🔲 스켈레톤 (expo-camera 필요) |

스켈레톤 파일 상단에는 해당 와이어프레임의 구현 항목이 주석으로 정리되어 있다.

---

## 미구현 화면 구현 시 참고 사항

### 하단 탭 네비게이션

`app/review.tsx`의 `BottomNav` 컴포넌트를 참고해 각 화면에 복사 사용한다.  
탭 4개: 홈(`/home`) / 검색(`/search`) / 스캔(`/ocr`) / 마이(`/mypage`)

### 공통 UI 패턴

- **ProgressBar** (와인 속성 0~5): `View`의 너비를 `style={{ width: \`${(value/5)*100}%\` }}`로 조절
- **카테고리 칩**: `ScrollView horizontal` + `showsHorizontalScrollIndicator={false}`
- **그리드 (3열)**: `FlatList numColumns={3}` 또는 `flexWrap: "wrap"` View

### OCR 화면 추가 패키지

```bash
npx expo install expo-camera expo-image-picker
```
=======
@AGENTS.md
>>>>>>> 22eba63af899aa9ad272dc87844bd9a8e9e03f20
