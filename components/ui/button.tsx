"use client";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  children: string;
  onPress: () => void;
  variant?: "primary" | "outline";
}

export default function Button({ children, onPress, variant = "primary" }: ButtonProps) {
  const containerClass =
    variant === "primary"
      ? "w-full bg-winelab-600 rounded-xl py-3.5 items-center"
      : "w-full border border-winelab-300 rounded-xl py-3.5 items-center";

  return (
    <TouchableOpacity className={containerClass} onPress={onPress} activeOpacity={0.8}>
      <Text className="text-white text-base font-semibold">{children}</Text>
    </TouchableOpacity>
  );
}
