import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
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
      withTiming(360, { duration: 1000 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          animatedStyle,
          {
            width: size,
            height: size,
            borderWidth: strokeWidth,
            borderColor: color,
            borderTopColor: "transparent",
            borderRadius: size / 2,
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
  },
});

export default Spinner;

