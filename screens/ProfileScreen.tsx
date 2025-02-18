import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserImagePicker from '@/components/user/UserImagePicker';
import UserInfo from '@/components/user/UserInfo';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainCard from '@/components/ui/MainCard';

const ProfileScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  console.log(profileImage);
  return (
    <View style={styles.container}>
      <MainCard>
        <UserImagePicker setProfileImage={setProfileImage} />
        <UserInfo user={{ name: 'john', email: 'test@test.com' }} />
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
