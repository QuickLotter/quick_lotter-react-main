import React, { useRef, useEffect } from "react";
import { Slot, useRouter, usePathname } from "expo-router";
import {
  LocationProvider,
  useLocation,
} from "@/app/(main)/context/LocationContext";

// Componente para forçar redirect para /home ao trocar estado
function StateRedirector() {
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useLocation();
  const lastState = useRef(state);

  useEffect(() => {
    if (lastState.current !== state) {
      // Se mudou o estado, força redirect para a Home (não importa de onde veio)
      //router.replace("/home");
      lastState.current = state;
    }
  }, [state]);

  return null;
}

export default function RootLayout() {
  return (
    <LocationProvider>
      <StateRedirector />
      <Slot />
    </LocationProvider>
  );
}
