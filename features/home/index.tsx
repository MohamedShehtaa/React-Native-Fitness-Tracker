import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { Colors } from '@/constants/Colors';
import CircularProgressBar from '@/features/home/components/CircularProgressBar';
import MainCard from '@/components/ui/MainCard';
import { useAppSelector } from '@/store/store';
import { selectMetrics } from '@/store/reducers/metricsSlice';
import RecentActivities from './components/RecentActivities';
import ProgressCards from './components/ProgressCards';

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
