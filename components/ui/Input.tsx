import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const scale = useSharedValue(1);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    scale.value = withSpring(1.02);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    scale.value = withSpring(1);
    onBlur?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <AnimatedView style={animatedStyle}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isFocused ? "#FF8800" : "#e5e7eb",
              borderWidth: isFocused ? 2 : 1,
            },
            style,
          ]}
          placeholderTextColor="#9ca3af"
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAlign="right"
          autoCorrect={false}
          spellCheck={false}
          importantForAutofill="no"
          {...props}
        />
      </AnimatedView>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    textAlign: "right",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  error: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 4,
    textAlign: "right",
  },
});

export default Input;
