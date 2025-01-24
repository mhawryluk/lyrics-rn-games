import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="cryptogram" options={{}} />
    </Stack>
  );
}
