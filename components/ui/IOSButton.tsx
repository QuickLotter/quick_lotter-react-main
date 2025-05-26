import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Universal iOS Button (primário)
export function IOSButton({
  title,
  onPress,
  color = "#007AFF",
  textColor = "#fff",
  icon,
  iconRight,
  loading = false,
  disabled = false,
  style,
  ...props
}: {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  icon?: string; // ex: "arrow-forward"
  iconRight?: string; // ex: "chevron-forward"
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, opacity: disabled ? 0.7 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.88}
      {...props}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={21}
          color={textColor}
          style={{ marginRight: 10, marginTop: 1 }}
        />
      )}
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      )}
      {iconRight && (
        <Ionicons
          name={iconRight}
          size={21}
          color={textColor}
          style={{ marginLeft: 10, marginTop: 1 }}
        />
      )}
    </TouchableOpacity>
  );
}

// iOS Outline Button (secundário)
export function IOSButtonOutline({
  title,
  onPress,
  color = "#007AFF",
  icon,
  iconRight,
  style,
  ...props
}: {
  title: string;
  onPress: () => void;
  color?: string;
  icon?: string;
  iconRight?: string;
  style?: any;
}) {
  return (
    <TouchableOpacity
      style={[styles.buttonOutline, { borderColor: color }, style]}
      onPress={onPress}
      activeOpacity={0.85}
      {...props}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={color}
          style={{ marginRight: 10 }}
        />
      )}
      <Text style={[styles.buttonTextOutline, { color }]}>{title}</Text>
      {iconRight && (
        <Ionicons
          name={iconRight}
          size={20}
          color={color}
          style={{ marginLeft: 10 }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 999,
    shadowColor: "#007AFF",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 17,
    elevation: Platform.OS === "android" ? 3 : 0,
    marginVertical: 2,
    marginBottom: 2,
    minHeight: 54,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.1,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  buttonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 2,
    backgroundColor: "#FFF",
    marginVertical: 2,
    minHeight: 52,
  },
  buttonTextOutline: {
    fontSize: 17,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
});
