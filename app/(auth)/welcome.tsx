import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "./AuthContext";
import { useLocation } from "@/app/(main)/context/LocationContext";
import { supabase } from "./supabaseClient";

// Lista de estados (siglas)
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

const MAX_WIDTH = 380;

export default function Welcome() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { state, setState } = useLocation();

  const handleContinue = async () => {
    if (!state) return;
    setLoading(true);
    try {
      if (user?.id) {
        const { error } = await supabase
          .from("user_profiles")
          .update({ state })
          .eq("id", user.id);
        if (error) throw error;
      }
      setLoading(false);
      router.replace("/home");
    } catch (err) {
      Alert.alert("Error", "Could not save your state. Try again.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.bg}>
      <View style={styles.inner}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Quick Lotter!</Text>
        <Text style={styles.desc}>
          Ready to create your lucky combinations?{"\n"}
          <Text style={styles.descBold}>First, tell us your State.</Text>
        </Text>

        {/* Seletor de Estado */}
        <Pressable
          style={styles.selectorButton}
          onPress={() => setModalVisible(true)}
        >
          <Entypo
            name="location-pin"
            size={18}
            color="#2986F8"
            style={{ marginRight: 7 }}
          />
          <Text style={styles.selectorButtonText}>
            {state || "Select your state..."}
          </Text>
          <MaterialIcons
            name="arrow-drop-down"
            size={22}
            color="#2986F8"
            style={{ marginLeft: 7 }}
          />
        </Pressable>

        <View style={styles.btnWrap}>
          <Pressable
            onPress={handleContinue}
            disabled={!state || loading}
            style={[
              styles.continueBtn,
              (!state || loading) && { opacity: 0.6 },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.continueText}>Continue</Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Modal de seleção de estados */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#ecf1ff",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 32,
    shadowColor: "#007EFF",
    shadowOpacity: 0.09,
    shadowRadius: 17,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 38,
    paddingHorizontal: 28,
    marginHorizontal: 16,
  },
  logo: {
    width: 170,
    height: 92,
    marginBottom: 28,
    alignSelf: "center",

    borderRadius: 18,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    color: "#2986F8",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.07,
  },
  desc: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: "500",
    opacity: 0.98,
  },
  descBold: {
    color: "#2986F8",
    fontWeight: "700",
  },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1.4,
    borderColor: "#d5e3fa",
    backgroundColor: "#f6faff",
    paddingHorizontal: 20,
    paddingVertical: 13,
    minWidth: 140,
    marginBottom: 32,
    alignSelf: "center",
    shadowColor: "#2986F8",
    shadowOpacity: 0.03,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  selectorButtonText: {
    fontSize: 17,
    color: "#2986F8",
    fontWeight: "700",
    textAlign: "center",
    minWidth: 36,
    letterSpacing: 0.04,
  },
  btnWrap: {
    width: "100%",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 0,
  },
  continueBtn: {
    backgroundColor: "#2986F8",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: "center",
    minWidth: 180,
    width: "100%",
    shadowColor: "#007EFF",
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  continueText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.2,
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
    maxHeight: 480,
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
    width: 350,
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
    backgroundColor: "#2986F8",
    borderColor: "#fff",
    shadowColor: "#2986F8",
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
