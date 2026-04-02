// 07-search.html 참고
// 구현 항목:
//   - 헤더: "🔍 와인 검색"
//   - 검색 입력 + 삭제(X) 버튼
//   - 와인 종류 필터 칩 (가로 스크롤): 전체/레드/화이트/로제/스파클링
//   - 검색 결과 개수 표시
//   - 와인 카드 리스트:
//     - 와인명, 별점(금색), 탄닌/산미 속성
//     - → 카드 탭 시 /wine-detail 이동
//   - "더 보기" 버튼
//   - 하단 탭 네비게이션 (검색 활성)
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function SearchScreen() {
  // TODO: 검색어 상태, 필터 상태, 검색 결과 상태
  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      {/* TODO: 구현 필요 */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-winelab-700 text-lg font-semibold">와인 검색</Text>
        <Text className="text-winelab-400 text-sm mt-2">07-search.html 참고하여 구현</Text>
      </View>
    </View>
  );
}
