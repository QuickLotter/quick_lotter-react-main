//faz o app abrir nos celulares
import { Redirect } from "expo-router";

export default function Index() {
  // Redireciona para a página inicial real
  return <Redirect href="/(main)/home" />;
}
