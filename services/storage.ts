import { RootState } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_STORAGE_KEY = '@FitnessTracker';

export const loadState = async (): Promise<RootState | undefined> => {
  try {
    const savedState = await AsyncStorage.getItem(APP_STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState) as RootState;
    }
    return undefined;
  } catch (error) {
    console.error('Error loading state:', error);
    return undefined;
  }
};

export const saveState = async (state: RootState): Promise<void> => {
  try {
    await AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
  }
};
