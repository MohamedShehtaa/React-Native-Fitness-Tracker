import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import UserImagePicker from "@/components/user/UserImagePicker";
import UserInfo from "@/components/user/UserInfo";

const ProfileScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  console.log(profileImage);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.userCard}>
        <UserImagePicker  setProfileImage={setProfileImage}/>
        <UserInfo user={{ name: "john", email: "test@test.com" }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.mainBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  userCard: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default ProfileScreen;