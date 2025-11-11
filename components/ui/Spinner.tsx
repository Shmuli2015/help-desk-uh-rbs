import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface SpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  color = "#FF8800",
  strokeWidth = 3,
}) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Convert hex color to rgba for opacity
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const baseColor = hexToRgba(color, 0.15);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Base ring with light opacity */}
      <View
        style={[
          styles.baseRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: baseColor,
          },
        ]}
      />
      {/* Rotating arc - covers about 60% of the circle */}
      <Animated.View
        style={[
          animatedStyle,
          styles.rotatingArc,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderTopColor: color,
            borderRightColor: color,
            borderTopRightRadius: size / 2,
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  baseRing: {
    position: "absolute",
  },
  rotatingArc: {
    position: "absolute",
  },
});

export default Spinner;

