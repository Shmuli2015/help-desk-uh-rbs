import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const LoginScreen = () => {
  const [driverCode, setDriverCode] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Animation values
  const buttonScale = useSharedValue(1);
  const shimmerTranslate = useSharedValue(-width);

  // Shimmer animation for button
  React.useEffect(() => {
    shimmerTranslate.value = withRepeat(
      withSequence(
        withTiming(width, { duration: 2000 }),
        withTiming(-width, { duration: 0 })
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

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const handleLogin = () => {
    // Add login logic here
    console.log('Login:', { driverCode, idNumber });
  };

  const inputAnimatedStyle = (fieldName: string) => {
    const isFocused = focusedField === fieldName;
    return {
      borderColor: isFocused ? '#6366f1' : '#e5e7eb',
      borderWidth: isFocused ? 2 : 1,
      transform: [{ scale: isFocused ? 1.02 : 1 }],
    };
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.duration(800).delay(200)}
            style={styles.headerContainer}
          >
            <Text style={styles.welcomeText}>ברוכים הבאים</Text>
            <Text style={styles.subtitleText}>אנא הכנסו את פרטי ההתחברות שלכם</Text>
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
                style={[styles.input, inputAnimatedStyle('driverCode')]}
                placeholder="הכנס קוד כונן"
                placeholderTextColor="#9ca3af"
                value={driverCode}
                onChangeText={setDriverCode}
                onFocus={() => setFocusedField('driverCode')}
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
                style={[styles.input, inputAnimatedStyle('idNumber')]}
                placeholder="הכנס מספר תעודת זהות"
                placeholderTextColor="#9ca3af"
                value={idNumber}
                onChangeText={setIdNumber}
                onFocus={() => setFocusedField('idNumber')}
                onBlur={() => setFocusedField(null)}
                keyboardType="numeric"
                textAlign="right"
                maxLength={9}
              />
            </Animated.View>

            {/* Login Button */}
            <Animated.View
              entering={FadeInUp.duration(600).delay(1000)}
              style={buttonAnimatedStyle}
            >
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleLogin}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#6366f1', '#8b5cf6', '#a855f7']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={styles.shimmerContainer}>
                    <Animated.View style={[styles.shimmer, shimmerStyle]} />
                  </View>
                  <Text style={styles.buttonText}>התחבר</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    minHeight: height,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#f3f4f6',
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    textAlign: 'right',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  shimmerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default LoginScreen;