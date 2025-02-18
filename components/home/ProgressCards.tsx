import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressCard from './ProgressCard';

const ProgressCards: React.FC = () => {
  return (
    <View style={styles.progressCardsContainer}>
      <ProgressCard title="Distance" value="2.5km" />
      <ProgressCard title="Calories" value="284" />
      <ProgressCard title="Active Time" value="32min" />
    </View>
  );
};

const styles = StyleSheet.create({
  progressCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ProgressCards;
