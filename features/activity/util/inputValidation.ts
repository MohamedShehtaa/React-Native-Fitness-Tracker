import { ActivityType } from '@/types';

export const validateManualEntry = (
  duration: string,
  activity: ActivityType | null
) => {
  if (!duration || !activity) return false;
  const minutes = parseInt(duration, 10);
  return !isNaN(minutes) && minutes > 0;
};
