import { Activity } from '@/types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ActivityListItemProps = {
  item: Activity;
};

const ActivityListItem: React.FC<ActivityListItemProps> = ({ item }) => {
  return (
    <View style={styles.activityItem}>
      <Text style={styles.activityText}>{item.name}</Text>
      <Text style={styles.activityDetails}>
        {`${(item.duration / 60).toFixed(2)} min - ${(item.distance / 1000).toFixed(2)} km`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activityDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default ActivityListItem;
