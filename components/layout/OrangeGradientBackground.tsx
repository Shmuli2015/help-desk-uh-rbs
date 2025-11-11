import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ColorValue, StyleSheet, ViewStyle } from "react-native";

interface OrangeGradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const OrangeGradientBackground: React.FC<OrangeGradientBackgroundProps> = ({
  children,
  style,
  colors = ["#FF8800", "#FFAA44", "#FFCC66"] as const,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.gradient, style]}
      start={start}
      end={end}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default OrangeGradientBackground;
