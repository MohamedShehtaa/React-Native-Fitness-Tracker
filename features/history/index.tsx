import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ExportButton from '@/features/history/components/ExportButton';
import ClearFilterButton from '@/features/history/components/ClearFilterButton';
import { Colors } from '@/constants/Colors';
import useExport from '@/features/history/hooks/useExport';
import { DateData } from 'react-native-calendars';
import { useAppSelector } from '@/store/store';
import { formatDate } from '@/util/date';
import { selectActivities } from '@/store/reducers/activitiesSlice';
import CustomCalendar from './components/CustomCalendar';
import ActivitySectionList from './components/ActivitySectionList';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <CustomCalendar
        activities={activities}
        selectedDate={selectedDate}
        onDayPress={handleDayPress}
      />

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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    padding: 16,
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
