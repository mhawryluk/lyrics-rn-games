import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Cryptogram() {
  return (
    <View>
      <View className="flex-row gap-4 items-center justify-between self-stretch py-4">
        <Link href="/" asChild className="p-2 items-center">
          <Pressable>
            <Ionicons
              name="chevron-back"
              className="text-white"
              color="#87A6BB"
              size={20}
            />
          </Pressable>
        </Link>

        <Text className="text-[#87A6BB] text-xl font-bold">Cryptogram</Text>

        <Pressable className="p-2 items-center">
          <Ionicons
            name="menu"
            className="text-white"
            color="#87A6BB"
            size={24}
          />
        </Pressable>
      </View>
    </View>
  );
}
