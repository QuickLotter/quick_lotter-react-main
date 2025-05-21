// components/shared/ResponsiveContainer.tsx
import React from "react";
import { View, StyleSheet, useWindowDimensions, ViewProps } from "react-native";

type Props = ViewProps & {
  children: React.ReactNode;
};

export default function ResponsiveContainer({
  children,
  style,
  ...props
}: Props) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const containerStyle = isLargeScreen
    ? [styles.container, styles.largeScreen, style]
    : [styles.container, style];

  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
  largeScreen: {
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 0,
  },
});
