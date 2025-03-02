import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ActivityStatsProps = {
  steps: number;
  calories: number;
  distance: number;
};

const ActivityStats: React.FC<ActivityStatsProps> = ({
  steps,
  calories,
  distance,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.stats}>{steps} Steps</Text>
      <Text style={styles.stats}>{calories.toFixed(1)} Calories</Text>
      <Text style={styles.stats}>{(distance / 1000).toFixed(2)} Distance</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  stats: {
    backgroundColor: Colors.mainBackground,
    borderRadius: 6,
    padding: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
});
export default ActivityStats;
