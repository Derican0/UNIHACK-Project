import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, Animated, Easing, Image, TouchableOpacity } from "react-native";
import ParallaxScrollView from "../../components/ParallaxScrollView";

export default function TasksScreen() {
  const flickerAnim = useRef(new Animated.Value(1)).current;
  
  // Timer state (1 hour in seconds)
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    const startFlicker = () => {
      const flickerInterval = () => {
        Animated.sequence([
          Animated.timing(flickerAnim, {
            toValue: 0.4,
            duration: Math.random() * 700 + 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(flickerAnim, {
            toValue: 1,
            duration: Math.random() * 500 + 200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setTimeout(flickerInterval, Math.random() * 7000 + 7000);
        });
      };
      flickerInterval();
    };

    startFlicker();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("../../assets/images/image3.webp")}
          style={[styles.header, {width: "100%", height: "100%" }]}
          resizeMode="cover"
        />
      }
    >
      <View style={styles.container}>
        {/* Task Title */}
        <Text style={styles.taskTitle}>Today's Task</Text>
        <View style={styles.taskBox}>
          <Text style={styles.taskText}>Go touch grass or die 🍃</Text>
        </View>

        {/* Timer with Flicker Effect */}
        <Animated.Text style={[styles.timer, { opacity: flickerAnim }]}>
          ⏳ Time Left: {formatTime(timeLeft)}
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

        {/* Submit Button (Green with White Text) */}
        <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
          <Text style={styles.submitButtonText}>📸 Submit Photo</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({

  header: {
    width: "100%",
    height: "100%",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 40,
    marginBottom: 10,
    color: "#FFFFFF", 
  },
  taskBox: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 15,
  },
  taskText: {
    fontSize: 13,
    textAlign: "center",
    color: "#000000", // Black
  },
  timer: {
    fontSize: 40,
    color: "#D32F2F", // Red timer
    textShadowColor: "rgba(211, 47, 47, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 20,
  },
  extraTasksTitle: {
    fontSize: 40,
    marginBottom: 10,
    color: "#FFFFFF", 
  },
  extraTasksContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    marginBottom: 10,
  },
  extraTask: {
    fontSize: 13,
    marginBottom: 5,
    color: "#000000", // Black
  },
  submitButton: {
    backgroundColor: "#4CAF50", // Green
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#FFFFFF", // White text
    fontWeight: "bold",
    textAlign: "center",
  },
});

