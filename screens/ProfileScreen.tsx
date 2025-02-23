import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserImagePicker from '@/components/user/UserImagePicker';
import UserInfo from '@/components/user/UserInfo';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainCard from '@/components/ui/MainCard';
import { useAppSelector } from '@/redux/store';
import { selectUserProfile } from '@/redux/features/user/userSlice';

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
    padding: 16,
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
