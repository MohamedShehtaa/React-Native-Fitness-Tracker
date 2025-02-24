import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FitnessMetrics, RootState } from '@/types';

const initialState: FitnessMetrics = {
  steps: 0,
  calories: 0,
  distance: 0,
  activeTime: 0,
  lastUpdated: new Date().toISOString(),
};

const metricsSlice = createSlice({
  name: 'fitnessMetrics',
  initialState,
  reducers: {
    updateMetrics: {
      reducer: (state, action: PayloadAction<Partial<FitnessMetrics>>) => {
        if (action.payload.steps) state.steps += action.payload.steps;
        if (action.payload.calories) state.calories += action.payload.calories;
        if (action.payload.distance) state.distance += action.payload.distance;
        if (action.payload.activeTime)
          state.activeTime += action.payload.activeTime;
        state.lastUpdated = new Date().toISOString();
      },
      prepare: (metrics: Partial<FitnessMetrics>) => ({
        payload: metrics,
      }),
    },
    resetMetrics: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateMetrics, resetMetrics } = metricsSlice.actions;
export const selectMetrics = (state: RootState) => state.fitnessMetrics;
export default metricsSlice.reducer;
