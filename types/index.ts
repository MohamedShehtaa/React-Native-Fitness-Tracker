export interface Activity {
  id: string;
  name: string;
  distance: number;
  duration: number;
  calories: number;
  createdAt: string;
  date: string;
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

export interface RootState {
  user: User;
  activities: {
    items: Activity[];
    recent: string[];
  };
  fitnessMetrics: FitnessMetrics;
}
