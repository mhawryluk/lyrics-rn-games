import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View, Image, Text } from "react-native";

export function SongCard({
  title,
  artworkUrl,
  closeCallback,
}: {
  title: string;
  artworkUrl: string;
  closeCallback: () => unknown;
}) {
  return (
    <View className="shadow rounded-2xl bg-[#E1DDD2] w-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] px-4 pt-6 pb-10 gap-4">
      <Pressable className="self-end" onPress={closeCallback}>
        <Ionicons name="close" color="#2E364B" size={28} />
      </Pressable>

      <View className="justify-center items-center flex-1 gap-10">
        <Image className="w-[80%] aspect-square" src={artworkUrl} />
        <View className="gap-1 items-center">
          <Text className="text-[#2E364B] text-3xl font-extrabold">
            {title}
          </Text>
          <Text className="text-[#2E364B] text-xl font-light">
            Taylor Swift
          </Text>
        </View>
      </View>
    </View>
  );
}
