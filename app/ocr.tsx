// 10-ocr.html 참고
// 구현 항목:
//   - 헤더: "📷 라벨 스캔", "GPT Vision" 부제
//   - 카메라 뷰파인더 (expo-camera):
//     - 스캔 가이드 오버레이 (흰 테두리 + 4개 L자 코너 마커)
//     - 하단 안내 텍스트: "와인 라벨을 프레임 안에 맞춰주세요"
//   - 촬영 버튼 (원형, 버건디 배경)
//   - 구분선 ("또는")
//   - 갤러리 불러오기 버튼 (아웃라인)
//   - 인식 결과 섹션 (스캔 후 표시):
//     - 성공: 초록 체크 + 신뢰도 %
//     - 와인 정보 카드 (이미지, 이름, 지역, 맛 속성 ProgressBar)
//     - 액션 버튼: "내 컬렉션에 추가", "와인 상세 보기 →"
//     - 실패: 노란 경고 박스 + 직접 검색 안내
//   - 하단 탭 네비게이션 (스캔 활성)
//
// 필요한 패키지:
//   expo install expo-camera expo-image-picker
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function OcrScreen() {
  // TODO: 카메라 권한, 스캔 결과 상태, 갤러리 이미지 상태
  return (
    <View className="flex-1 bg-winelab-900">
      <StatusBar style="light" />

      {/* TODO: 구현 필요 */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-lg font-semibold">라벨 스캔</Text>
        <Text className="text-winelab-300 text-sm mt-2">10-ocr.html 참고하여 구현</Text>
        <Text className="text-winelab-400 text-xs mt-1">expo-camera, expo-image-picker 필요</Text>
      </View>
    </View>
  );
}
