import { Image, StyleSheet, Platform, View, ViewBase } from "react-native";
import React from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [score, setScore] = React.useState(0); // Initialize score state
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/header.webp")}
          style={[styles.reactLogo, { width: "100%", height: "100%" }]}
          resizeMode="cover"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <HelloWave />
        <ThemedText type="title">Leaderboard</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={[styles.stackContainer]}>
        {/* Stack two score text above each other for stylistic outline */}
        <ThemedText style={[styles.scoreText, { paddingTop: 100 }]}>
          {score}
        </ThemedText>
        <ThemedText style={[styles.strokeScoreText, { paddingTop: 100 }]}>
          {score}
        </ThemedText>

        {/* Add stick figures if score is less than 10 */}

        {score < 10 && (
          <>
            <Image
              source={require("@/assets/images/stick1.png")}
              style={[{ top: 20, right: 60, width: 50, height: 50 }]}
            />
            <Image
              source={require("@/assets/images/stick2.png")}
              style={[{ top: 90, right: 30, width: 50, height: 50 }]}
            />
            <Image
              source={require("@/assets/images/stick3.png")}
              style={[{ bottom: 10, left: 100, width: 50, height: 50 }]}
            />
          </>
        )}
      </ThemedView>

      <ThemedView style={(styles.middleContainer, { alignItems: "center" })}>
        <ThemedText type="subtitle">Current Score</ThemedText>
      </ThemedView>

      <ThemedView style={styles.graphContainer}>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.bar,
              {
                height: 100,
                backgroundColor: "#AADEEF",
              },
            ]}
          />
          <ThemedText style={styles.barLabel}>User 2</ThemedText>
        </View>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.bar,
              {
                height: 150,
                backgroundColor: "#97C319",
              },
            ]}
          />
          <ThemedText style={styles.barLabel}>User 1</ThemedText>
        </View>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.bar,
              {
                height: 50,
                backgroundColor: "#CBAF41",
              },
            ]}
          />
          <ThemedText style={styles.barLabel}>User 3</ThemedText>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  middleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stackContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 200, // Adjust height as needed
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  scoreText: {
    fontSize: 100,
    fontWeight: "bold",
    position: "absolute", // Stack text components
    fontFamily: "Tiny5",
    textShadowColor: "rgba(255, 140, 0, 0.75)", // Dark orange color
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 1,
    color: "#FFD700",
  },
  strokeScoreText: {
    fontSize: 100,
    fontWeight: "bold",
    position: "absolute", // Stack text components
    fontFamily: "Tiny5",
    color: "#FFD700",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Black color
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  barContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  bar: {
    width: 30,
    borderRadius: 5,
    shadowColor: "#E6834C",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  barLabel: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Tiny5",
  },
  graphContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 200,
    padding: 20,
  },
});
