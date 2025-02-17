import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Activity: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);

  const startActivity = () => {
    // Implement activity tracking logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{timeElapsed}</Text>
      <Text style={styles.stats}>{steps} Steps</Text>
      <Text style={styles.stats}>{calories} Calories</Text>

      <View style={styles.activityButtons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Running</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Walking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cycling</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gym</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startActivity}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.mainBackground
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  stats: {
    fontSize: 18,
    color: '#666',
    marginVertical: 8,
  },
  activityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Activity;