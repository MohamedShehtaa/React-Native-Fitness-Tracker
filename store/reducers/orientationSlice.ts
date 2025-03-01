import { Orientation } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as ScreenOrientation from 'expo-screen-orientation';

type OrientationState = Orientation;
const initialState: OrientationState = {
  orientation: 'PORTRAIT',
  locked: false,
};

const orientationSlice = createSlice({
  name: 'orientation',
  initialState,
  reducers: {
    setOrientation(state, action: PayloadAction<'PORTRAIT' | 'LANDSCAPE'>) {
      state.orientation = action.payload;
    },
    setLocked(state, action: PayloadAction<boolean>) {
      state.locked = action.payload;
    },
  },
});

export const { setOrientation, setLocked } = orientationSlice.actions;
export default orientationSlice.reducer;

export const checkOrientation = () => async (dispatch: any) => {
  const orientation = await ScreenOrientation.getOrientationAsync();
  dispatch(setOrientation(orientation > 2 ? 'LANDSCAPE' : 'PORTRAIT'));
};

export const lockOrientation =
  (lockType: ScreenOrientation.OrientationLock) => async (dispatch: any) => {
    await ScreenOrientation.lockAsync(lockType);
    dispatch(setLocked(true));
  };

export const unlockOrientation = () => async (dispatch: any) => {
  await ScreenOrientation.unlockAsync();
  dispatch(setLocked(false));
};
