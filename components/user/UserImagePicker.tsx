import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconSymbol } from "../ui/IconSymbol";

type UserImagePickerProps = {
    setProfileImage: (image: string| null) => void;
}

const UserImagePicker: React.FC<UserImagePickerProps> = ({ setProfileImage }) => {

  const [userImage, setUserImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
       setUserImage(result.assets[0].uri)
       setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.profileImageContainer}>
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.profileImage} />
        ) : (
          <IconSymbol name="camera.shutter.button" size={36} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eeee",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    fontSize: 16,
    color: "#666",
  },
});

export default UserImagePicker;
