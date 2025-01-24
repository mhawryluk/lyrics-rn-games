import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-[#FDF7E9]">
      <Link
        href="./cryptogram"
        asChild
        className="bg-[#A9C7A5] p-6 rounded-3xl"
      >
        <Pressable>
          <Text className="text-3xl text-black font-bold">Cryptogram</Text>
        </Pressable>
      </Link>
    </View>
  );
}
