import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import ExportButton from '@/features/history/components/ExportButton';
import ClearFilterButton from '@/features/history/components/ClearFilterButton';
import { Colors } from '@/constants/Colors';
import useExport from '@/features/history/hooks/useExport';
import { DateData } from 'react-native-calendars';
import { useAppSelector } from '@/store/store';
import { formatDate } from '@/features/history/util/date';
import { selectActivities } from '@/store/reducers/activitiesSlice';
import CustomCalendar from './components/CustomCalendar';
import ActivitySectionList from './components/ActivitySectionList';
import ScrollableView from '@/features/orientation/components/ScrollableView';
import MainCard from '@/components/ui/MainCard';

const HistoryScreen: React.FC = () => {
  const activities = useAppSelector(selectActivities);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { exportJson, exportCsv } = useExport();
  const filteredActivities = selectedDate
    ? activities.filter(
        (activity) => formatDate(activity.createdAt) === selectedDate
      )
    : activities;

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollableView style={styles.container}>
      <MainCard style={styles.mainCard}>
        <CustomCalendar
          activities={activities}
          selectedDate={selectedDate}
          onDayPress={handleDayPress}
        />
      </MainCard>

      <View style={styles.listContainer}>
        <ActivitySectionList activities={filteredActivities} />
      </View>

      <View style={styles.buttonContainer}>
        <ClearFilterButton onPress={() => setSelectedDate(null)} />
        <ExportButton
          label="Export JSON"
          onPress={() => exportJson(activities)}
        />
        <ExportButton
          label="Export CSV"
          onPress={() => exportCsv(activities)}
        />
      </View>
    </ScrollableView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    padding: 16,
  },
  mainCard: {
    flexBasis: Platform.OS === 'ios' ? '50%' : '60%',
    padding: Platform.OS === 'ios' ? 5 : 2,
    alignItems: 'stretch',
    marginHorizontal: 0,
  },
  listContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 40 : 0,
    marginBottom: Platform.OS === 'ios' ? 60 : 0,
  },
});

export default HistoryScreen;
