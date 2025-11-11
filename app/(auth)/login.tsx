import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import FormContainer from "../../components/layout/FormContainer";
import Header from "../../components/layout/Header";
import OrangeGradientBackground from "../../components/layout/OrangeGradientBackground";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const LoginScreen = () => {
  const router = useRouter();
  const [driverCode, setDriverCode] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled = !driverCode.trim() || !idNumber.trim();

  const handleLogin = async () => {
    if (isButtonDisabled || isLoading) return;

    setIsLoading(true);

    try {
      // Add login logic here
      console.log("Login:", { driverCode, idNumber });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to main tabs screen after successful login
      router.replace("/(tabs)/new-request");
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <OrangeGradientBackground style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Header
            logo={require("../../assets/images/logo.png")}
            title="ברוכים הבאים"
            subtitle="אנא הכנסו את פרטי ההתחברות שלכם"
          />

          <FormContainer>
            <Animated.View entering={FadeInUp.duration(600).delay(600)}>
              <Input
                label="קוד כונן"
                placeholder="הכנס קוד כונן"
                value={driverCode}
                onChangeText={setDriverCode}
                keyboardType="numeric"
              />
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(600).delay(800)}>
              <Input
                label="תעודת זהות"
                placeholder="הכנס מספר תעודת זהות"
                value={idNumber}
                onChangeText={setIdNumber}
                keyboardType="numeric"
                maxLength={9}
              />
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(600).delay(1000)}>
              <Button
                title="התחבר"
                onPress={handleLogin}
                disabled={isButtonDisabled}
                loading={isLoading}
                showShimmer={!isButtonDisabled && !isLoading}
                style={styles.button}
              />
            </Animated.View>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </OrangeGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  button: {
    marginTop: 12,
  },
});

export default LoginScreen;
