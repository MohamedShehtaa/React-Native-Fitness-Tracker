import { IconSymbolName } from '@/components/ui/IconSymbol';
import { ActivityType } from '@/types';

export const ACTIVITY_ICONS = {
  [ActivityType.Running]: 'figure.run',
  [ActivityType.Walking]: 'figure.walk',
  [ActivityType.Cycling]: 'bicycle',
  [ActivityType.Gym]: 'dumbbell',
} as Record<string, IconSymbolName>;
