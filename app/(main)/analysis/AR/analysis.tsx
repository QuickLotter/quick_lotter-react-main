import { useLocation } from "@/app/(main)/context/LocationContext";
import AnalysisSelector from "@/app/(main)/analysis/AR/analysisselector";

export default function AnalysisPage() {
  const { state } = useLocation();
  return <AnalysisSelector key={state} />;
}
