// app/_layout.tsx

import React, { useRef, useEffect } from "react";
import { Slot, useRouter, usePathname } from "expo-router";
import { AuthProvider } from "@/app/(auth)/AuthContext";
import {
  LocationProvider,
  useLocation,
} from "@/app/(main)/context/LocationContext";

// (Opcional) redirecionamento ao trocar de estado
function StateRedirector() {
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useLocation();
  const lastState = useRef(state);

  useEffect(() => {
    if (lastState.current !== state) {
      // Se quiser redirecionar ao trocar estado, descomente:
      // router.replace("/home");
      lastState.current = state;
    }
  }, [state]);

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LocationProvider>
        <StateRedirector />
        <Slot /> {/* Renderiza as rotas filhos do app */}
      </LocationProvider>
    </AuthProvider>
  );
}
