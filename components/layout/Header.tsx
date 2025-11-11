import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface HeaderProps {
  title: string;
  subtitle?: string;
  logo?: ImageSourcePropType;
  logoStyle?: object;
  rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  logo,
  logoStyle,
  rightAction,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(800).delay(200)}
      style={styles.container}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          {logo && (
            <AnimatedImage
              source={logo}
              style={[styles.logo, logoStyle]}
              resizeMode="contain"
              entering={FadeInDown.duration(800).delay(0)}
            />
          )}
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightAction && <View style={styles.rightActionContainer}>{rightAction}</View>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 48,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  rightActionContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#f3f4f6",
    textAlign: "center",
    opacity: 0.9,
  },
});

export default Header;

