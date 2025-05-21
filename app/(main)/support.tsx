import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Ionicons,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

// Links oficiais
const LINKS = {
  telegram: "https://t.me/c/2304071549/2",
  facebook: "https://www.facebook.com/groups/1845986602501341",
  instagram: "https://instagram.com/quicklotter",
  youtube: "https://www.youtube.com/@quickylotter/videos",
};

export default function SupportScreen() {
  const insets = useSafeAreaInsets();

  // Função para abrir links externos
  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Espaço seguro abaixo do header */}
        <View style={{ height: insets.top + 20 }} />

        {/* Título */}
        <Text style={styles.title}>Support & Contact Us</Text>

        {/* Mensagem acolhedora */}
        <Text style={styles.subtitle}>
          Need help? Have a suggestion? Our support team is here to help you
          with anything related to Quick Lotter.
          {"\n"}
          {"\n"}
          We encourage you to join our official Telegram group for fast support,
          send questions, or suggest improvements to our app.
        </Text>

        {/* Botão principal - Telegram */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#229ED9" }]}
          onPress={() => handleOpenLink(LINKS.telegram)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="chatbubbles"
            size={28}
            color="#fff"
            style={{ marginRight: 16 }}
          />
          <View>
            <Text style={styles.cardTitle}>Join our Telegram Community</Text>
            <Text style={styles.cardDesc}>
              Chat directly with our team and other users.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Outras redes */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#4267B2" }]}
            onPress={() => handleOpenLink(LINKS.facebook)}
          >
            <FontAwesome name="facebook-square" size={22} color="#fff" />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#E4405F" }]}
            onPress={() => handleOpenLink(LINKS.instagram)}
          >
            <AntDesign name="instagram" size={22} color="#fff" />
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: "#FF0000" }]}
            onPress={() => handleOpenLink(LINKS.youtube)}
          >
            <FontAwesome name="youtube-play" size={22} color="#fff" />
            <Text style={styles.socialText}>YouTube</Text>
          </TouchableOpacity>
        </View>

        {/* Sugestão de feedback */}
        <View style={styles.feedbackBox}>
          <MaterialIcons name="feedback" size={20} color={Colors.primary} />
          <Text style={styles.feedbackText}>
            We love hearing your ideas! Send your suggestions or report issues
            and help us make Quick Lotter even better.
          </Text>
        </View>

        {/* Tempo de resposta */}
        <Text style={styles.responseTime}>
          Our team usually responds within 24 hours.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  container: {
    maxWidth: 768,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  title: {
    ...Typography.heading,
    fontSize: 24,
    textAlign: "center",
    color: Colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    color: Colors.text,
    fontSize: 16,
    marginBottom: 26,
    marginHorizontal: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    marginBottom: 22,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 2,
  },
  cardDesc: {
    color: "#e5e5e5",
    fontSize: 13,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
    gap: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    gap: 8,
    elevation: 2,
  },
  socialText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  feedbackBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  feedbackText: {
    color: Colors.text,
    fontSize: 15,
    flex: 1,
  },
  responseTime: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },
});
