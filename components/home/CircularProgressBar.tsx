import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressBarProps {
  steps: number;
  goal: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ steps, goal }) => {
  const progress = (steps / goal) * 100;
  const strokeWidth = 10;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  // Dynamic progress color
  const progressColor = progress >= 50 ? "#4CAF50" : "#007bff";

  return (
    <View style={styles.circularProgressWrapper}>
      <Svg width="150" height="150" viewBox="0 0 150 150">
        <Circle
          cx="75"
          cy="75"
          r={radius}
          stroke="lightgray"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="75"
          cy="75"
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          rotation="-90"
          origin="75,75"
        />
      </Svg>
      <View style={styles.innerCircle}>
        <Text style={styles.stepCount}>{steps}</Text>
        <Text style={styles.stepLabel}>Steps</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circularProgressWrapper: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  innerCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: -60 }, { translateY: -60 }],
  },
  stepCount: {
    fontSize: 24,
    fontWeight: "400",
    color: "#333",
  },
  stepLabel: {
    fontSize: 16,
    color: "#333",
  },
});

export default CircularProgressBar;