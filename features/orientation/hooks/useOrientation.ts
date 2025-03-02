import { useSelector, useDispatch } from 'react-redux';

import * as ScreenOrientation from 'expo-screen-orientation';
import { RootState } from '@/types';
import {
  lockOrientation,
  unlockOrientation,
} from '@/store/reducers/orientationSlice';

export const useOrientation = () => {
  const orientation = useSelector(
    (state: RootState) => state.orientation.orientation
  );
  const locked = useSelector((state: RootState) => state.orientation.locked);
  const dispatch = useDispatch();

  return {
    orientation,
    isLandscape: orientation === 'LANDSCAPE',
    locked,
    lockOrientation: (lockType: ScreenOrientation.OrientationLock) =>
      dispatch<any>(lockOrientation(lockType)),
    unlockOrientation: () => dispatch<any>(unlockOrientation()),
  };
};
