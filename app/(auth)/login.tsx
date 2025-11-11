import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import OrangeGradientBackground from "../../components/OrangeGradientBackground";

const { width, height } = Dimensions.get("window");

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const LoginScreen = () => {
  const [driverCode, setDriverCode] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Animation values
  const buttonScale = useSharedValue(1);
  const shimmerTranslate = useSharedValue(width);

  // Shimmer animation for button (right to left)
  React.useEffect(() => {
    shimmerTranslate.value = withRepeat(
      withSequence(
        withTiming(-width, { duration: 2000 }),
        withTiming(width, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

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

  const isButtonDisabled = !driverCode.trim() || !idNumber.trim();

  const handlePressIn = () => {
    if (isButtonDisabled) return;
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    if (isButtonDisabled) return;
    buttonScale.value = withSpring(1);
  };

  const handleLogin = () => {
    if (isButtonDisabled) return;
    // Add login logic here
    console.log("Login:", { driverCode, idNumber });
  };

  const inputAnimatedStyle = (fieldName: string) => {
    const isFocused = focusedField === fieldName;
    return {
      borderColor: isFocused ? "#FF8800" : "#e5e7eb",
      borderWidth: isFocused ? 2 : 1,
      transform: [{ scale: isFocused ? 1.02 : 1 }],
    };
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <OrangeGradientBackground>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.duration(800).delay(200)}
            style={styles.headerContainer}
          >
            <AnimatedImage
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
              entering={FadeInDown.duration(800).delay(0)}
            />
            <Text style={styles.welcomeText}>ברוכים הבאים</Text>
            <Text style={styles.subtitleText}>
              אנא הכנסו את פרטי ההתחברות שלכם
            </Text>
          </Animated.View>

          {/* Form Container */}
          <Animated.View
            entering={FadeInUp.duration(800).delay(400)}
            style={styles.formContainer}
          >
            {/* Driver Code Input */}
            <Animated.View
              entering={FadeInUp.duration(600).delay(600)}
              style={styles.inputWrapper}
            >
              <Text style={styles.label}>קוד כונן</Text>
              <AnimatedTextInput
                style={[styles.input, inputAnimatedStyle("driverCode")]}
                placeholder="הכנס קוד כונן"
                placeholderTextColor="#9ca3af"
                value={driverCode}
                onChangeText={setDriverCode}
                onFocus={() => setFocusedField("driverCode")}
                onBlur={() => setFocusedField(null)}
                keyboardType="numeric"
                textAlign="right"
              />
            </Animated.View>

            {/* ID Number Input */}
            <Animated.View
              entering={FadeInUp.duration(600).delay(800)}
              style={styles.inputWrapper}
            >
              <Text style={styles.label}>תעודת זהות</Text>
              <AnimatedTextInput
                style={[styles.input, inputAnimatedStyle("idNumber")]}
                placeholder="הכנס מספר תעודת זהות"
                placeholderTextColor="#9ca3af"
                value={idNumber}
                onChangeText={setIdNumber}
                onFocus={() => setFocusedField("idNumber")}
                onBlur={() => setFocusedField(null)}
                keyboardType="numeric"
                textAlign="right"
                maxLength={9}
              />
            </Animated.View>

            {/* Login Button */}
            <Animated.View entering={FadeInUp.duration(600).delay(1000)}>
              <Animated.View style={buttonAnimatedStyle}>
                <TouchableOpacity
                  style={[
                    styles.buttonContainer,
                    isButtonDisabled && styles.buttonContainerDisabled,
                  ]}
                  onPress={handleLogin}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  activeOpacity={0.9}
                  disabled={isButtonDisabled}
                >
                  <LinearGradient
                    colors={
                      isButtonDisabled
                        ? ["#CCCCCC", "#DDDDDD", "#EEEEEE"]
                        : ["#FF8800", "#FFAA44", "#FFBB44"]
                    }
                    style={styles.buttonGradient}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                  >
                    {!isButtonDisabled && (
                      <View style={styles.shimmerContainer}>
                        <Animated.View style={[styles.shimmer, shimmerStyle]} />
                      </View>
                    )}
                    <Text
                      style={[
                        styles.buttonText,
                        isButtonDisabled && styles.buttonTextDisabled,
                      ]}
                    >
                      התחבר
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </OrangeGradientBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 24,
    paddingTop: 60,
    minHeight: height,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: "#f3f4f6",
    textAlign: "center",
    opacity: 0.9,
  },
  formContainer: {
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
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    textAlign: "right",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    textAlign: "right",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 12,
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

export default LoginScreen;
