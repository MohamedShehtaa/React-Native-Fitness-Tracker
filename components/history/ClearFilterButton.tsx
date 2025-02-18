import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ClearFilterButtonProps = {
  onPress: () => void;
};

const ClearFilterButton: React.FC<ClearFilterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.filterButton]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>Clear Filter</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  filterButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ClearFilterButton;
