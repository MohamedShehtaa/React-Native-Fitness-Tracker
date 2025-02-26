import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyList: React.FC<{ message: string }> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default EmptyList;
