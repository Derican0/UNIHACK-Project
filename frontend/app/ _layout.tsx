import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Ghastly": require("../assets/fonts/Ghastly Panic.ttf"),
    "HelpMe": require("../assets/fonts/HelpMe.ttf"),
    "Rock3D": require("../assets/fonts/Rock3D-Regular.ttf"),
    "Rubiklso-Regular":require("../assets/fonts/Rubiklso-Regular.ttf"),
    "Tiny5-Regular":require("../assets/fonts/Tiny5-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#D32F2F" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
