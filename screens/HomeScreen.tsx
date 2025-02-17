import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import ProgressCard from '../components/ProgressCard';
import ActivityCard from '../components/ActivityCard';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressCard title="Steps" value="7,543" />
        <ProgressCard title="Distance" value="2.5km" />
        <ProgressCard title="Calories" value="284" />
        <ProgressCard title="Active Time" value="32min" />
      </View>
      <View style={styles.activityContainer}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <ActivityCard activity="Running" duration="32 min" distance="4.2 km" time="9:30 AM" />
        <ActivityCard activity="Walking" duration="45 min" distance="2.8 km" time="Yesterday" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.mainBackground,
  },
  progressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});

export default HomeScreen;