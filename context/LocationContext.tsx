// app/(main)/context/LocationContext.tsx
import React, { createContext, useContext, useState } from "react";

type LocationContextType = {
  state: string;
  setState: (state: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState("NY"); // estado inicial
  const [loading, setLoading] = useState(false);

  return (
    <LocationContext.Provider value={{ state, setState, loading, setLoading }}>
      {children}
    </LocationContext.Provider>
  );
}
