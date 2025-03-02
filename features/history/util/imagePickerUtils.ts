import { storeImage } from '@/features/profile/services/imageService';
import { setProfileImage } from '@/store/reducers/userSlice';
import { AppDispatch } from '@/store/store';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

type ImagePickerAction = 'library' | 'camera';

export const handleImagePicker = async (
  action: ImagePickerAction,
  dispatch: AppDispatch
) => {
  try {
    const permissionFn =
      action === 'library'
        ? ImagePicker.requestMediaLibraryPermissionsAsync
        : ImagePicker.requestCameraPermissionsAsync;

    const { status } = await permissionFn();

    if (status !== 'granted') {
      const permissionType = action === 'library' ? 'camera roll' : 'camera';
      Alert.alert('Permission required', `We need ${permissionType} access`);
      return;
    }

    const pickerFn =
      action === 'library'
        ? ImagePicker.launchImageLibraryAsync
        : ImagePicker.launchCameraAsync;

    const result = await pickerFn({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      const permanentUri = await storeImage(result.assets[0].uri);
      dispatch(setProfileImage(permanentUri));
    }
  } catch (error) {
    const errorMessage =
      action === 'library'
        ? 'Failed to select image from library'
        : 'Failed to take photo';

    Alert.alert('Error', errorMessage);
    console.error(`${action} error:`, error);
  }
};

export const showImageSourceAlert = (
  handleLibrary: () => void,
  handleCamera: () => void
) => {
  Alert.alert('Select Profile Picture', 'Choose an option', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Choose from Library', onPress: handleLibrary },
    { text: 'Take Photo', onPress: handleCamera },
  ]);
};
