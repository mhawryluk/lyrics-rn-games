import { Slot } from "expo-router";
import "../global.css";
import { SafeAreaView, View } from "react-native";

export default function RootLayout() {
  return (
      <View className="flex-1 bg-[#E1DDD2] p-8">
        <SafeAreaView className="flex-1">
          <Slot />
        </SafeAreaView>
      </View>
  );
}
