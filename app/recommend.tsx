// 05-recommend.html 참고
// 구현 항목:
//   - 헤더: 뒤로가기, "AI 와인 추천 ✨", 선택 음식 배지
//   - AI 분석 칩 (기름짐/단백질/강도 수치)
//   - 와인 추천 카드 3개:
//     - 1순위: 버건디 테두리 강조 + "AI 최우선 추천" 배지
//     - 속성 ProgressBar (탄닌/산미/바디감/당도, 0~5)
//     - AI 추천 이유 텍스트
//   - 하단 탭 네비게이션 (홈 활성)
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RecommendScreen() {
  const router = useRouter();

  // TODO: route params에서 음식 이름 받기 (useLocalSearchParams)
  // TODO: 와인 추천 API 연동
  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      {/* TODO: 구현 필요 */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-winelab-700 text-lg font-semibold">와인 추천</Text>
        <Text className="text-winelab-400 text-sm mt-2">05-recommend.html 참고하여 구현</Text>
      </View>
    </View>
  );
}
