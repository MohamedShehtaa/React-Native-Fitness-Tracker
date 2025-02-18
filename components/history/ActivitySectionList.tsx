import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import ActivityListItem from '@/components/history/ActivityListItem';
import Activity from '@/types/Activity';
import { Colors } from '@/constants/Colors';

type ActivitySectionListProps = {
  activities: Activity[];
};

const groupActivitiesByDate = (data: Activity[]) => {
  const grouped = data.reduce(
    (acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    },
    {} as Record<string, Activity[]>
  );

  return Object.entries(grouped).map(([date, activities]) => ({
    title: date,
    data: activities,
  }));
};

const ActivitySectionList: React.FC<ActivitySectionListProps> = ({
  activities,
}) => {
  const categorizedActivities = groupActivitiesByDate(activities);

  return (
    <View style={styles.container}>
      <SectionList
        sections={categorizedActivities}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.dateHeader}>{title}</Text>
        )}
        renderItem={({ item }) => <ActivityListItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    backgroundColor: Colors.mainBackground,
    paddingVertical: 8,
    marginBottom: 8,
  },
});

export default ActivitySectionList;
