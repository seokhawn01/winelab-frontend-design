import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-winelab-900 items-center justify-center px-8">
      <StatusBar style="light" />

      {/* 로고 */}
      <View className="flex-1 items-center justify-center gap-3">
        <Text className="text-white text-5xl font-semibold italic">WineLab</Text>
        <Text className="text-winelab-300 text-xs tracking-widest uppercase">
          AI Wine & Food Pairing
        </Text>
      </View>

      {/* 버튼 */}
      <View className="w-full gap-3 pb-16">
        <Button variant="outline" onPress={() => router.push("/login")}>
          로그인
        </Button>
        <Button variant="primary" onPress={() => router.push("/signup")}>
          회원가입
        </Button>
      </View>
    </View>
  );
}
