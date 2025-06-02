import { useLocation } from "@/app/(main)/context/LocationContext";
import AnalysisSelector from "@/app/(main)/analysis/AZ/analysisselector";

export default function AnalysisPage() {
  const { state } = useLocation();
  return <AnalysisSelector key={state} />;
}
