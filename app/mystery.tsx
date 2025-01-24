import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Mystery() {
  return (
    <View>
      <View className="flex-row gap-4 items-center justify-between self-stretch py-4">
        <Link
          href="/"
          asChild
          className="bg-[#AE7268] p-2 rounded-xl items-center opacity-50"
        >
          <Pressable>
            <Text className="text-xl text-white font-bold">Back</Text>
          </Pressable>
        </Link>

        <Text className="text-[#AE7268] text-2xl font-bold">
          Mystery Lyrics
        </Text>

        <Link
          href="/"
          asChild
          className="bg-[#AE7268] p-2 rounded-xl items-center opacity-50"
        >
          <Pressable>
            <Text className="text-xl text-white font-bold">Options</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
