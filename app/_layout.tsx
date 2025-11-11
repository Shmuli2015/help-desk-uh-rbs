import { Stack } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import SplashScreen from "../components/SplashScreen";

export default function RootLayout() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible && (
        <SplashScreen onFinish={() => setIsSplashVisible(false)} />
      )}
      {!isSplashVisible && (
        <Stack>
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        </Stack>
      )}
    </View>
  );
}
