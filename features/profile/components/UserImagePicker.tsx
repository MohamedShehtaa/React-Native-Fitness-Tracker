import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconSymbol } from '../../../components/ui/IconSymbol';
import { useAppDispatch } from '@/store/store';
import { useImagePicker } from '../hooks/useImagePicker';
import { showImageSourceAlert } from '@/features/history/util/imagePickerUtils';

type UserImagePickerProps = {
  profileImage: string | null;
};

const UserImagePicker: React.FC<UserImagePickerProps> = ({ profileImage }) => {
  const dispatch = useAppDispatch();
  const { handleLibrary, handleCamera } = useImagePicker(dispatch);

  const pickImage = () => showImageSourceAlert(handleLibrary, handleCamera);

  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
            onError={() => console.log('Error loading image')}
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
