import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Platform,
} from "react-native";
import HeaderLoginLogo from "@/components/generator/layout/HeaderLoginLogo";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function VerifySuccess() {
  const router = useRouter();

  // Bounce-in animation for the check icon
  const scaleAnim = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLoginLogo title="" />
      <View style={styles.content}>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            shadowColor: "#36C663",
            shadowOpacity: 0.18,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 7,
            marginBottom: 18,
          }}
        >
          <MaterialIcons name="check-circle" size={96} color="#36C663" />
        </Animated.View>
        <Text style={styles.title}>Verification Successful!</Text>
        <Text style={styles.desc}>
          Your email has been successfully verified.
          <br />
          You can now access all app features.
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonShadow}
          onPress={() => router.replace("/login")}
        >
          <LinearGradient
            colors={["#009FFF", "#007EFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#36C663",
    textAlign: "center",
    marginBottom: 14,
    letterSpacing: 0.1,
    textShadowColor: "#E6FAEF",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  desc: {
    fontSize: 16.5,
    color: "#334",
    textAlign: "center",
    marginBottom: 38,
    lineHeight: 22,
    fontWeight: "500",
    opacity: 0.96,
  },
  buttonShadow: {
    width: "100%",
    borderRadius: 18,
    shadowColor: "#007EFF",
    shadowOpacity: 0.11,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginTop: 8,
  },
  button: {
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 38,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17.5,
    letterSpacing: 0.2,
    textShadowColor: "#0058A3aa",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
