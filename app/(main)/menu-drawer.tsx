import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/theme";
import { useAuth } from "@/app/(auth)/AuthContext";

// Helper: retorna iniciais do nome ou email
function getInitial(name: string, email: string) {
  if (name && name.trim() !== "") return name.trim()[0].toUpperCase();
  if (email && email.trim() !== "") return email.trim()[0].toUpperCase();
  return "?";
}

export default function MenuDrawer({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const { profile, user, loading } = useAuth();

  // Dados do user/profile
  const displayName =
    profile?.name?.trim() || user?.user_metadata?.name || "No name";
  const displayEmail = user?.email || "no-email@quicklotter.com";
  const state = profile?.state || profile?.location || "Not set"; // adapte se seu campo for diferente

  // Navegação e handlers
  const handleNavigate = (path: string) => {
    router.push(path);
    onClose?.();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out QuickLotter! https://quicklotter.com",
      });
    } catch {
      alert("Failed to share");
    }
    onClose?.();
  };

  const handleRate = () => {
    Linking.openURL("https://quicklotter.com/app-review");
    onClose?.();
  };

  const handleRetailer = () => {
    Linking.openURL("https://nylottery.ny.gov/find-a-retailer");
    onClose?.();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 48 }}
    >
      {/* Header Profile */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitial}>
            {getInitial(displayName, displayEmail)}
          </Text>
        </View>
        <View>
          <Text style={styles.profileName}>
            {loading ? <ActivityIndicator size={16} /> : displayName}
          </Text>
          <Text style={styles.profileEmail}>{displayEmail}</Text>
          <Text style={styles.profileState}>
            State:{" "}
            <Text
              style={[
                styles.profileStateValue,
                state === "Not set"
                  ? { color: "#888" }
                  : { color: "#007AFF", fontWeight: "bold" },
              ]}
            >
              {state}
            </Text>
          </Text>
        </View>
      </View>

      {/* GENERAL */}
      <Section title="GENERAL">
        <MenuItem
          icon="person"
          label="My Profile"
          onPress={() => handleNavigate("/profile")}
        />
        <MenuItem
          icon="games"
          label="My-lines"
          onPress={() => handleNavigate("/my-lines")}
        />
        <MenuItem
          icon="location-pin"
          label={`My Location: ${state}`}
          onPress={() => handleNavigate("/location")}
        />
        <MenuItem
          icon="update"
          label="What’s New"
          onPress={() => handleNavigate("/whats-new")}
        />
      </Section>

      {/* SUPPORT */}
      <Section title="SUPPORT">
        <MenuItem
          icon="support-agent"
          label="Support"
          onPress={() => handleNavigate("/support")}
        />
        <MenuItem icon="share" label="Share This App" onPress={handleShare} />
        <MenuItem
          icon="store"
          label="Find A Retailer"
          onPress={handleRetailer}
        />
        <MenuItem icon="star-rate" label="Rate This App" onPress={handleRate} />
      </Section>

      {/* LEGAL */}
      <Section title="LEGAL">
        <MenuItem
          icon="info-outline"
          label="About This App"
          onPress={() => handleNavigate("/about")}
        />
        <MenuItem
          icon="description"
          label="Terms & Conditions"
          onPress={() => handleNavigate("/terms_conditions")}
        />
        <MenuItem
          icon="policy"
          label="Privacy Policy"
          onPress={() => handleNavigate("/privacy")}
        />
      </Section>

      {/* LOGOUT */}
      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            router.replace("/login");
            onClose?.();
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#E53935" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  let IconComponent: any = MaterialIcons;
  if (icon === "share" || icon === "location-pin") {
    IconComponent = Entypo;
  } else if (icon === "store") {
    IconComponent = FontAwesome5;
  }
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <IconComponent name={icon as any} size={20} color="#007AFF" />
      <Text style={styles.menuItemText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  profileHeader: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.3,
    borderBottomColor: "#F2F2F2",
    marginBottom: 6,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#D9EFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  avatarInitial: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
  },
  profileName: {
    fontSize: 16.3,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 1,
  },
  profileEmail: {
    fontSize: 13,
    color: "#444",
    marginBottom: 2,
  },
  profileState: {
    fontSize: 13.1,
    color: "#777",
    marginTop: 1,
  },
  profileStateValue: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 13.2,
    marginLeft: 3,
  },
  section: {
    marginTop: 22,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#000",
  },
  logoutSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#E53935",
  },
});
