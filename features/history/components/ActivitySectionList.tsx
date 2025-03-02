import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

import { Activity } from '@/types';
import { Colors } from '@/constants/Colors';
import EmptyList from '../../../components/Shared/EmptyList';
import groupActivitiesByDate from '@/features/history/util/date';
import ActivityListItem from '../../../components/Shared/ActivityListItem';
import { useOrientation } from '@/features/orientation/hooks/useOrientation';

type ActivitySectionListProps = {
  activities: Activity[];
};

const ActivitySectionList: React.FC<ActivitySectionListProps> = ({
  activities,
}) => {
  const { isLandscape } = useOrientation();
  const categorizedActivities = groupActivitiesByDate(activities);

  return (
    <View style={[styles.container, isLandscape && { maxHeight: 300 }]}>
      <SectionList
        sections={categorizedActivities}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.dateHeader}>{title}</Text>
        )}
        renderItem={({ item }) => <ActivityListItem item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList message="No Activities" />}
        nestedScrollEnabled={true}
        scrollEnabled={true}
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
