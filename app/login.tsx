import { useState } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-winelab-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-8 py-12">
          <View className="gap-8">
            {/* 제목 */}
            <Text className="text-white text-2xl font-semibold">로그인</Text>

            {/* 입력 필드 */}
            <View className="gap-4">
              <Input
                label="이메일"
                placeholder="user@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Input
                label="비밀번호"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* 로그인 버튼 */}
            <Button onPress={() => router.push("/onboarding")}>로그인</Button>

            {/* 회원가입 링크 */}
            <View className="flex-row justify-center gap-1">
              <Text className="text-winelab-300 text-sm">계정이 없으신가요?</Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text className="text-winelab-100 text-sm font-medium">회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
