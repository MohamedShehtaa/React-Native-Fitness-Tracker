import { ActivityCoefficients, ActivityType } from '@/types';

export const ACTIVITY_COEFFICIENTS: ActivityCoefficients = {
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
