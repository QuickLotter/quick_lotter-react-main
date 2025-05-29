// /hooks/useInitUserState.ts
import { useEffect, useState } from "react";
import { useLocation } from "@/app/(main)/context/LocationContext";
import { getStateFromIP } from "@/utils/getStateFromIP";

export function useInitUserState() {
  const { state, setState, loading } = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Se já tem estado, não faz nada
    if (loading || state) return;
    // Tenta detectar pelo IP
    getStateFromIP().then((detected) => {
      if (detected) {
        setState(detected);
      } else {
        setShowModal(true); // Mostra modal se falhar
      }
    });
  }, [loading, state]);

  return { showModal, setShowModal };
}
