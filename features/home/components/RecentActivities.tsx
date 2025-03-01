import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAppSelector } from '@/store/store';
import ActivityListItem from '../../../components/Shared/ActivityListItem';
import EmptyList from '../../../components/Shared/EmptyList';
import { selectRecentActivities } from '@/store/reducers/activitiesSlice';

const RecentActivities: React.FC = () => {
  const recentActivities = useAppSelector(selectRecentActivities);

  return (
    <View style={styles.activityContainer}>
      <Text style={styles.sectionTitle}>Recent Activities</Text>
      <FlatList
        style={[{ maxHeight: 200 }]}
        data={recentActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityListItem item={item} />}
        ListEmptyComponent={<EmptyList message="No Activities to Show" />}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    marginTop: 14,
    width: '100%',
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'left',
  },
});

export default RecentActivities;
