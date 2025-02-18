import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

type ActivityControlButtonsProps = {
  isActive: boolean;
  startActivity: () => void;
  pauseActivity: () => void;
  stopActivity: () => void;
};

const ActivityControlButtons: React.FC<ActivityControlButtonsProps> = ({
  isActive,
  startActivity,
  pauseActivity,
  stopActivity,
}) => {
  return (
    <View style={styles.controlButtons}>
      {!isActive ? (
        <TouchableOpacity style={styles.startButton} onPress={startActivity}>
          <IconSymbol name="play.circle.fill" color="#007bff" size={60} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.pauseButton} onPress={pauseActivity}>
          <IconSymbol name="pause.circle.fill" color="#ffc107" size={60} />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.stopButton} onPress={stopActivity}>
        <IconSymbol name="stop.circle.fill" color="#dc3545" size={60} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  controlButtons: {
    flexDirection: "row",
    justifyContent:'space-around',
    alignItems: "center",
    marginVertical: 24,
  },
  startButton: {
    alignItems: "center",
  },
  pauseButton: {
    alignItems: "center",
  },
  stopButton: {
    alignItems: "center",

  },
  startButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  pauseButtonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  stopButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ActivityControlButtons;
