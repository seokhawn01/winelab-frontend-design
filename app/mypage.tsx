// 08-mypage.html 참고
// 구현 항목:
//   - 헤더: 프로필 이모지, "👤 마이페이지"
//   - 탭 3개: 취향 / 캘린더 / 컬렉션
//
//   [캘린더 탭]
//   - 월 네비게이션 (◀ 2026년 N월 ▶)
//   - 날짜 그리드 (7열):
//     - 일반 날짜: 숫자만
//     - 와인 기록 있는 날: 🍷 이모지 + 연한 배경
//     - 오늘: 버건디 테두리
//     - 선택된 날: 버건디 배경 + 흰 텍스트
//   - 선택된 날 기록 목록:
//     - 와인명 + 리뷰 작성 버튼 or 리뷰 완료 표시
//   - 이달 통계 카드:
//     - 마신 와인 수, 리뷰 작성 수, 선호 종류(gold 색상)
//
//   [취향 탭] → 온보딩 슬라이더 UI 재사용
//   [컬렉션 탭] → 마신 와인 전체 리스트
//
//   - 하단 탭 네비게이션 (마이 활성)
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function MyPageScreen() {
  // TODO: 선택된 탭, 선택된 날짜, 월 상태
  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      {/* TODO: 구현 필요 */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-winelab-700 text-lg font-semibold">마이페이지</Text>
        <Text className="text-winelab-400 text-sm mt-2">08-mypage.html 참고하여 구현</Text>
      </View>
    </View>
  );
}
