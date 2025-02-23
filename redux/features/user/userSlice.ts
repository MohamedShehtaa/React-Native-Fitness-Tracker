import { RootState, User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  profileImage: null,
  name: 'john Doe',
  email: 'john.doe@example.com',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProfileImage, updateUserProfile } = userSlice.actions;
export const selectUserProfile = (state: RootState) => state.user;
export const selectProfileImage = (state: RootState) => state.user.profileImage;

export default userSlice.reducer;
