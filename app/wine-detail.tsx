// 06-wine-detail.html 참고
// 구현 항목:
//   - 헤더: 뒤로가기, "와인 상세"
//   - 히어로 섹션: 와인 이미지, 종류 배지, 이름/지역/빈티지, Vivino 별점
//   - 맛 프로파일 카드: 탄닌/산미/바디감/당도 ProgressBar (0~5)
//   - 와인 정보 카드: 품종/지역/빈티지/알코올/국가 (2컬럼 그리드)
//   - 어울리는 음식 카드: 태그 목록
//   - 하단 고정 버튼: "마셨어요 — 오늘 기록에 추가" → /review
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function WineDetailScreen() {
  const router = useRouter();

  // TODO: route params에서 와인 ID 받기 (useLocalSearchParams)
  // TODO: 와인 데이터 API 연동
  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      {/* TODO: 구현 필요 */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-winelab-700 text-lg font-semibold">와인 상세</Text>
        <Text className="text-winelab-400 text-sm mt-2">06-wine-detail.html 참고하여 구현</Text>
      </View>
    </View>
  );
}
