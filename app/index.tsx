import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="./cryptogram" asChild>
        <Pressable>
          <Text>Cryptogram</Text>
        </Pressable>
      </Link>
    </View>
  );
}
