import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ActivityCard from "../activity/ActivityCard";


const RecentActivities: React.FC = () => {
  return (
    <View style={styles.activityContainer}>
      <Text style={styles.sectionTitle}>Recent Activities</Text>
      <ActivityCard
        activity="Running"
        duration="32 min"
        distance="4.2 km"
        time="9:30 AM"
      />
      <ActivityCard
        activity="Walking"
        duration="45 min"
        distance="2.8 km"
        time="Yesterday"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    marginTop: 16,
    width: "100%",
  },
  sectionTitle: {
    alignSelf:'flex-start',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default RecentActivities;