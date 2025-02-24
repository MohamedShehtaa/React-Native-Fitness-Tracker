import { useState, useEffect, useCallback } from 'react';
import { Accelerometer } from 'expo-sensors';
import {
  ActivityType,
  StepBasedCoefficients,
  TimeBasedCoefficients,
} from '@/types';
import { ACTIVITY_COEFFICIENTS } from '@/constants/ActivityCoefficientsValues';

const useActivityTracker = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(
    null
  );
  const [accelerationData, setAccelerationData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);

  const detectMovement = useCallback(() => {
    const { x, y, z } = accelerationData;
    const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

    if (!selectedActivity) return;

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
    } else if (
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
  }, [accelerationData, selectedActivity, timeElapsed]);

  useEffect(() => {
    if (subscription && isActive) {
      detectMovement();
    }
  }, [accelerationData, detectMovement, isActive, subscription]);

  const startTracking = async () => {
    if (!selectedActivity) throw new Error('No activity selected');

    try {
      await Accelerometer.setUpdateInterval(500);
      const sub = Accelerometer.addListener(setAccelerationData);
      setSubscription(sub);
      setIsActive(true);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to access accelerometer');
    }
  };

  const pauseTracking = () => {
    setIsActive(false);
    subscription?.remove();
    setSubscription(null);
  };

  const stopTracking = () => {
    pauseTracking();
    setTimeElapsed(0);
    setSteps(0);
    setCalories(0);
    setDistance(0);
  };

  return {
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
  };
};

export default useActivityTracker;
