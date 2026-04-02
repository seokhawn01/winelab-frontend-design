import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";
import TasteSlider from "@/components/ui/TasteSlider";

export default function OnboardingScreen() {
  const router = useRouter();
  const [tannin, setTannin] = useState(2.5);
  const [acidity, setAcidity] = useState(3.0);
  const [body, setBody] = useState(3.5);
  const [sweetness, setSweetness] = useState(1.5);

  return (
    <View className="flex-1 bg-winelab-900">
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-8 py-12">
          <View className="gap-8">
            {/* 헤더 */}
            <View className="gap-2">
              <Text className="text-white text-2xl font-semibold">취향 설정</Text>
              <Text className="text-winelab-300 text-sm leading-5">
                어떤 와인을 좋아하세요?{"\n"}슬라이더로 취향을 설정하세요.
              </Text>
            </View>

            {/* 슬라이더 */}
            <View className="gap-6">
              <TasteSlider label="탄닌" value={tannin} onValueChange={setTannin} />
              <TasteSlider label="산미" value={acidity} onValueChange={setAcidity} />
              <TasteSlider label="바디감" value={body} onValueChange={setBody} />
              <TasteSlider label="당도" value={sweetness} onValueChange={setSweetness} />
            </View>

            {/* 액션 버튼 */}
            <View className="gap-4">
              <Button onPress={() => {}}>시작하기</Button>
              <TouchableOpacity className="items-center" onPress={() => {}}>
                <Text className="text-winelab-300 text-sm">
                  잘 모르겠어요 → 건너뛰기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
