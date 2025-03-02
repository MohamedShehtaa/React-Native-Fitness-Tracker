import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  initializeNotifications,
  scheduleDailyReminder,
  cancelReminders,
  loadNotificationSettings,
} from '@/services/notificationService';

const NotificationsReminder = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      await initializeNotifications();
      const settings = await loadNotificationSettings();
      setIsEnabled(settings.enabled);
      const reminderTime = new Date();
      reminderTime.setHours(settings.hour, settings.minute);
      setTime(reminderTime);
    };

    loadSettings();
  }, []);

  const toggleSwitch = async () => {
    if (!isEnabled) {
      await scheduleDailyReminder(time.getHours(), time.getMinutes());
    } else {
      await cancelReminders();
    }
    setIsEnabled((previousState) => !previousState);
  };

  const handleTimeChange = async (event: any, selectedTime?: Date) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      if (isEnabled) {
        await scheduleDailyReminder(
          selectedTime.getHours(),
          selectedTime.getMinutes()
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Text style={styles.title}>Daily Reminders</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {isEnabled && (
        <TouchableOpacity
          style={styles.timePickerButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.timeText}>
            Reminder Time:{' '}
            {time.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      )}

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  timePickerButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
});

export default NotificationsReminder;
