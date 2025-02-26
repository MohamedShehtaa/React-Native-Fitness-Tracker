import { useAppDispatch } from '@/store/store';
import useActivityTracker from './hooks/useActivityTracking';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ActivityType } from '@/types';
import { updateMetrics } from '@/store/reducers/metricsSlice';
import { addActivity } from '@/store/reducers/activitiesSlice';
import MainCard from '@/components/ui/MainCard';
import ActivityTimer from './components/ActivityTimer';
import ActivityControlButtons from './components/ActivityControlButtons';
import ActivityStats from './components/ActivityStats';
import ActivityButtons from './components/ActivityButtons';

const ActivityScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    timeElapsed,
    steps,
    calories,
    distance,
    isActive,
    selectedActivity,
    setSelectedActivity,
    setTimeElapsed,
    startTracking,
    pauseTracking,
    stopTracking,
  } = useActivityTracker();

  const handleStart = async () => {
    try {
      await startTracking();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleStop = () => {
    stopTracking();

    if (selectedActivity && timeElapsed > 0) {
      const activityMetrics = {
        steps: [ActivityType.Running, ActivityType.Walking].includes(
          selectedActivity
        )
          ? steps
          : 0,
        calories,
        distance,
        activeTime: timeElapsed,
      };

      dispatch(updateMetrics(activityMetrics));
      dispatch(
        addActivity({
          name: selectedActivity,
          duration: timeElapsed,
          calories: Math.round(calories),
          distance: parseFloat(distance.toFixed(2)),
          steps: activityMetrics.steps,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <MainCard>
        <ActivityTimer
          isActive={isActive}
          timeElapsed={timeElapsed}
          setTimeElapsed={setTimeElapsed}
        />
        <ActivityControlButtons
          isActive={isActive}
          startActivity={handleStart}
          pauseActivity={pauseTracking}
          stopActivity={handleStop}
        />
        <ActivityStats steps={steps} calories={calories} distance={distance} />
      </MainCard>
      <Text style={styles.subTitle}>Choose Activity</Text>
      <ActivityButtons
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  subTitle: {
    marginTop: 20,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ActivityScreen;
