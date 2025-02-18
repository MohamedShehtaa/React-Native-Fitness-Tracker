import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import CustomCalendar from '@/components/history/CustomCalendar';
import ExportButton from '@/components/history/ExportButton';
import ClearFilterButton from '@/components/history/ClearFilterButton';
import ActivitySectionList from '@/components/history/ActivitySectionList';
import { Colors } from '@/constants/Colors';
import useExport from '@/hooks/useExport';
import { DateData } from 'react-native-calendars';
import Activity from '@/types/Activity';

const activities: Activity[] = [
  {
    id: '1',
    date: '2023-10-01',
    activity: 'Running',
    duration: '32 min',
    distance: '4.2 km',
  },
  {
    id: '2',
    date: '2023-10-01',
    activity: 'Walking',
    duration: '45 min',
    distance: '2.8 km',
  },
  {
    id: '3',
    date: '2023-10-02',
    activity: 'Cycling',
    duration: '40 min',
    distance: '8.5 km',
  },
  {
    id: '4',
    date: '2023-10-02',
    activity: 'Gym',
    duration: '50 min',
    distance: 'N/A',
  },
  {
    id: '5',
    date: '2023-10-03',
    activity: 'Swimming',
    duration: '30 min',
    distance: 'N/A',
  },
];

const HistoryScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { exportJson, exportCsv } = useExport();

  const filteredActivities = selectedDate
    ? activities.filter((activity) => activity.date === selectedDate)
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
