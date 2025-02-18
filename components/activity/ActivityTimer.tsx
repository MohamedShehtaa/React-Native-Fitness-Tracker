import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

type ActivityTimerProps = {
  isActive: boolean;
  timeElapsed: number;
  setTimeElapsed: (time: number | ((time: number) => number)) => void;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const ActivityTimer: React.FC<ActivityTimerProps> = ({
  isActive,
  timeElapsed,
  setTimeElapsed,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, setTimeElapsed]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(timeElapsed)}</Text>
      <Text style={styles.elapsedText}>Time Elapsed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'flex-start',
    alignItems:'center'
  },
  timer: {
    fontSize: 48,
    fontWeight: "600",
    color: "#333",
  },
  elapsedText: {
    fontSize: 13,
    color: '#666',
    marginVertical: 6,
  },

  
});

export default ActivityTimer;
