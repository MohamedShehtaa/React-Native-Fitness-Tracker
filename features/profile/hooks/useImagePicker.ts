import { AppDispatch } from '@/store/store';
import { handleImagePicker } from '@/util/imagePickerUtils';
import { useCallback } from 'react';

export const useImagePicker = (dispatch: AppDispatch) => {
  const handleLibrary = useCallback(
    () => handleImagePicker('library', dispatch),
    [dispatch]
  );

  const handleCamera = useCallback(
    () => handleImagePicker('camera', dispatch),
    [dispatch]
  );

  return { handleLibrary, handleCamera };
};
