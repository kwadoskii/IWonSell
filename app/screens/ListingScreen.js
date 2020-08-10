import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import Card from "../components/Card";
import colors from "../config/colors";
import formatCurrency from "../utility/formatCurrency";
import listingsApi from "../api/listings";
import routes from "../navigation/route";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";

export default function ListingScreen({ navigation }) {
  const netInfo = useNetInfo();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const getListingsApi = useApi(listingsApi.getListings);
  const paddingTop =
    netInfo.type !== "unknown" && netInfo.isInternetReachable === false
      ? { paddingTop: 0 }
      : "";

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={[styles.screen, paddingTop]}>
        {getListingsApi.error && (
          <>
            <AppText>Could not retrieve the listings.</AppText>
            <AppButton title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing._id.toString()}
          onRefresh={() => {
            getListingsApi.request();
            setRefreshing(false);
          }}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={`₦${formatCurrency(item.price)}`}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
