import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_SETTINGS_KEY = 'notificationSettings';

export type NotificationSettings = {
  enabled: boolean;
  hour: number;
  minute: number;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

export async function initializeNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  await setupNotificationChannel();
  return status === 'granted';
}

async function saveNotificationSettings(settings: NotificationSettings) {
  await AsyncStorage.setItem(
    NOTIFICATION_SETTINGS_KEY,
    JSON.stringify(settings)
  );
}

export async function loadNotificationSettings(): Promise<NotificationSettings> {
  const settings = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
  return settings
    ? JSON.parse(settings)
    : { enabled: false, hour: 19, minute: 0 };
}

export async function scheduleDailyReminder(hour: number, minute: number) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🏋️ Fitness Reminder',
      body: 'Time to log your daily progress!',
      sound: 'notification.mp3',
      data: { type: 'daily-reminder' },
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    } as any,
  });

  await saveNotificationSettings({ enabled: true, hour, minute });
}

export async function cancelReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await saveNotificationSettings({ enabled: false, hour: 19, minute: 0 });
}

export async function getCurrentNotificationSettings() {
  return await loadNotificationSettings();
}
