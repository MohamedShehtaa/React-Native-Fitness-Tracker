import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { Colors } from '@/constants/Colors';
import CircularProgressBar from '@/components/home/CircularProgressBar';
import ProgressCards from '@/components/home/ProgressCards';
import RecentActivities from '@/components/home/RecentActivities';
import MainCard from '@/components/ui/MainCard';
import { useAppSelector } from '@/redux/store';
import { selectMetrics } from '@/redux/features/metrics/metricsSlice';

const HomeScreen: React.FC = () => {
  const metrics = useAppSelector(selectMetrics);

  return (
    <View style={styles.container}>
      <MainCard style={styles.mainCard}>
        <View style={styles.progressContainer}>
          <CircularProgressBar steps={metrics.steps} goal={10000} />
        </View>
        <ProgressCards metrics={metrics} />
      </MainCard>

      <RecentActivities />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.mainBackground,
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainCard: {
    flexBasis: Platform.OS === 'ios' ? '47%' : '55%',
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'stretch',
    marginHorizontal: 0,
    marginBottom: 28,
  },
});

export default HomeScreen;
