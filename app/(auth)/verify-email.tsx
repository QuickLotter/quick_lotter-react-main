import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import HeaderLoginLogo from "@/components/generator/layout/HeaderLoginLogo";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function VerifyEmail() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(22)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLoginLogo title="" />
      <View style={styles.content}>
        <Text style={styles.title}>Verify your email address</Text>
        <Text style={styles.desc}>
          We’ve sent a confirmation link to your email.{"\n"}
          Please confirm your account before continuing.
        </Text>
        <Animated.View
          style={{
            width: "100%",
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
        >
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
              <Text style={styles.buttonText}>Back to Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 18,
    textAlign: "center",
  },
  desc: {
    fontSize: 15,
    color: "#2A3046",
    textAlign: "center",
    marginBottom: 38,
    lineHeight: 22,
  },
  buttonShadow: {
    borderRadius: 16,
    shadowColor: "#007EFF",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
    marginTop: 2,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minWidth: 170,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.12,
  },
});
