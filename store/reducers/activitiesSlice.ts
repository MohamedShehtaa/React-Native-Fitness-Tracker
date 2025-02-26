import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity, RootState } from '@/types';

interface ActivitiesState {
  items: Activity[];
  recent: string[];
}

const initialState: ActivitiesState = {
  items: [],
  recent: [],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: {
      reducer: (state, action: PayloadAction<Activity>) => {
        state.items.unshift(action.payload);
        state.recent.unshift(action.payload.id);
        // Keep only last 5 recent activities
        if (state.recent.length > 5) state.recent.pop();
      },
      prepare: (activity: Omit<Activity, 'id' | 'createdAt'>) => ({
        payload: {
          ...activity,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      }),
    },
  },
});

const selectActivityMap = createSelector(
  [(state: RootState) => state.activities.items],
  (items) => new Map(items.map((a) => [a.id, a]))
);

export const selectRecentActivities = createSelector(
  [(state: RootState) => state.activities.recent, selectActivityMap],
  (recentIds, activityMap) =>
    recentIds.flatMap((id) => {
      const activity = activityMap.get(id);
      return activity ? [activity] : [];
    })
);

export const { addActivity } = activitiesSlice.actions;
export const selectActivities = (state: RootState) => state.activities.items;
export default activitiesSlice.reducer;
