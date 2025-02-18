import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';

type ActivityButtonsProps = {
  selectedActivity: string | null;
  setSelectedActivity: (activity: string) => void;
};

const activities = ['Running', 'Walking', 'Cycling', 'Gym'];

const ActivityButtons: React.FC<ActivityButtonsProps> = ({
  selectedActivity,
  setSelectedActivity,
}) => {
  return (
    <View style={styles.activityButtons}>
      {activities.map((activity) => (
        <TouchableOpacity
          key={activity}
          style={[
            styles.button,
            selectedActivity === activity && styles.selectedButton,
          ]}
          onPress={() => setSelectedActivity(activity)}
        >
          <IconSymbol
            name="waveform.path.ecg"
            color={selectedActivity === activity ? '#fff' : '#007bff'}
          />
          <Text style={styles.buttonText}>{activity}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    flexBasis: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ActivityButtons;
