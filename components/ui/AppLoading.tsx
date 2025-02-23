import React from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';

export default function AppLoading() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/fitness.png')}
        style={styles.image}
      />
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  activityIndicator: {
    position: 'absolute',
    bottom: 50,
  },
});
