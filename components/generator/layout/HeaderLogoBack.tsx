import React, { useRef } from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { LinearGradient } from "expo-linear-gradient";
import { useLocation } from "@/app/(main)/context/LocationContext";

// Lista de siglas dos estados
const STATES = [
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "VT",
  "VA",
  "WA",
  "DC",
  "WV",
  "WI",
  "WY",
];

type Props = {
  onMenuPress?: () => void;
  onBack?: () => void;
  showMenu?: boolean;
  showStateSelector?: boolean;
  transparent?: boolean;
  logoAlign?: "left" | "center" | "right";
  title?: string;
};

export default function HeaderLogoBack({
  onMenuPress,
  onBack,
  showMenu = true,
  showStateSelector = true,
  transparent = false,
  logoAlign = "center",
  title,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { state, setState } = useLocation();
  const [modalVisible, setModalVisible] = React.useState(false);

  // Animação de toque para botão (escala)
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
      speed: 24,
      bounciness: 7,
    }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 24,
      bounciness: 7,
    }).start();

  const isHome = pathname === "/home";
  const hideBackRoutes = ["/analysis", "/overview", "/checker"];
  const showBackButton = !hideBackRoutes.includes(pathname);

  let logoContainerAlign: "flex-start" | "center" | "flex-end";
  if (logoAlign === "left") logoContainerAlign = "flex-start";
  else if (logoAlign === "right") logoContainerAlign = "flex-end";
  else logoContainerAlign = "center";

  return (
    <LinearGradient
      colors={["#004AB1", "#007EFF"]}
      locations={[0, 0.44]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.wrapper,
        transparent && {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        { paddingTop: insets.top },
      ]}
    >
      <ResponsiveContainer style={styles.inner}>
        {/* Menu ou Back */}
        {showMenu ? (
          <Pressable
            onPress={
              isHome
                ? onMenuPress
                : showBackButton
                ? onBack
                  ? onBack
                  : () => router.back()
                : undefined
            }
            style={styles.menuButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            hitSlop={10}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              {isHome ? (
                <Entypo name="menu" size={28} color={Colors.white} />
              ) : showBackButton ? (
                <MaterialIcons
                  name="arrow-back-ios"
                  size={24}
                  color={Colors.white}
                />
              ) : (
                <View style={{ width: 24 }} />
              )}
            </Animated.View>
          </Pressable>
        ) : (
          <View style={{ width: 44 }} />
        )}

        {/* Logo + Título */}
        <View
          style={[
            styles.logoContainer,
            { alignItems: logoContainerAlign },
            title && { flexDirection: "column" },
          ]}
        >
          <Image
            source={require("@/assets/images/logo_01.png")}
            style={styles.logo}
          />
          {title ? <Text style={styles.title}>{title}</Text> : null}
        </View>

        {/* Selector do Estado */}
        {showStateSelector ? (
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.stateButton}
            hitSlop={8}
          >
            <Entypo name="location-pin" size={20} color="#fff" />
            <Text style={styles.stateText}>{state || "??"}</Text>
            <MaterialIcons name="arrow-drop-down" size={22} color="#fff" />
          </Pressable>
        ) : (
          <View style={{ width: 50 }} />
        )}
      </ResponsiveContainer>

      {/* Modal de seleção de estado iOS-style com ScrollView */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Animated.View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select your state</Text>
            <ScrollView
              contentContainerStyle={styles.stateGrid}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.gridWrapper}>
                {STATES.map((item) => {
                  const isSelected = item === state;
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.stateItem,
                        isSelected && styles.stateItemSelected,
                      ]}
                      onPress={() => {
                        setState(item);
                        setModalVisible(false);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.stateItemText,
                          isSelected && styles.stateItemTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                      {isSelected && (
                        <MaterialIcons
                          name="check"
                          size={18}
                          color="#fff"
                          style={{ marginTop: 2 }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: Platform.OS === "ios" ? 126 : 112,
    justifyContent: "center",
    zIndex: 999,
    elevation: 3,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: "#007EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    minHeight: 96,
  },
  menuButton: {
    padding: 6,
    zIndex: 3,
    width: 44,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 110,
    height: 48,
    resizeMode: "contain",
    borderRadius: 13,

    alignSelf: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginTop: 3,
    letterSpacing: 0.15,
    opacity: 0.97,
  },
  stateButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    height: 38,
    zIndex: 3,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  stateText: {
    color: "#fff",
    fontSize: 16.3,
    marginHorizontal: 4,
    fontWeight: "600",
    letterSpacing: 0.07,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.28)",
    paddingBottom: 0,
  },
  modalContent: {
    backgroundColor: "#FAFAFF",
    padding: 22,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    maxHeight: 480, // Limita altura para manter scroll em telas pequenas
    minHeight: 304,
    shadowColor: "#007EFF",
    shadowOpacity: 0.13,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -8 },
    elevation: 24,
  },
  modalTitle: {
    color: "#092058",
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: 0.11,
  },
  stateGrid: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 12,
  },
  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 350, // Mantém grid fixo
    alignSelf: "center",
  },
  stateItem: {
    paddingVertical: 13,
    margin: 6,
    borderRadius: 8,
    width: 74,
    alignItems: "center",
    backgroundColor: "#F3F6FB",
    borderWidth: 1,
    borderColor: "transparent",
    elevation: 1,
  },
  stateItemSelected: {
    backgroundColor: "#007EFF",
    borderColor: "#fff",
    shadowColor: "#007EFF",
    shadowOpacity: 0.19,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  stateItemText: {
    fontSize: 14.2,
    fontWeight: "600",
    color: "#222",
    letterSpacing: 0.09,
  },
  stateItemTextSelected: {
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.12,
  },
});
