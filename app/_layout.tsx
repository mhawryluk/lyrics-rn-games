import { Slot } from "expo-router";
import "../global.css";
import { SafeAreaView, View } from "react-native";
import { useDevice } from "react-native-wgpu";
import { useMemo } from "react";
import tgpu from "typegpu";
import { RootContext } from "@/components/gpuUtils";

export default function RootLayout() {
  const { device } = useDevice();
  const root = useMemo(
    () => (device ? tgpu.initFromDevice({ device }) : null),
    [device]
  );

  if (root === null) {
    return null;
  }

  return (
    <RootContext.Provider value={root}>
      <View className="flex-1 bg-[#E1DDD2] p-8">
        <SafeAreaView className="flex-1">
          <Slot />
        </SafeAreaView>
      </View>
    </RootContext.Provider>
  );
}
