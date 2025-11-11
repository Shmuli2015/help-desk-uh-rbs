import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const AnimatedView = Animated.createAnimatedComponent(View);

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  showShimmer?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  showShimmer = false,
  disabled = false,
  onPressIn,
  onPressOut,
  style,
  ...props
}) => {
  const buttonScale = useSharedValue(1);
  const shimmerTranslate = useSharedValue(width);

  React.useEffect(() => {
    if (showShimmer && !disabled) {
      shimmerTranslate.value = withRepeat(
        withSequence(
          withTiming(-width, { duration: 2000 }),
          withTiming(width, { duration: 0 })
        ),
        -1,
        false
      );
    }
  }, [showShimmer, disabled]);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shimmerTranslate.value }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handlePressIn = (e: any) => {
    if (disabled) return;
    buttonScale.value = withSpring(0.95);
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    if (disabled) return;
    buttonScale.value = withSpring(1);
    onPressOut?.(e);
  };

  const gradientColors =
    variant === "primary"
      ? disabled
        ? ["#CCCCCC", "#DDDDDD", "#EEEEEE"]
        : ["#FF8800", "#FFAA44", "#FFBB44"]
      : disabled
        ? ["#CCCCCC", "#DDDDDD"]
        : ["#6b7280", "#9ca3af"];

  return (
    <AnimatedView style={[buttonAnimatedStyle, style]}>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          disabled && styles.buttonContainerDisabled,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        disabled={disabled}
        {...props}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.buttonGradient}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        >
          {showShimmer && !disabled && (
            <View style={styles.shimmerContainer}>
              <AnimatedView style={[styles.shimmer, shimmerStyle]} />
            </View>
          )}
          <Text
            style={[
              styles.buttonText,
              disabled && styles.buttonTextDisabled,
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#FF8800",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonContainerDisabled: {
    opacity: 0.6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  shimmerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  shimmer: {
    width: "200%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    right: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  buttonTextDisabled: {
    color: "#999999",
  },
});

export default Button;

