import { StyleSheet, View, Text, Button, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

export default function TabTwoScreen() {
  const flickerAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startFlicker = () => {
      const flickerInterval = () => {
        Animated.sequence([
          Animated.timing(flickerAnim, {
            toValue: 0.4, // Lower opacity
            duration: Math.random() * 700 + 300, // Randomized flicker duration (300ms - 1000ms)
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(flickerAnim, {
            toValue: 1, // Full opacity
            duration: Math.random() * 500 + 200, // Randomized return (200ms - 700ms)
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setTimeout(flickerInterval, Math.random() * 7000 + 7000); // Random delay (7s - 14s)
        });
      };

      flickerInterval();
    };

    startFlicker();
  }, []);

  return (
    <View style={styles.container}>
      {/* Task Title */}
      <Text style={styles.taskTitle}>Today's Task</Text>
      <View style={styles.taskBox}>
        <Text style={styles.taskText}>Go touch grass or die 🍃</Text>
      </View>

      {/* Timer with Flicker Effect */}
      <Animated.Text style={[styles.timer, { opacity: flickerAnim }]}>
        ⏳ Time Left: 1:00:00
      </Animated.Text>

      {/* Extra Tasks */}
      <Text style={styles.extraTasksTitle}>Bonus Tasks</Text>
      <View style={styles.extraTasksContainer}>
        <Text style={styles.extraTask}>🌿 Capture a close-up of a leaf </Text>
      </View>
      <View style={styles.extraTasksContainer}>
        <Text style={styles.extraTask}>🐦 Snap a picture of a bird </Text>
      </View>
      <View style={styles.extraTasksContainer}>
        <Text style={styles.extraTask}>🌊 Find a water body nearby </Text>
      </View>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button title="📸 Submit Photo" color="JFFFFF" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 40,
    marginBottom: 10,
    color: '#D32F2F', // Blood red
  },
  taskBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
  },
  taskText: {
    fontSize: 13,
    textAlign: 'center',
  },
  timer: {
    fontSize: 40,
    color: '#JFFFFF', // White color only
    textShadowColor: 'rgba(255, 255, 255, 0.8)', // Glowing white effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 20,
  },
  extraTasksTitle: {
    fontSize: 40,
    marginBottom: 10,
    color: '#JFFFFF', // Blood red
  },
  extraTasksContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    marginBottom: 10,
  },
  extraTask: {
    fontSize: 13,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '90%',
    marginTop: 20,
  },
});