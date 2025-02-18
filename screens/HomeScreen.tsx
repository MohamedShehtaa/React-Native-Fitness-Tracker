import React from "react";
import { View, ScrollView, StyleSheet, Platform } from "react-native";

import { Colors } from "@/constants/Colors";
import CircularProgressBar from "@/components/home/CircularProgressBar";
import ProgressCards from "@/components/home/ProgressCards";
import RecentActivities from "@/components/home/RecentActivities";
import MainCard from "@/components/ui/MainCard";

const HomeScreen: React.FC = () => {
  const steps = 1000;
  const goal: number = 10000;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MainCard style={styles.mainCard}>
        <View style={styles.progressContainer}>
          <CircularProgressBar steps={steps} goal={goal} />
        </View>
        <ProgressCards />
      </MainCard>

      <RecentActivities />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.mainBackground,
    alignItems: "center",
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainCard: {
    flexBasis: Platform.OS === "ios" ? "47%" : "55%",
    paddingVertical:16,
    paddingHorizontal:10,
    alignItems: "stretch",
    marginHorizontal: 0,
    marginBottom:28,
  }
});

export default HomeScreen;
