import React from "react";
import { View, Text, StyleSheet } from "react-native";

import User from "@/types/User";

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    alignItems:'center'
  },
  userName: {
    fontSize: 18,
    fontWeight:'700',
    color: "#333",
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 14,
    fontWeight:'400',
    color: "#333",
    marginBottom: 8,
  },
});

export default UserInfo;
