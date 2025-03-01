export interface Activity {
  id: string;
  name: string;
  distance: number;
  duration: number;
  calories: number;
  createdAt: string;
  steps?: number;
}

export interface User {
  name: string;
  email: string;
  profileImage: string | null;
}

export interface FitnessMetrics {
  steps: number;
  calories: number;
  distance: number;
  activeTime: number;
  lastUpdated: string;
}

export interface Orientation {
  orientation: 'PORTRAIT' | 'LANDSCAPE';
  locked: boolean;
}

export interface RootState {
  user: User;
  activities: {
    items: Activity[];
    recent: string[];
  };
  fitnessMetrics: FitnessMetrics;
  orientation: Orientation;
}

export enum ActivityType {
  Running = 'Running',
  Walking = 'Walking',
  Cycling = 'Cycling',
  Gym = 'Gym',
}

type BaseCoefficients = {
  stepThreshold: number;
};

export type StepBasedCoefficients = BaseCoefficients & {
  caloriesPerStep: number;
  distancePerStep: number;
};

export type TimeBasedCoefficients = BaseCoefficients & {
  caloriesPerSecond: number;
  distancePerSecond?: number;
};

export type ActivityCoefficients = {
  [ActivityType.Running]: StepBasedCoefficients;
  [ActivityType.Walking]: StepBasedCoefficients;
  [ActivityType.Cycling]: TimeBasedCoefficients;
  [ActivityType.Gym]: Omit<TimeBasedCoefficients, 'distancePerSecond'>;
};
