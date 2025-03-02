import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Daily() {
  return (
    <View className="flex-1">
      <View className="flex-row gap-4 items-center justify-between self-stretch py-4">
        <Link href="/" asChild className="p-2 items-center">
          <Pressable>
            <Ionicons
              name="chevron-back"
              className="text-white"
              color="#AE7268"
              size={20}
            />
          </Pressable>
        </Link>

        <Text className="text-[#AE7268] text-xl font-bold">
          Lyric of the Day
        </Text>

        <View className="p-2 items-center opacity-0">
          <Ionicons
            name="menu"
            className="text-white"
            color="#AE7268"
            size={24}
          />
        </View>
      </View>

      <View className="flex-1 pt-20">
        <LyricCard />
      </View>
    </View>
  );
}

function LyricCard() {
  return (
    <View className="bg-[#AE7268] rounded-xl justify-center text-center items-center py-10 px-4">
      <Text className="text-white font-bold font-mono text-xl leading-10">
        {lyrics}
      </Text>

      <Text className="text-white font-bold font-mono text-md leading-10">
        "my tears ricochet" (folklore, 2020)
      </Text>
    </View>
  );
}

const lyrics = `\
We gather stones, 
never knowing what they'll mean
Some to throw, 
some to make a diamond ring
`;
