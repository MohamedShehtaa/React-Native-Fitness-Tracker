import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAppSelector } from '@/redux/store';
import { selectRecentActivities } from '@/redux/features/activities/activitiesSlice';
import ActivityListItem from '../history/ActivityListItem';
import EmptyList from '../ui/EmptyList';

const RecentActivities: React.FC = () => {
  const recentActivities = useAppSelector(selectRecentActivities);

  return (
    <View style={styles.activityContainer}>
      <Text style={styles.sectionTitle}>Recent Activities</Text>
      <FlatList
        data={recentActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityListItem item={item} />}
        ListEmptyComponent={<EmptyList message="No Activities to Show" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'left',
  },
});

export default RecentActivities;
