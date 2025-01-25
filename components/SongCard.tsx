import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View, Image, Text, ImageBackground } from "react-native";

export function SongCard({
  title,
  artworkUrl,
  closeCallback,
  colorOverlay,
}: {
  title: string;
  artworkUrl: string;
  closeCallback: () => unknown;
  colorOverlay?: string;
}) {
  return (
    <ImageBackground
      src={artworkUrl}
      blurRadius={0}
      className="overflow-hidden rounded-3xl grayscale w-full absolute left-[50%] bottom-0 translate-x-[-50%] px-4 pt-6 pb-16 gap-4"
    >
      {colorOverlay && (
        <View
          className="absolute left-0 right-0 top-0 bottom-0 opacity-50"
          style={{ backgroundColor: colorOverlay }}
        />
      )}

      <Pressable className="self-end" onPress={closeCallback}>
        <Ionicons name="close" color="white" size={28} />
      </Pressable>

      <View className="justify-center items-center flex-1 gap-10">
        <Image className="w-[80%] aspect-square rounded-xl" src={artworkUrl} />
        <View className="gap-1 items-center">
          <Text className="text-white text-3xl font-extrabold">{title}</Text>
          <Text className="text-white text-xl font-light">Taylor Swift</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
