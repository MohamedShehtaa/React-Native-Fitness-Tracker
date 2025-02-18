import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ExportButtonProps = {
  label: string;
  onPress: () => void;
};

const ExportButton: React.FC<ExportButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, styles.exportButton]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  exportButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ExportButton;