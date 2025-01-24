import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-around items-center">
      <Text className="text-4xl font-extrabold text-[#2E364B]">
        Pubwe Lyric Games
      </Text>
      <Link
        href="./cryptogram"
        asChild
        className="bg-[#87A6BB] p-6 rounded-3xl self-stretch items-center"
      >
        <Pressable>
          <Text className="text-2xl text-white font-bold">Cryptogram</Text>
        </Pressable>
      </Link>

      <Text className="text-small font-light text-[#2E364B]">
        Created by M. Hawryluk, 2025
      </Text>
    </View>
  );
}
