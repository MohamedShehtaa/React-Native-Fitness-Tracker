import { IconSymbol } from '@/components/ui/IconSymbol';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Link href="/reminder-settings" style={styles.link}>
        <Text style={{ fontSize: 20 }}>Notification Reminders</Text>
        <IconSymbol
          name="chevron.right"
          size={Platform.OS === 'ios' ? 18 : 32}
          color="blue"
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
