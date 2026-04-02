import { TextInput, View, Text, KeyboardTypeOptions } from "react-native";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}: InputProps) {
  return (
    <View className="gap-1.5">
      {label && (
        <Text className="text-winelab-100 text-sm font-medium">{label}</Text>
      )}
      <TextInput
        className="bg-winelab-800 text-white rounded-xl px-4 py-3 text-base"
        placeholder={placeholder}
        placeholderTextColor="#E08080"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}
