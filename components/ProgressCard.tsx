import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressCardProps {
  title: string;
  value: string | number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProgressCard;