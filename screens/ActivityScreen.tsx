import ActivityButtons from '@/components/activity/ActivityButtons';
import ActivityControlButtons from '@/components/activity/ActivityControlButtons';
import ActivityStats from '@/components/activity/ActivityStats';
import ActivityTimer from '@/components/activity/ActivityTimer';
import MainCard from '@/components/ui/MainCard';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Activity: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  useEffect(() => {
    if (isActive) {
      setSteps((prevSteps) => prevSteps + 1);
      setCalories((prevCalories) => prevCalories + 0.1);
    }
  }, [isActive, timeElapsed]);

  const startActivity = () => {
    if (!selectedActivity) {
      alert('Please select an activity type!');
      return;
    }
    setIsActive(true);
  };

  const pauseActivity = () => {
    setIsActive(false);
  };

  const stopActivity = () => {
    setIsActive(false);
    setTimeElapsed(0);
    setSteps(0);
    setCalories(0);
    setSelectedActivity(null);
  };

  return (
    <View style={styles.container}>
      <MainCard>
        <ActivityTimer
          isActive={isActive}
          timeElapsed={timeElapsed}
          setTimeElapsed={setTimeElapsed}
        />
        <ActivityControlButtons
          isActive={isActive}
          startActivity={startActivity}
          pauseActivity={pauseActivity}
          stopActivity={stopActivity}
        />
        <ActivityStats steps={steps} calories={calories} />
      </MainCard>
      <Text style={styles.subTitle}>Choose Activity</Text>
      <ActivityButtons
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTitle: {
    marginTop: 20,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Activity;
