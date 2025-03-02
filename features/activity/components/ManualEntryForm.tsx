import { addActivity } from '@/store/reducers/activitiesSlice';
import { useAppDispatch } from '@/store/store';
import { ActivityType } from '@/types';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { validateManualEntry } from '../util/inputValidation';

type ManualEntryFormProps = {
  selectedActivity: ActivityType | null;
  onSuccess: () => void;
};

const ManualEntryForm: React.FC<ManualEntryFormProps> = ({
  selectedActivity,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [distance, setDistance] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = () => {
    if (!selectedActivity || !validateManualEntry(duration, selectedActivity)) {
      Alert.alert(
        'Error',
        'Please enter a valid duration and select an activity type.'
      );
      return;
    }

    const durationInSeconds = parseInt(duration, 10) * 60;

    dispatch(
      addActivity({
        name: selectedActivity,
        duration: durationInSeconds,
        calories: calories ? parseInt(calories, 10) : 0,
        distance: distance ? parseFloat(distance) : 0,
        steps: steps ? parseInt(steps, 10) : 0,
      })
    );

    onSuccess();
    setDuration('');
    setCalories('');
    setDistance('');
    setSteps('');
    Alert.alert('Success', 'Activity added manually');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Activity Duration (mins)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            placeholder="e.g., 30"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Calories Burned</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
            placeholder="Optional"
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Distance (km)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
            placeholder="Optional"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Steps</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={steps}
            onChangeText={setSteps}
            placeholder="Optional"
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Add Activity Manually</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    width: '48%',
    marginVertical: 8,
  },
  inputLabel: {
    fontSize: 14,
    marginVertical: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ManualEntryForm;
