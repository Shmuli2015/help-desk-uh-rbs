import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { I18nManager, Platform, View } from "react-native";
import "react-native-reanimated";
import SplashScreen from "../components/layout/SplashScreen";

export default function RootLayout() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Force RTL layout for Hebrew support
    if (!I18nManager.isRTL && Platform.OS !== "web") {
      I18nManager.forceRTL(true);
      // Note: On Android, changing RTL requires app restart
      // For development, you can uncomment the following line to restart automatically:
      // Updates.reloadAsync();
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible && (
        <SplashScreen onFinish={() => setIsSplashVisible(false)} />
      )}
      {!isSplashVisible && (
        <Stack>
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      )}
    </View>
  );
}
