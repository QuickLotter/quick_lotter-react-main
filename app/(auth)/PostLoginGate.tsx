import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useInitUserState } from "@/hooks/useInitUserState";
import { useLocation } from "@/app/(main)/context/LocationContext";
import SelectStateModal from "@/components/SelectStateModal";
import { useRouter } from "expo-router";

export default function PostLoginGate() {
  const { showModal, setShowModal } = useInitUserState();
  const { state, setState } = useLocation();
  const router = useRouter();

  useEffect(() => {
    if (state) {
      // Se já definiu o estado, navega para a Home
      //router.replace("/home");
    }
  }, [state]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Exibe um loading enquanto processa */}
      <ActivityIndicator size="large" color="#007EFF" />
      {/* Modal de seleção caso necessário */}
      <SelectStateModal
        visible={showModal}
        onSelect={(code) => {
          setState(code);
          setShowModal(false);
        }}
      />
    </View>
  );
}
