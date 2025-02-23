// services/imageService.ts
import * as FileSystem from 'expo-file-system';

// Generate timestamp-based filename with random suffix
const generateUniqueName = (uri: string) => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 10000);
  const ext = uri.split('.').pop() || 'jpg';
  return `${timestamp}_${randomSuffix}.${ext}`;
};

export const storeImage = async (uri: string): Promise<string> => {
  try {
    const filename = generateUniqueName(uri);
    const permanentPath = `${FileSystem.documentDirectory}${filename}`;

    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory!, {
      intermediates: true,
    });
    await FileSystem.copyAsync({
      from: uri,
      to: permanentPath,
    });

    const fileInfo = await FileSystem.getInfoAsync(permanentPath);
    if (!fileInfo.exists) {
      throw new Error('File copy failed');
    }

    return permanentPath;
  } catch (error) {
    console.error('Image storage failed:', error);
    throw new Error('Failed to save image');
  }
};

// export const deleteImage = async (uri: string): Promise<void> => {
//   try {
//     const fileInfo = await FileSystem.getInfoAsync(uri);
//     if (fileInfo.exists) {
//       await FileSystem.deleteAsync(uri);
//     }
//   } catch (error) {
//     console.error('Image deletion failed:', error);
//     throw error;
//   }
// };
