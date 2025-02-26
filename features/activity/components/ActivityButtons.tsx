import { IconSymbol } from '@/components/ui/IconSymbol';
import { ACTIVITY_ICONS } from '@/constants/ActivityIcons';
import { ActivityType } from '@/types';
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

type ActivityButtonsProps = {
  selectedActivity: ActivityType | null;
  setSelectedActivity: (activity: ActivityType) => void;
};

const ActivityButtons: React.FC<ActivityButtonsProps> = ({
  selectedActivity,
  setSelectedActivity,
}) => {
  return (
    <View style={styles.activityButtons}>
      {Object.values(ActivityType).map((activity) => (
        <TouchableOpacity
          key={activity}
          style={[
            styles.button,
            selectedActivity === activity && styles.selectedButton,
          ]}
          onPress={() => setSelectedActivity(activity)}
        >
          <IconSymbol
            name={ACTIVITY_ICONS[activity]}
            color={selectedActivity === activity ? '#fff' : '#007bff'}
            size={24}
          />
          <Text
            style={[
              styles.buttonText,
              selectedActivity === activity && styles.selectedText,
            ]}
          >
            {activity}
          </Text>
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
    paddingHorizontal: 8,
  },
  button: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
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
    marginTop: 8,
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
  },
});

export default ActivityButtons;
