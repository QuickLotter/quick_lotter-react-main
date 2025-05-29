// /context/LocationContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Tipagem do contexto
 */
type LocationContextType = {
  state: string | null;
  setState: (newState: string) => void;
  loading: boolean;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

/**
 * Provider global para localização (estado)
 */
export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [state, setStateRaw] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recupera do AsyncStorage na inicialização
    AsyncStorage.getItem("user_state").then((stored) => {
      if (stored) setStateRaw(stored);
      setLoading(false);
    });
  }, []);

  const setState = (newState: string) => {
    setStateRaw(newState);
    AsyncStorage.setItem("user_state", newState);
  };

  return (
    <LocationContext.Provider value={{ state, setState, loading }}>
      {children}
    </LocationContext.Provider>
  );
}

/**
 * Hook customizado para acessar o contexto de localização
 */
export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
}
