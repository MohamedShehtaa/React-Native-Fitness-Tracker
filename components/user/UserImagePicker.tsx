import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { IconSymbol } from '../ui/IconSymbol';
import { useAppDispatch } from '@/redux/store';
import { setProfileImage } from '@/redux/features/user/userSlice';
import { storeImage } from '@/services/imageService';

type UserImagePickerProps = {
  profileImage: string | null;
};

const UserImagePicker: React.FC<UserImagePickerProps> = ({ profileImage }) => {
  const dispatch = useAppDispatch();

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need camera roll access to upload images');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        const permanentUri = await storeImage(result.assets[0].uri);
        dispatch(setProfileImage(permanentUri));
      }
    } catch (error) {
      Alert.alert('Upload Error', 'Failed to save profile image');
      console.error('Image upload error:', error);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <Image 
            source={{ uri: profileImage }} 
            style={styles.profileImage} 
            onError={() => console.log("Error loading image")}
          />
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
    backgroundColor: '#eeee',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
    color: '#666',
  },
});

export default UserImagePicker;
