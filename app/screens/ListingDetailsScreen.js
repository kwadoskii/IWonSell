import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import colors from "../config/colors";
import formatCurrency from "../utility/formatCurrency";
import ListItem from "../components/ListItem";
import listingApi from "../api/listings";
import routes from "../navigation/route";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import userApi from "../api/users";

export default function ListingDetailsScreen({ navigation, route }) {
  const listing = route.params;
  const getListingUser = useApi(userApi.getOne);
  const getUserListings = useApi(listingApi.getUserListings);

  useEffect(() => {
    getListingUser.request(listing.user);
    getUserListings.request(listing.user);
  }, []);

  const viewImage = () => {
    navigation.navigate(routes.VIEW_IMAGE_SCREEN, { listing });
  };

  return (
    <Screen style={styles.container}>
      <TouchableWithoutFeedback onPress={() => viewImage()}>
        <View>
          <Image
            uri={listing.images[0].url}
            preview={{ uri: listing.images[0].thumbnailUrl }}
            style={styles.image}
            tint="light"
            o
          />
        </View>
      </TouchableWithoutFeedback>

      <ScrollView style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>{`₦${formatCurrency(listing.price)}`}</AppText>
        <AppText style={styles.description}>{listing.description}</AppText>

        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title={
              getListingUser.data.firstname !== undefined &&
              `${getListingUser.data.firstname} ${getListingUser.data.lastname}`
            }
            style={{ borderRadius: 20 }}
            subTitle={`${getUserListings.data.length} Listings`}
            onPress={() =>
              navigation.navigate(routes.MY_LISTINGS, {
                user: listing.user,
                title: `${getListingUser.data.firstname.trim()}'s Listings`,
              })
            }
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  description: {
    fontSize: 16,
    marginTop: 0,
  },
  detailsContainer: {
    backgroundColor: colors.light,
    flex: 1,
    padding: 20,
  },
  image: {
    height: 300,
    width: "100%",
  },
  price: {
    color: colors.secondary,
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
  },
  userContainer: {
    marginVertical: 40,
  },
});
