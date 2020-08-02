import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";

export default function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <Screen style={styles.container}>
      <Image
        uri={listing.images[0].url}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        style={styles.image}
        tint="light"
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>₦{listing.price}</AppText>

        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Austin Ofor"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    height: 300,
    width: "100%",
  },
  price: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});
