import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressCard from './ProgressCard';
import { FitnessMetrics } from '@/types';

type ProgressCardsProps = {
  metrics: FitnessMetrics;
}

const ProgressCards: React.FC<ProgressCardsProps> = ({metrics}) => {
  const activeTime = (metrics.activeTime / 60).toFixed(2)
  const distance = (metrics.distance/1000).toFixed(2)
  return (
    <View style={styles.progressCardsContainer}>
      <ProgressCard title="Distance" value={`${distance} km`} />
      <ProgressCard title="Calories" value={`${metrics.calories.toFixed(1)} Cal`} />
      <ProgressCard title="Active Time" value={`${activeTime} min`} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressCardsContainer: {
    marginTop:40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ProgressCards;
