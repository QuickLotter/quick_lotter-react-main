import React from "react";
import { ScrollView, Text, StyleSheet, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { Colors, Typography } from "@/theme";

const sections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to Quick Lotter. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and safeguard your data when you visit our website or use our services.",
  },
  {
    title: "2. Information We Collect",
    content: [
      {
        subtitle: "2.1. Personal Information",
        text:
          "We may collect personal information that you voluntarily provide to us when you use our website or services, such as:\n" +
          "• Contact Information: Your name, email address, and phone number.\n" +
          "• Account Information: Username, password, and other registration details.\n" +
          "• Payment Information: Credit card details and billing information (if applicable).",
      },
      {
        subtitle: "2.2. Non-Personal Information",
        text:
          "We may also collect non-personal information automatically, including:\n" +
          "• Usage Data: Information about how you use our website, such as pages viewed, time spent, and click-through data.\n" +
          "• Device Information: Data about your device, including IP address, browser type, operating system, and device identifiers.\n" +
          "• Cookies and Tracking Technologies: We use cookies and similar technologies to enhance your experience and gather information about website usage.",
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    content:
      "We use the information we collect for various purposes, including:\n" +
      "• To Provide and Improve Our Services: To operate, maintain, and enhance our services.\n" +
      "• To Communicate with You: To respond to your inquiries, provide customer support, and send you updates or promotional materials.\n" +
      "• To Process Transactions: To facilitate payments and fulfill orders (if applicable).\n" +
      "• To Analyze and Understand Trends: To analyze how users interact with our website and services.\n" +
      "• To Ensure Security: To detect and prevent fraud, abuse, and other security threats.",
  },
  {
    title: "4. Sharing and Disclosure of Information",
    content:
      "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:\n" +
      "• Service Providers: We may share your information with third-party service providers who assist us in operating our website, conducting our business, or servicing you.\n" +
      "• Legal Compliance: We may disclose your information if required to do so by law or in response to valid requests by public authorities.\n" +
      "• Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.",
  },
  {
    title: "5. Data Security",
    content:
      "We implement a variety of security measures to protect your personal information. These include:\n" +
      "• Encryption: Secure data transmission using encryption protocols.\n" +
      "• Access Controls: Restricting access to personal information to authorized personnel only.\n" +
      "• Regular Security Assessments: Conducting regular audits and assessments of our security practices.",
  },
  {
    title: "6. Data Retention",
    content:
      "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Once the information is no longer needed, we will securely delete or anonymize it.",
  },
  {
    title: "7. Your Rights and Choices",
    content:
      "You have certain rights regarding your personal information, including:\n" +
      "• Access and Correction: You can request access to or correction of your personal information.\n" +
      "• Opt-Out: You can opt out of receiving promotional emails from us by following the unsubscribe link in the email.\n" +
      "• Data Portability: You can request a copy of your personal information in a machine-readable format.\n" +
      "• Deletion: You can request the deletion of your personal information, subject to legal obligations.",
  },
  {
    title: "8. Children's Privacy",
    content:
      "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently received personal information from a child under 18, we will delete such information from our records.",
  },
  {
    title: "9. Changes to This Privacy Policy",
    content:
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.',
  },
  {
    title: "10. Contact Us",
    content:
      "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:\n" +
      "Email: contact@quicklotter.com\n\n" +
      "Last Updated: 04/29/2025",
  },
];

export default function PrivacyPolicyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <HeaderLogoBack />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <View style={{ height: insets.top + 12 }} />
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.subtitle}>
            Your privacy is important to us. Please read this policy carefully.
          </Text>

          {sections.map((section, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{section.title}</Text>
              {Array.isArray(section.content) ? (
                section.content.map((item, i) => (
                  <View key={i} style={styles.subtopicBox}>
                    <Text style={styles.sectionSubtitle}>{item.subtitle}</Text>
                    <Text style={styles.cardContent}>{item.text}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.cardContent}>{section.content}</Text>
              )}
            </View>
          ))}
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  title: {
    ...Typography.heading,
    fontSize: 27,
    fontWeight: "800",
    color: "#05549E",
    marginBottom: 4,
    marginTop: 10,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: -0.7,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#007AFF",
    marginBottom: 22,
    marginTop: 0,
    fontWeight: "500",
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#1e2333",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 7,
    color: "#05549E",
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
    letterSpacing: 0.2,
  },
  cardContent: {
    fontSize: 15,
    color: "#23242A",
    lineHeight: 22,
    marginBottom: 2,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 4,
    marginTop: 10,
    fontFamily: Platform.OS === "ios" ? "System" : undefined,
  },
  subtopicBox: {
    marginBottom: 8,
    marginTop: 3,
  },
});
