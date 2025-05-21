// components/layout/HeaderLogoBack.tsx

import React from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { LinearGradient } from "expo-linear-gradient";

// Lista de estados (padrão EUA)
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

// Props do componente
type Props = {
  onMenuPress?: () => void;
  showMenu?: boolean;
  showStateSelector?: boolean;
  transparent?: boolean;
  logoAlign?: "left" | "center" | "right";
  title?: string;
};

export default function HeaderLogoBack({
  onMenuPress,
  showMenu = true,
  showStateSelector = true,
  transparent = false,
  logoAlign = "center",
  title,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const [state, setState] = React.useState("NY");
  const [modalVisible, setModalVisible] = React.useState(false);

  // Mostra menu hambúrguer APENAS na home ("/home")
  const isHome = pathname === "/home";

  // Define o alinhamento do logo dinamicamente
  let logoContainerAlign: "flex-start" | "center" | "flex-end";
  if (logoAlign === "left") logoContainerAlign = "flex-start";
  else if (logoAlign === "right") logoContainerAlign = "flex-end";
  else logoContainerAlign = "center";

  return (
    <LinearGradient
      colors={["#004AB1", "#007EFF"]}
      locations={[0, 0.41]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
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
        {/* Botão de menu/voltar */}
        {showMenu ? (
          <Pressable
            onPress={isHome ? onMenuPress : () => router.back()}
            style={styles.menuButton}
          >
            {isHome ? (
              <Entypo name="menu" size={28} color={Colors.white} />
            ) : (
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={Colors.white}
              />
            )}
          </Pressable>
        ) : (
          <View style={{ width: 44 }} />
        )}

        {/* LOGO centralizada, esquerda ou direita */}
        <View
          style={[styles.logoContainer, { alignItems: logoContainerAlign }]}
        >
          <Image
            source={require("@/assets/images/logo_01.png")}
            style={styles.logo}
          />
          {title ? <Text style={styles.title}>{title}</Text> : null}
        </View>

        {/* Seleção de Estado */}
        {showStateSelector ? (
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.stateButton}
          >
            <Entypo name="location-pin" size={20} color="#fff" />
            <Text style={styles.stateText}>{state}</Text>
            <MaterialIcons name="arrow-drop-down" size={22} color="#fff" />
          </Pressable>
        ) : (
          <View style={{ width: 50 }} />
        )}
      </ResponsiveContainer>

      {/* Modal de seleção de estado */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select your state</Text>
            <FlatList
              data={STATES}
              keyExtractor={(item) => item}
              numColumns={4}
              renderItem={({ item }) => {
                const isSelected = item === state;
                return (
                  <TouchableOpacity
                    style={[
                      styles.stateItem,
                      isSelected && styles.stateItemSelected,
                    ]}
                    onPress={() => {
                      setState(item);
                      setModalVisible(false);
                    }}
                    activeOpacity={0.7}
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
                        style={{ marginTop: 4 }}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: Platform.OS === "ios" ? 128 : 116,
    justifyContent: "center",
    zIndex: 999,
    elevation: 2,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    minHeight: 104,
  },
  menuButton: {
    padding: 6,
    zIndex: 3,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 110,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 2,
    letterSpacing: 0.15,
  },
  stateButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    height: 38,
    zIndex: 3,
  },
  stateText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 300,
  },
  modalTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  stateItem: {
    paddingVertical: 12,
    margin: 6,
    borderRadius: 8,
    width: "22%",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderColor: "transparent",
  },
  stateItemSelected: {
    backgroundColor: "#007EFF",
    borderColor: "#fff",
  },
  stateItemText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  stateItemTextSelected: {
    fontWeight: "bold",
    color: "#fff",
  },
});
