import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  checkOrientation,
  setOrientation,
} from '@/store/reducers/orientationSlice';

const OrientationListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(checkOrientation());

    const subscription = ScreenOrientation.addOrientationChangeListener((e) => {
      dispatch(
        setOrientation(
          e.orientationInfo.orientation > 2 ? 'LANDSCAPE' : 'PORTRAIT'
        )
      );
    });

    return () =>
      ScreenOrientation.removeOrientationChangeListener(subscription);
  }, [dispatch]);

  return null;
};

export default OrientationListener;
