import React from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { Activity } from '@/types';

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
      acc[activity.createdAt] = { marked: true, dotColor: '#007bff' };
      return acc;
    },
    {} as { [key: string]: { marked: boolean; dotColor: string } }
  );

  return (
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
  );
};

export default CustomCalendar;
