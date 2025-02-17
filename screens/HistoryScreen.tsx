import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Activity {
  id: string;
  date: string;
  activity: string;
  duration: string;
  distance: string;
}

const HistoryScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Sample data for activities
  const activities: Activity[] = [
    { id: '1', date: '2023-10-01', activity: 'Running', duration: '32 min', distance: '4.2 km' },
    { id: '2', date: '2023-10-02', activity: 'Walking', duration: '45 min', distance: '2.8 km' },
    { id: '3', date: '2023-10-03', activity: 'Cycling', duration: '40 min', distance: '8.5 km' },
  ];

  // Filter activities by selected date
  const filteredActivities = selectedDate
    ? activities.filter((activity) => activity.date === selectedDate)
    : activities;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity History</Text>

      {/* Calendar View (Placeholder) */}
      <View style={styles.calendarPlaceholder}>
        <Text style={styles.calendarText}>Calendar View Here</Text>
      </View>

      {/* Activity List */}
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text style={styles.activityDate}>{item.date}</Text>
            <Text style={styles.activityText}>{item.activity}</Text>
            <Text style={styles.activityDetails}>
              {item.duration} - {item.distance}
            </Text>
          </View>
        )}
      />

      {/* Filter Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setSelectedDate(null)} // Reset filter
      >
        <Text style={styles.filterButtonText}>Clear Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.mainBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  calendarPlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarText: {
    fontSize: 16,
    color: '#666',
  },
  activityItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityDate: {
    fontSize: 14,
    color: '#999',
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
  filterButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  filterButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HistoryScreen;