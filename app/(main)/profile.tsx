import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderLogoBack from "@/components/generator/layout/HeaderLogoBack";
import { Colors, Typography } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import ResponsiveContainer from "@/components/shared/responsivecontainer";
import { useAuth } from "@/app/(auth)/AuthContext";
import { supabase } from "@/app/(auth)/supabaseClient";

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, loading, signOut } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.id) return;
      setLoadingProfile(true);
      const { data, error } = await supabase
        .from("user_profiles")
        .select("email, state, name")
        .eq("id", user.id)
        .single();
      if (!error && data) setProfile(data);
      setLoadingProfile(false);
    }
    fetchProfile();
  }, [user?.id]);

  // Botão de sair com alerta
  const handleLogout = async () => {
    Alert.alert(
      "Sign out",
      "Do you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderLogoBack title="" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveContainer>
          <Text style={styles.title}>My Profile</Text>
          <View style={styles.profileBox}>
            <MaterialIcons
              name="account-circle"
              size={65}
              color={Colors.primary}
              style={{ marginRight: 18 }}
            />
            <View>
              {loadingProfile ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <>
                  <Text style={styles.profileName}>
                    {profile?.name || "No name"}
                  </Text>
                  <Text style={styles.profileEmail}>{profile?.email}</Text>
                  <Text style={styles.profileState}>
                    {profile?.state
                      ? `State: ${profile.state}`
                      : "State: Not set"}
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* Dados pessoais */}
          <View style={styles.card}>
            <Option
              icon="person-outline"
              label="Personal Data"
              route="/personal-data"
            />
            <Separator />
            <Option
              icon="phone-android"
              label="Edit Phone"
              route="/edit-phone"
            />
          </View>

          {/* Preferências/Segurança */}
          <View style={styles.card}>
            <Option
              icon="campaign"
              label="Marketing Preferences"
              route="/marketing"
            />
            <Separator />
            <Option
              icon="vpn-key"
              label="Change Password"
              route="/change-password"
            />
            <Separator />
            <Option
              icon="close"
              label={
                <Text style={{ color: "#EA3D46", fontWeight: "600" }}>
                  Close Account
                </Text>
              }
              route="/close-account"
              iconColor="#EA3D46"
            />
          </View>
        </ResponsiveContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

// Linha fina separadora
function Separator() {
  return <View style={styles.separator} />;
}

// Card Option
function Option({
  icon,
  label,
  route,
  iconColor = Colors.primary,
}: {
  icon: any;
  label: React.ReactNode;
  route: string;
  iconColor?: string;
}) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.option}
      onPress={() => router.push(route)}
      activeOpacity={0.7}
    >
      <MaterialIcons name={icon} size={21} color={iconColor} />
      <Text style={styles.optionText}>{label}</Text>
      <MaterialIcons
        name="chevron-right"
        size={21}
        color="#AAB2C8"
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    paddingBottom: 60,
  },
  title: {
    ...Typography.heading,
    fontSize: 20,
    color: Colors.text,
    marginVertical: 18,
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 0.08,
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 28,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 15,
    color: Colors.textMuted,
    marginBottom: 1,
  },
  profileState: {
    fontSize: 13.5,
    color: "#007AFF",
    marginTop: 1,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 19,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  optionText: {
    fontSize: 16,
    color: "#121212",
    marginLeft: 14,
    fontWeight: "500",
    letterSpacing: 0.08,
  },
  separator: {
    height: StyleSheet.hairlineWidth + 0.5,
    backgroundColor: "#F1F3F9",
    marginLeft: 52, // alinha com texto
    marginRight: 0,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 7,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1.2,
    borderColor: "#EA3D46",
    paddingVertical: 13,
    paddingHorizontal: 33,
    marginBottom: 20,
    shadowColor: "#EA3D46",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 1,
    gap: 10,
  },
});
