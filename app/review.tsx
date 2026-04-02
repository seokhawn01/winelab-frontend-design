import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";

type RatingValue = 1 | 2 | 3 | 4 | 5 | null;
type TanninFeedback = "too-strong" | "too-weak" | null;

// 한국어 조사 반환 (은/는)
function getJosa(label: string): string {
  const code = label.charCodeAt(label.length - 1);
  const hasJongseong = (code - 0xac00) % 28 !== 0;
  return hasJongseong ? "은" : "는";
}

interface RatingCirclesProps {
  label: string;
  value: RatingValue;
  onChange: (v: RatingValue) => void;
  feedback?: TanninFeedback;
}

// 1~5점 원형 버튼 평가 컴포넌트
function RatingCircles({ label, value, onChange, feedback }: RatingCirclesProps) {
  return (
    <View className="gap-2">
      {/* 라벨 + 재질문 결과 배지 */}
      <View className="flex-row items-center gap-2">
        <Text className="text-sm font-medium text-winelab-900">
          {label}{getJosa(label)} 어떠셨나요?
        </Text>
        {feedback && (
          <View className="bg-winelab-100 px-2 py-0.5 rounded-full">
            <Text className="text-xs text-winelab-700">
              {feedback === "too-strong" ? "너무 강했어요" : "너무 약했어요"}
            </Text>
          </View>
        )}
      </View>

      {/* 1~5 원형 버튼 */}
      <View className="flex-row gap-3">
        {([1, 2, 3, 4, 5] as const).map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => onChange(n)}
            className={[
              "w-11 h-11 rounded-full border-2 items-center justify-center",
              value === n
                ? "border-winelab-700 bg-winelab-100"
                : "border-winelab-200",
            ].join(" ")}
            activeOpacity={0.7}
          >
            <Text
              className={[
                "text-sm font-semibold",
                value === n ? "text-winelab-700" : "text-winelab-400",
              ].join(" ")}
            >
              {n}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// 하단 내비게이션 탭
function BottomNav({ active }: { active: "home" | "search" | "ocr" | "mypage" }) {
  const router = useRouter();
  const tabs = [
    { key: "home" as const, label: "홈", emoji: "🏠", route: "/home" },
    { key: "search" as const, label: "검색", emoji: "🔍", route: "/search" },
    { key: "ocr" as const, label: "스캔", emoji: "📷", route: "/ocr" },
    { key: "mypage" as const, label: "마이", emoji: "👤", route: "/mypage" },
  ];

  return (
    <View className="flex-row border-t border-winelab-100 bg-white py-3">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          className="flex-1 items-center gap-1"
          onPress={() => router.push(tab.route as never)}
        >
          <Text className="text-xl">{tab.emoji}</Text>
          <Text
            className={[
              "text-xs",
              active === tab.key ? "text-winelab-700 font-semibold" : "text-winelab-400",
            ].join(" ")}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function ReviewScreen() {
  const router = useRouter();

  const [tannin, setTannin] = useState<RatingValue>(null);
  const [acidity, setAcidity] = useState<RatingValue>(null);
  const [body, setBody] = useState<RatingValue>(null);
  const [sweetness, setSweetness] = useState<RatingValue>(null);
  const [notes, setNotes] = useState("");

  // 탄닌 재질문 상태
  const [tanninFeedback, setTanninFeedback] = useState<TanninFeedback>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 탄닌 점수 변경 — 2점 이하 시 재질문 Modal 표시
  function handleTanninChange(v: RatingValue) {
    setTannin(v);
    if (v !== null && v <= 2) {
      setModalVisible(true);
    } else {
      setTanninFeedback(null);
    }
  }

  function handleTanninFeedback(feedback: TanninFeedback) {
    setTanninFeedback(feedback);
    setModalVisible(false);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-cream"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />

      {/* 상단 헤더 */}
      <View className="flex-row items-center gap-3 px-4 py-4 border-b border-winelab-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Text className="text-winelab-700 text-xl">←</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-winelab-900">리뷰 작성</Text>
      </View>

      {/* 와인 정보 요약 */}
      <View className="px-4 py-4 border-b border-winelab-100 bg-white">
        <Text className="font-semibold text-winelab-900">🍷 까베르네 소비뇽 2021</Text>
        <Text className="text-xs text-winelab-400 mt-0.5">2026.03.15 · 프랑스 보르도</Text>
      </View>

      {/* 평가 영역 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, gap: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <RatingCircles
          label="탄닌"
          value={tannin}
          onChange={handleTanninChange}
          feedback={tanninFeedback}
        />
        <RatingCircles label="산미" value={acidity} onChange={setAcidity} />
        <RatingCircles label="바디감" value={body} onChange={setBody} />
        <RatingCircles label="당도" value={sweetness} onChange={setSweetness} />

        {/* 테이스팅 노트 */}
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-medium text-winelab-900">🗒️ 테이스팅 노트</Text>
            <View className="bg-winelab-100 px-2 py-0.5 rounded-full">
              <Text className="text-xs text-winelab-500">선택 사항</Text>
            </View>
          </View>
          <Text className="text-xs text-winelab-400">📅 2026년 3월 22일</Text>
          <TextInput
            className="bg-white border border-winelab-200 rounded-xl px-4 py-3 text-sm text-winelab-900"
            placeholder="오늘 이 와인은... (어떤 음식과 함께였나요?)"
            placeholderTextColor="#D48D99"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        {/* 저장 버튼 */}
        <View className="gap-1 pb-4">
          <Button variant="primary" onPress={() => {}}>
            저장하고 취향 업데이트
          </Button>
          <Text className="text-center text-xs text-winelab-400 mt-1">
            리뷰 저장 시 취향 프로파일이 자동으로 업데이트됩니다
          </Text>
        </View>
      </ScrollView>

      {/* 하단 내비게이션 */}
      <BottomNav active="mypage" />

      {/* 탄닌 재질문 Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-2xl px-5 pt-5 pb-10 gap-4">
            <View className="gap-1">
              <Text className="text-base font-semibold text-winelab-900">
                탄닌이 별로였던 이유가 뭔가요?
              </Text>
              <Text className="text-sm text-winelab-400">
                탄닌 느낌이 어떻게 아쉬우셨나요?
              </Text>
            </View>

            {/* 선택 버튼 */}
            <TouchableOpacity
              className="flex-row items-center gap-3 border border-winelab-200 rounded-xl px-4 py-3"
              onPress={() => handleTanninFeedback("too-strong")}
              activeOpacity={0.7}
            >
              <Text className="text-xl">💪</Text>
              <Text className="text-sm font-medium text-winelab-900">탄닌이 너무 강했어요</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center gap-3 border border-winelab-200 rounded-xl px-4 py-3"
              onPress={() => handleTanninFeedback("too-weak")}
              activeOpacity={0.7}
            >
              <Text className="text-xl">🌊</Text>
              <Text className="text-sm font-medium text-winelab-900">탄닌이 너무 약했어요</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center py-2"
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text className="text-sm text-winelab-400">건너뛰기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
