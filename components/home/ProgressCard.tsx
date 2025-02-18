import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressCardProps {
  title: string;
  value: string | number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
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
    marginTop:8,
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default ProgressCard;