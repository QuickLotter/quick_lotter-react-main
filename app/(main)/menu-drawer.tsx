// app/menu-drawer.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Linking,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/theme";

export default function MenuDrawer({ onClose }: { onClose?: () => void }) {
  const router = useRouter();

  // Handler para navegação
  const handleNavigate = (path: string) => {
    router.push(path);
    if (onClose) onClose();
  };

  // Ações para botões não-navegáveis
  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out QuickLotter! https://quicklotter.com",
      });
    } catch (error) {
      Alert.alert("Error", "Could not share the app.");
    }
    if (onClose) onClose();
  };

  const handleRate = () => {
    // Substitua pelo link da sua loja/app
    Linking.openURL("https://quicklotter.com/app-review");
    if (onClose) onClose();
  };

  const handleRetailer = () => {
    // Substitua pelo link correto do seu buscador de lojas
    Linking.openURL("https://nylottery.ny.gov/find-a-retailer");
    if (onClose) onClose();
  };

  return (
    <View style={styles.container}>
      {/* TOPO */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => console.log("Upload photo")}
          style={styles.profileCircle}
        >
          <Text style={styles.profileInitial}>J</Text>
          <View style={styles.uploadIcon}>
            <MaterialIcons name="photo-camera" size={14} color="#007EFF" />
          </View>
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>Juliano Santana</Text>
          <Text style={styles.userEmail}>test@quicklotter.com</Text>
        </View>
        <Text style={styles.activeStatus}>Active</Text>
      </View>

      {/* MENU */}
      <ScrollView contentContainerStyle={styles.menu}>
        <MenuItem
          icon={<Ionicons name="person" size={22} color={Colors.primary} />}
          label="My Profile"
          onPress={() => handleNavigate("/profile")}
        />
        <MenuItem
          icon={
            <MaterialIcons
              name="sports-esports"
              size={22}
              color={Colors.primary}
            />
          }
          label="Results"
          onPress={() => handleNavigate("/results")}
        />
        <MenuItem
          icon={<Entypo name="location-pin" size={22} color={Colors.primary} />}
          label="My Location: NY"
          onPress={() => handleNavigate("/location")}
        />
        <MenuItem
          icon={
            <MaterialIcons
              name="new-releases"
              size={22}
              color={Colors.primary}
            />
          }
          label="What’s New"
          onPress={() => handleNavigate("/whats-new")}
        />
        <MenuItem
          icon={
            <Ionicons
              name="help-circle-outline"
              size={22}
              color={Colors.primary}
            />
          }
          label="Support"
          onPress={() => handleNavigate("/support")}
        />
        <MenuItem
          icon={<Entypo name="share" size={22} color={Colors.primary} />}
          label="Share This App"
          onPress={handleShare}
        />
        <MenuItem
          icon={<FontAwesome5 name="store" size={20} color={Colors.primary} />}
          label="Find A Retailer"
          onPress={handleRetailer}
        />
        <MenuItem
          icon={<MaterialIcons name="stars" size={22} color={Colors.primary} />}
          label="Rate This App"
          onPress={handleRate}
        />
        <MenuItem
          icon={
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={Colors.primary}
            />
          }
          label="About This App"
          onPress={() => handleNavigate("/about")}
        />
        <MenuItem
          icon={
            <MaterialIcons
              name="description"
              size={22}
              color={Colors.primary}
            />
          }
          label="Terms & Conditions"
          onPress={() => handleNavigate("/terms_conditions")}
        />
        <MenuItem
          icon={
            <MaterialIcons name="policy" size={22} color={Colors.primary} />
          }
          label="Privacy Policy"
          onPress={() => handleNavigate("/privacy")}
        />
      </ScrollView>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          // Aqui pode adicionar lógica de logout real
          router.replace("/login");
          if (onClose) onClose();
        }}
      >
        <Ionicons name="log-out-outline" size={20} color={Colors.primary} />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

// MenuItem genérico
function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: JSX.Element;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      {icon}
      <Text style={styles.menuItemText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF1FF",
  },
  header: {
    backgroundColor: "#007EFF",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileCircle: {
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007EFF",
  },
  uploadIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: "#007EFF",
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  userEmail: {
    fontSize: 12,
    color: "#fff",
  },
  activeStatus: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#00FF57",
  },
  menu: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "500",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  logoutText: {
    marginLeft: 10,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
