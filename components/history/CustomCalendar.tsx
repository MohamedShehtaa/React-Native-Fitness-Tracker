import React from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import Activity from '../../types/Activity';
import MainCard from '../ui/MainCard';
import { Platform, StyleSheet } from 'react-native';

type CustomCalendarProps = {
  activities: Activity[];
  selectedDate: string | null;
  onDayPress: (day: DateData) => void;
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  activities,
  selectedDate,
  onDayPress,
}) => {
  const markedDates = activities.reduce(
    (acc, activity) => {
      acc[activity.date] = { marked: true, dotColor: '#007bff' };
      return acc;
    },
    {} as { [key: string]: { marked: boolean; dotColor: string } }
  );

  return (
    <MainCard style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate || '']: { selected: true, selectedColor: '#007bff' },
        }}
        theme={{
          calendarBackground: '#fff',
          selectedDayBackgroundColor: '#007bff',
          todayTextColor: '#007bff',
          arrowColor: '#007bff',
        }}
      />
    </MainCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: Platform.OS === 'ios' ? '47%' : '55%',
    padding: Platform.OS === 'ios' ? 5 : 10,
    alignItems: 'stretch',
    marginHorizontal: 0,
  },
});

export default CustomCalendar;
