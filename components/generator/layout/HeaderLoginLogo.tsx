import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "@/assets/images/logo.png";

type Props = { title?: string };

export default function HeaderLoginLogo({ title }: Props) {
  return (
    <View style={styles.headerWrapper}>
      <LinearGradient
        colors={["#004AB1", "#007EFF"]}
        locations={[0, 0.41]} // <-- aqui está o segredo!
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%",
    alignItems: "center",
  },
  headerGradient: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    minHeight: 112,
    paddingTop: 32,
    paddingBottom: 14,
    overflow: "hidden",
  },
  logo: {
    width: 120,
    height: 56,
    alignSelf: "center",
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.2,
    textAlign: "center",
  },
});
