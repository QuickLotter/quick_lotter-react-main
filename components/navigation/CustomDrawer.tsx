// components/navigation/CustomDrawer.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Colors } from "@/theme";

export default function CustomDrawer({
  navigation,
}: DrawerContentComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatar(result.assets[0].uri);
    }
  };

  const MenuItem = ({
    icon,
    label,
    onPress,
  }: {
    icon: JSX.Element;
    label: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      {icon}
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>J</Text>
              <MaterialIcons
                name="photo-camera"
                size={14}
                color="#007EFF"
                style={styles.cameraIcon}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.name}>Juliano Santana</Text>
        <Text style={styles.email}>test@quicklotter.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GENERAL</Text>
        <MenuItem
          icon={<Ionicons name="person" size={20} color="#007AFF" />}
          label="My Profile"
          onPress={() => navigation.navigate("profile")}
        />
        <MenuItem
          icon={
            <MaterialIcons name="sports-esports" size={20} color="#007AFF" />
          }
          label="Results"
          onPress={() => navigation.navigate("results")}
        />
        <MenuItem
          icon={<Entypo name="location-pin" size={20} color="#007AFF" />}
          label="My Location: NY"
          onPress={() => navigation.navigate("location")}
        />
        <MenuItem
          icon={<MaterialIcons name="new-releases" size={20} color="#007AFF" />}
          label="What’s New"
          onPress={() => navigation.navigate("whats-new")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <MenuItem
          icon={
            <Ionicons name="help-circle-outline" size={20} color="#007AFF" />
          }
          label="Support"
          onPress={() => navigation.navigate("support")}
        />
        <MenuItem
          icon={<Entypo name="share" size={20} color="#007AFF" />}
          label="Share This App"
          onPress={() => {}}
        />
        <MenuItem
          icon={<FontAwesome5 name="store" size={18} color="#007AFF" />}
          label="Find A Retailer"
          onPress={() => {}}
        />
        <MenuItem
          icon={<MaterialIcons name="stars" size={20} color="#007AFF" />}
          label="Rate This App"
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LEGAL</Text>
        <MenuItem
          icon={
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#007AFF"
            />
          }
          label="About This App"
          onPress={() => navigation.navigate("about")}
        />
        <MenuItem
          icon={<MaterialIcons name="description" size={20} color="#007AFF" />}
          label="Terms & Conditions"
          onPress={() => navigation.navigate("terms_conditions")}
        />
        <MenuItem
          icon={<MaterialIcons name="policy" size={20} color="#007AFF" />}
          label="Privacy Policy"
          onPress={() => navigation.navigate("privacy")}
        />
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => navigation.replace("login")}
      >
        <Ionicons name="log-out-outline" size={20} color="#E53935" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: "#F2F2F7",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrapper: {
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#D9EFFF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  cameraIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  email: {
    fontSize: 13,
    color: "#555",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuText: {
    fontSize: 15,
    marginLeft: 12,
    color: "#000",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    marginLeft: 8,
    color: "#E53935",
    fontWeight: "bold",
  },
});
