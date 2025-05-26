import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Feather,
} from "@expo/vector-icons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQS = [
  {
    question: "How do I reset my password?",
    answer:
      "Go to Settings > Security > Change Password. If you forgot your password, tap 'Forgot Password?' on the login screen and follow the instructions sent to your email.",
  },
  {
    question: "Where do I check my lottery tickets?",
    answer:
      "Go to Home > My Lines or use the 'Check Numbers' section for the game you played. You can see all your tickets, results, and prize info there.",
  },
  {
    question: "How can I update my payment method?",
    answer:
      "Open Settings > Payment. Tap 'Update Card' and enter your new card details. All subscriptions and future charges will use this new payment method.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Go Menu > Profile > Transactions > Cancel Subscription. You will keep your benefits until the end of the paid period. If subscribed via Apple/Google, cancel in your app store.",
  },
  {
    question: "I didn't receive my verification code. What do I do?",
    answer:
      "First, check your spam or promotions folder. If you still can't find it, tap 'Resend Code' on the verification screen or contact support for help.",
  },
  {
    question: "How do I enable Two-Factor Authentication?",
    answer:
      "Go to Settings > Security > 2-Step Authentication. Turn on your preferred option (email or SMS) and follow the on-screen instructions.",
  },
  {
    question: "Can I use Quick Lotter tools outside the United States?",
    answer:
      "No, currently only users physically located in the United States are eligible to use the tools through Quick Lotter.",
  },
  {
    question: "How can I delete my account?",
    answer:
      "If you wish to permanently close your account, go to Settings > Close Account and follow the steps. You can also contact support for assistance.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can chat live via Telegram, email us, or message via our social networks. See the options above for the fastest way.",
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Yes! We use bank-level encryption, never sell your data, and follow strict privacy guidelines. See our Privacy Policy for details.",
  },
  // Adicione mais FAQs conforme necessário...
];

const LINKS = {
  telegram: "https://t.me/c/2304071549/2",
  facebook: "https://www.facebook.com/groups/1845986602501341",
  instagram: "https://instagram.com/quicklotter",
  youtube: "https://www.youtube.com/@quickylotter/videos",
  email: "mailto:support@quicklotter.com",
};

export default function SupportScreen() {
  const insets = useSafeAreaInsets();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleOpenLink = (url: string) => Linking.openURL(url);
  const handleToggleFAQ = (idx: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  return (
    <View style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: insets.top + 16 }} />

        {/* Title */}
        <Text style={styles.title}>Support & Help Center</Text>

        {/* Hero Block */}
        <View style={styles.heroCard}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={28}
            color="#007AFF"
            style={{ marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Need help right now?</Text>
            <Text style={styles.heroDesc}>
              Our team is online Mon–Fri, 9am–6pm (EST).
            </Text>
          </View>
        </View>

        {/* Quick Actions: Email & Telegram, coloridos */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={[styles.quickActionBtn, { backgroundColor: "#007AFF" }]}
            onPress={() => handleOpenLink(LINKS.email)}
          >
            <Ionicons name="mail-outline" size={20} color="#fff" />
            <Text style={[styles.quickActionLabel, { color: "#fff" }]}>
              Email Us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickActionBtn, { backgroundColor: "#229ED9" }]}
            onPress={() => handleOpenLink(LINKS.telegram)}
          >
            <Ionicons name="paper-plane-outline" size={20} color="#fff" />
            <Text style={[styles.quickActionLabel, { color: "#fff" }]}>
              Telegram
            </Text>
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        <View style={styles.faqCard}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          {FAQS.map((item, idx) => (
            <View key={idx}>
              <TouchableOpacity
                style={styles.faqQRow}
                onPress={() => handleToggleFAQ(idx)}
                activeOpacity={0.7}
              >
                <Text style={styles.faqQText}>{item.question}</Text>
                <Ionicons
                  name={openFAQ === idx ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="#007AFF"
                />
              </TouchableOpacity>
              {openFAQ === idx && (
                <View style={styles.faqABox}>
                  <Text style={styles.faqAText}>{item.answer}</Text>
                </View>
              )}
              <View style={styles.divider} />
            </View>
          ))}
        </View>

        {/* Social/Community */}
        <View style={styles.socialBlock}>
          <Text style={styles.socialTitle}>Join our Community</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#fff" }]}
              onPress={() => handleOpenLink(LINKS.facebook)}
            >
              <FontAwesome name="facebook-square" size={22} color="#4267B2" />
              <Text style={styles.socialLabel}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#fff" }]}
              onPress={() => handleOpenLink(LINKS.instagram)}
            >
              <AntDesign name="instagram" size={22} color="#E4405F" />
              <Text style={styles.socialLabel}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: "#fff" }]}
              onPress={() => handleOpenLink(LINKS.youtube)}
            >
              <FontAwesome name="youtube-play" size={22} color="#FF0000" />
              <Text style={styles.socialLabel}>YouTube</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feedback */}
        <View style={styles.feedbackCard}>
          <MaterialIcons
            name="feedback"
            size={18}
            color="#007AFF"
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.feedbackTitle}>Feedback & Suggestions</Text>
            <Text style={styles.feedbackText}>
              We love your ideas! Send your suggestions or report issues and
              help us improve Quick Lotter.
            </Text>
          </View>
        </View>

        {/* Response time */}
        <Text style={styles.responseTime}>
          Typical response: under 24 hours
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#F8F9FB" },
  container: {
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingBottom: 32,
    width: "100%",
  },
  title: {
    ...Typography.heading,
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  heroCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#1e2233",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    marginBottom: 18,
    gap: 6,
  },
  heroTitle: {
    color: "#111",
    fontWeight: "600",
    fontSize: 16.5,
    marginBottom: 1,
    fontFamily: Typography.fontFamily,
  },
  heroDesc: {
    color: "#555",
    fontSize: 13.3,
    fontFamily: Typography.fontFamily,
    fontWeight: "400",
  },
  chatBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 16,
    marginLeft: 8,
    shadowColor: "#007AFF",
    shadowOpacity: 0.11,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  chatBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
    fontFamily: Typography.fontFamily,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  quickActionBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    borderWidth: 0,
  },
  quickActionLabel: {
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 4,
    fontFamily: Typography.fontFamily,
  },
  faqCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#1e2233",
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  faqTitle: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: Typography.fontFamily,
  },
  faqQRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
  },
  faqQText: {
    color: "#222",
    fontWeight: "500",
    fontSize: 15,
    fontFamily: Typography.fontFamily,
    flex: 1,
    marginRight: 8,
  },
  faqABox: {
    paddingVertical: 5,
    paddingHorizontal: 4,
    marginBottom: 2,
  },
  faqAText: {
    color: "#464646",
    fontSize: 14.2,
    fontFamily: Typography.fontFamily,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F2F4",
    marginVertical: 0,
  },
  socialBlock: {
    marginBottom: 18,
  },
  socialTitle: {
    color: "#111",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 2,
    fontFamily: Typography.fontFamily,
  },
  socialRow: {
    flexDirection: "row",
    gap: 8,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    gap: 7,
    borderWidth: 1,
    borderColor: "#ECECEC",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  socialLabel: {
    color: "#222",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: Typography.fontFamily,
    marginLeft: 4,
  },
  feedbackCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderWidth: 1,
    borderColor: "#E3E7F7",
  },
  feedbackTitle: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 14.5,
    marginBottom: 1,
    fontFamily: Typography.fontFamily,
  },
  feedbackText: {
    color: "#2D2D2D",
    fontSize: 14,
    fontFamily: Typography.fontFamily,
    fontWeight: "400",
    lineHeight: 19,
  },
  responseTime: {
    color: "#A3A9B7",
    fontSize: 12.5,
    textAlign: "center",
    marginTop: 9,
    fontFamily: Typography.fontFamily,
    fontWeight: "400",
  },
});
