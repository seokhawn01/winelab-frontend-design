// 04-home.html 참고
// 구현 항목:
//   - 상단 인사말 + 검색바
//   - 카테고리 칩 (가로 스크롤): 한식/양식/일식/중식/기타
//   - 음식 그리드 (3열): 이모지 + 음식명 → /recommend?food=xxx
//   - 하단 탭 네비게이션 (홈 활성)
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CATEGORIES = [
  { key: "korean", label: "한식", emoji: "🍚" },
  { key: "western", label: "양식", emoji: "🍝" },
  { key: "japanese", label: "일식", emoji: "🍣" },
  { key: "chinese", label: "중식", emoji: "🥟" },
  { key: "other", label: "기타", emoji: "🌮" },
];

const FOODS_KOREAN = [
  { emoji: "🥩", name: "삼겹살" },
  { emoji: "🍖", name: "갈비찜" },
  { emoji: "🥣", name: "김치찌개" },
  { emoji: "🥩", name: "불고기" },
  { emoji: "🥞", name: "해물파전" },
  { emoji: "🫕", name: "된장찌개" },
  { emoji: "🍜", name: "잡채" },
  { emoji: "🍗", name: "찜닭" },
  { emoji: "🍳", name: "계란찜" },
];

export default function HomeScreen() {
  const router = useRouter();

  // TODO: 선택된 카테고리 상태 및 음식 목록 필터링 구현
  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      {/* TODO: 구현 필요 */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-winelab-700 text-lg font-semibold">홈 화면</Text>
        <Text className="text-winelab-400 text-sm mt-2">04-home.html 참고하여 구현</Text>
      </View>
    </View>
  );
}
