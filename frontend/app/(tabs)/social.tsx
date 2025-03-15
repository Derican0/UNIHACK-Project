import { StyleSheet, Image, Platform } from "react-native";

import ParallaxScrollView from "../../components/ParallaxScrollView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { FlatList, View } from "react-native";
import { useState } from "react";
import { Rating } from "react-native-ratings";

export default function TabTwoScreen() {
  const [ratings, setRatings] = useState(images.map(() => 0));

  const handleRating = (rating: number, index: number) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("../../assets/images/socialHeader2.webp")}
          style={[styles.reactLogo, { width: "100%", height: "100%" }]}
          resizeMode="cover"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Social</ThemedText>
      </ThemedView>

      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image source={item.source} style={styles.image} />
            <ThemedText>{item.text}</ThemedText>
            <Rating
              type="star"
              startingValue={ratings[index]}
              imageSize={20}
              onFinishRating={(rating: number) => handleRating(rating, index)}
              style={styles.rating}
            />
          </View>
        )}
      />
    </ParallaxScrollView>
  );
}

const images = [
  {
    id: 1,
    source: require("../../assets/images/image1.webp"),
    text: "Mission 1",
  },
  {
    id: 2,
    source: require("../../assets/images/image2.webp"),
    text: "Mission 2",
  },
  {
    id: 3,
    source: require("../../assets/images/image3.webp"),
    text: "Mission 3",
  },
];

const styles = StyleSheet.create({
  reactLogo: {
    width: "100%",
    height: "100%",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 400,
  },
  rating: {
    marginTop: 10,
  },
});
