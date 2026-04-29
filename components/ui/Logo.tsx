import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Rect, Line } from 'react-native-svg';

// ─────────────────────────────────────────────────────────────────────────────
// WineLab 로고 컴포넌트 v2
//
// 디자인:
//   · 아이콘: 라운드 배지(버건디) + 솔리드 와인잔(흰색) + 측정선(lab 암시)
//   · 워드마크: "wine"(300) + "lab"(600) 조합
//
// 의존성:
//   npx expo install react-native-svg
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = {
  burgundy: '#722f37',
  cream: '#FFF8F0',
  white: '#FFFFFF',
} as const;

const SIZES = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 56,
  xl: 72,
} as const;

type LogoSize    = keyof typeof SIZES;
type LogoVariant = 'light' | 'dark';
type LogoLayout  = 'horizontal' | 'vertical' | 'icon';

// ─────────────────────────────────────────────────────────────────────────────
// 아이콘 마크
// viewBox: 0 0 56 56
//  · 라운드 배지: rx=12 (≈22% — iOS 앱 아이콘 비율)
//  · 볼 path: 베지에 커브로 자연스러운 와인잔 형태
//  · 측정선: 실험실 비커 눈금 암시 (불투명도 낮게)
// ─────────────────────────────────────────────────────────────────────────────
function LogoIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      {/* 라운드 배지 배경 */}
      <Rect width="56" height="56" rx="12" fill={COLORS.burgundy} />

      {/* 와인잔 볼 — 솔리드 채움 (베지에 커브) */}
      <Path
        d="M8 8 C8 20 18 30 22 32 L34 32 C38 30 48 20 48 8 Z"
        fill={COLORS.white}
      />

      {/* 실험실 측정선 */}
      <Line
        x1="16" y1="21"
        x2="40" y2="21"
        stroke={COLORS.burgundy}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity={0.22}
      />

      {/* 스템 */}
      <Rect x="25" y="32" width="6" height="13" fill={COLORS.white} />

      {/* 베이스 */}
      <Rect x="15" y="45" width="26" height="4" rx="2" fill={COLORS.white} />
    </Svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 메인 Logo 컴포넌트
// ─────────────────────────────────────────────────────────────────────────────
export function Logo({
  size    = 'md',
  variant = 'light',
  layout  = 'horizontal',
}: {
  size?:    LogoSize;
  variant?: LogoVariant;
  layout?:  LogoLayout;
}) {
  const iconSize   = SIZES[size];
  const textColor  = variant === 'dark' ? COLORS.cream : COLORS.burgundy;
  const fontSize   = iconSize * 0.6;
  const gap        = iconSize * 0.27;

  // 아이콘만
  if (layout === 'icon') {
    return <LogoIcon size={iconSize} />;
  }

  const wordmark = (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      <Text
        style={{
          fontSize,
          color: textColor,
          fontWeight: '300',
          letterSpacing: 0.6,
          includeFontPadding: false,
        }}
      >
        wine
      </Text>
      <Text
        style={{
          fontSize,
          color: textColor,
          fontWeight: '600',
          letterSpacing: 0.6,
          includeFontPadding: false,
        }}
      >
        lab
      </Text>
    </View>
  );

  if (layout === 'vertical') {
    return (
      <View style={{ alignItems: 'center', gap: gap * 0.7 }}>
        <LogoIcon size={iconSize} />
        {wordmark}
      </View>
    );
  }

  // 기본: horizontal
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap }}>
      <LogoIcon size={iconSize} />
      {wordmark}
    </View>
  );
}
