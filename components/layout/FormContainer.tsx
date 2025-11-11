import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface FormContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  style,
  delay = 400,
}) => {
  return (
    <Animated.View
      entering={FadeInUp.duration(800).delay(delay)}
      style={[styles.container, style]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
});

export default FormContainer;

