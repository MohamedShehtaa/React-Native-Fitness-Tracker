import { Activity } from '@/types';

export const formatDate = (
  isoDate: string,
  useRelativeLabels: boolean = false
): string => {
  const date = new Date(isoDate);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatDateOnly = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const formattedDate = formatDateOnly(date);
  const formattedToday = formatDateOnly(today);
  const formattedYesterday = formatDateOnly(yesterday);

  if (useRelativeLabels) {
    if (formattedDate === formattedToday) return 'Today';
    if (formattedDate === formattedYesterday) return 'Yesterday';
  }

  return formattedDate;
};

export const groupActivitiesByDate = (data: Activity[]) => {
  const grouped = data.reduce(
    (acc, item) => {
      const formattedDate = formatDate(item.createdAt, true);

      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(item);

      return acc;
    },
    {} as Record<string, Activity[]>
  );

  return Object.entries(grouped).map(([date, activities]) => ({
    title: date,
    data: activities,
  }));
};

export default groupActivitiesByDate;
