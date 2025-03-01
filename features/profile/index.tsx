import MainCard from '@/components/ui/MainCard';
import { selectUserProfile } from '@/store/reducers/userSlice';
import { useAppSelector } from '@/store/store';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserImagePicker from './components/UserImagePicker';
import UserInfo from './components/UserInfo';
import { Colors } from '@/constants/Colors';

const ProfileScreen: React.FC = () => {
  const user = useAppSelector(selectUserProfile);

  return (
    <View style={styles.container}>
      <MainCard>
        <UserImagePicker profileImage={user.profileImage} />
        <UserInfo name={user.name} email={user.email} />
      </MainCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.mainBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});

export default ProfileScreen;
