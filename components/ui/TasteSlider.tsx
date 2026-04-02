import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface TasteSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

export default function TasteSlider({ label, value, onValueChange }: TasteSliderProps) {
  return (
    <View className="gap-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-winelab-100 text-sm font-medium">{label}</Text>
        <Text className="text-winelab-300 text-sm">{value.toFixed(1)}</Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#A63030"
        maximumTrackTintColor="#6B1515"
        thumbTintColor="#E08080"
      />
    </View>
  );
}
