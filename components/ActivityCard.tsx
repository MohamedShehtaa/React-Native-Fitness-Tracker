import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ActivityCardProps {
  activity: string;
  duration: string;
  distance: string;
  time: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, duration, distance, time }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.activity}>{activity}</Text>
      <Text style={styles.details}>{duration} - {distance}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default ActivityCard;