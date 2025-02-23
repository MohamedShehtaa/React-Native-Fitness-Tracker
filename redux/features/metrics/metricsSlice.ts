import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FitnessMetrics, RootState } from '@/types';

const initialState: FitnessMetrics = {
  steps: 0,
  calories: 0,
  distance: 0,
  activeTime: 0,
  lastUpdated: new Date().toISOString(),
};

// metricsSlice.ts
const metricsSlice = createSlice({
  name: 'fitnessMetrics',
  initialState,
  reducers: {
    updateMetrics: {
      reducer: (state, action: PayloadAction<Partial<FitnessMetrics>>) => {
        // Incremental updates instead of replacement
        if (action.payload.steps !== undefined) {
          state.steps += action.payload.steps;
        }
        if (action.payload.calories !== undefined) {
          state.calories += action.payload.calories;
        }
        if (action.payload.distance !== undefined) {
          state.distance += action.payload.distance;
        }
        if (action.payload.activeTime !== undefined) {
          state.activeTime += action.payload.activeTime;
        }
        state.lastUpdated = new Date().toISOString();
      },
      prepare: (metrics: Partial<FitnessMetrics>) => ({
        payload: metrics,
      }),
    },
    // Add a reset metrics reducer if needed
    resetMetrics: (state) => {
      Object.assign(state, initialState);
    }
  },
});

export const { updateMetrics } = metricsSlice.actions;
export const selectMetrics = (state: RootState) => state.fitnessMetrics;
export default metricsSlice.reducer;
