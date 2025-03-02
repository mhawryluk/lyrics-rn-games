import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 justify-around items-center">
      <Text className="text-6xl font-extrabold text-pw-navy">
        Pubwe <Text className="opacity-50">Lyrics Games</Text>
      </Text>

      <View className="self-stretch gap-4">
        <Link
          href="./cryptogram"
          asChild
          className="bg-pw-orange p-6 rounded-3xl self-stretch items-center"
        >
          <Pressable>
            <Text className="text-2xl text-white font-bold">🤔 Cryptogram</Text>
          </Pressable>
        </Link>

        <Link
          href="./mystery"
          asChild
          className="bg-pw-green p-6 rounded-3xl self-stretch items-center"
        >
          <Pressable>
            <Text className="text-2xl text-white font-bold">
              🔎 Mystery Lyrics
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
