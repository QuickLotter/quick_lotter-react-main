import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// You can use either PNG or SVG, depending on your preference
import AppStoreBadge from "@/assets/icons/app-store-apple.png"; // or .svg if you prefer
import GooglePlayBadge from "@/assets/icons/google-play.png"; // or .svg if you prefer
import { useRouter } from "expo-router";

export default function Paywall() {
  const router = useRouter();

  const appleStoreUrl = "https://apps.apple.com/app/quick-lotter";
  const googlePlayUrl =
    "https://play.google.com/store/apps/details?id=quick.lotter";

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name="lock-closed-outline" size={56} color="#007EFF" />
      </View>
      <Text style={styles.title}>Restricted Access</Text>
      <Text style={styles.desc}>
        Your free trial has ended.{"\n"}
        To continue, please subscribe and unlock all Quick Lotter features.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert("Coming soon: In-app subscription flow");
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Subscribe Now</Text>
      </TouchableOpacity>
      <View style={styles.storeRow}>
        <TouchableOpacity
          style={styles.badgeButton}
          onPress={() => Linking.openURL(appleStoreUrl)}
          activeOpacity={0.8}
        >
          <Image
            source={AppStoreBadge}
            style={styles.storeBadge}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.badgeButton}
          onPress={() => Linking.openURL(googlePlayUrl)}
          activeOpacity={0.8}
        >
          <Image
            source={GooglePlayBadge}
            style={styles.storeBadge}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF1FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#007EFF",
        shadowOpacity: 0.13,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 6,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#007EFF",
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  desc: {
    color: "#222",
    fontSize: 16.5,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#007EFF",
    paddingVertical: 16,
    paddingHorizontal: 54,
    borderRadius: 19,
    marginTop: 6,
    minWidth: 220,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#007EFF",
        shadowOpacity: 0.16,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
      },
      android: { elevation: 2 },
    }),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.4,
  },
  storeRow: {
    flexDirection: "row",
    marginTop: 36,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeButton: {
    borderRadius: 10,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#222",
        shadowOpacity: 0.09,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 1 },
    }),
  },
  storeBadge: {
    width: 142,
    height: 44,
  },
});
