import ActivityButtons from '@/components/activity/ActivityButtons';
import ActivityControlButtons from '@/components/activity/ActivityControlButtons';
import ActivityStats from '@/components/activity/ActivityStats';
import ActivityTimer from '@/components/activity/ActivityTimer';
import MainCard from '@/components/ui/MainCard';
import { addActivity } from '@/redux/features/activities/activitiesSlice';
import { updateMetrics } from '@/redux/features/metrics/metricsSlice';
import { useAppDispatch } from '@/redux/store';
import { Accelerometer } from 'expo-sensors';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import {
  ActivityCoefficients,
  ActivityType,
  StepBasedCoefficients,
  TimeBasedCoefficients,
} from '@/types';

const ACTIVITY_COEFFICIENTS: ActivityCoefficients = {
  [ActivityType.Running]: {
    caloriesPerStep: 0.05,
    distancePerStep: 0.0007,
    stepThreshold: 1.2,
  },
  [ActivityType.Walking]: {
    caloriesPerStep: 0.03,
    distancePerStep: 0.0005,
    stepThreshold: 1.1,
  },
  [ActivityType.Cycling]: {
    caloriesPerSecond: 0.2,
    distancePerSecond: 2.5,
    stepThreshold: 0.8,
  },
  [ActivityType.Gym]: {
    caloriesPerSecond: 0.15,
    stepThreshold: 0.5,
  },
};

const Activity: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(
    null
  );
  const [accelerationData, setAccelerationData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);
  const dispatch = useAppDispatch();

  const detectMovement = useCallback(() => {
    const { x, y, z } = accelerationData;
    const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

    if (selectedActivity) {
      if (
        [ActivityType.Running, ActivityType.Walking].includes(selectedActivity)
      ) {
        const coeff = ACTIVITY_COEFFICIENTS[
          selectedActivity
        ] as StepBasedCoefficients;

        if (acceleration > coeff.stepThreshold) {
          setSteps((prev) => prev + 1);
          setCalories((prev) => prev + coeff.caloriesPerStep);
          setDistance((prev) => prev + coeff.distancePerStep);
        }
      }
      // Handle time-based activities
      else if (
        [ActivityType.Cycling, ActivityType.Gym].includes(selectedActivity)
      ) {
        const coeff = ACTIVITY_COEFFICIENTS[
          selectedActivity
        ] as TimeBasedCoefficients;
        const timeBasedCalories = timeElapsed * coeff.caloriesPerSecond;
        setCalories(timeBasedCalories);

        if (selectedActivity === ActivityType.Cycling) {
          setDistance(timeElapsed * coeff.distancePerSecond!);
        }
      }
    }
  }, [accelerationData, selectedActivity, timeElapsed]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  useEffect(() => {
    if (subscription && isActive) {
      detectMovement();
    }
  }, [accelerationData, detectMovement, isActive, subscription]);

  useEffect(() => {
    if (subscription && isActive) {
      detectMovement();
    }
  }, [detectMovement, subscription, isActive]);

  const startActivity = async () => {
    if (!selectedActivity) {
      Alert.alert('Select Activity', 'Please choose an activity type!');
      return;
    }

    try {
      await Accelerometer.setUpdateInterval(500);
      const sub = Accelerometer.addListener(setAccelerationData);
      setSubscription(sub);
      setIsActive(true);
    } catch (error) {
      Alert.alert('Sensor Error', 'Failed to access accelerometer');
      console.error(error);
    }
  };

  const pauseActivity = () => {
    setIsActive(false);
    subscription?.remove();
    setSubscription(null);
  };

  const stopActivity = () => {
    pauseActivity();
    if (selectedActivity) {
      if (timeElapsed > 0) {
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
    }

    setTimeElapsed(0);
    setSteps(0);
    setCalories(0);
    setDistance(0);
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
          startActivity={startActivity}
          pauseActivity={pauseActivity}
          stopActivity={stopActivity}
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

export default Activity;
