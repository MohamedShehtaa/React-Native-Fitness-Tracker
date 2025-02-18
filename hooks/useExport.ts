import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import Activity from '@/types/Activity';

const useExport = () => {
  const exportJson = async (activities: Activity[]) => {
    const jsonString = JSON.stringify(activities, null, 2);
    const fileUri = FileSystem.documentDirectory + 'activities.json';
    await FileSystem.writeAsStringAsync(fileUri, jsonString);
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert('Exported JSON', 'File saved to: ' + fileUri);
    }
  };

  const exportCsv = async (activities: Activity[]) => {
    const csvString = activities
      .map(
        (activity) =>
          `${activity.date},${activity.activity},${activity.duration},${activity.distance}`
      )
      .join('\n');
    const fileUri = FileSystem.documentDirectory + 'activities.csv';
    await FileSystem.writeAsStringAsync(
      fileUri,
      `Date,Activity,Duration,Distance\n${csvString}`
    );
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert('Exported CSV', 'File saved to: ' + fileUri);
    }
  };

  return { exportJson, exportCsv };
};

export default useExport;
