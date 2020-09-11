import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import Card from "../components/Card";
import colors from "../config/colors";
import formatCurrency from "../utility/formatCurrency";
import listingApi from "../api/listings";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";

export default function MyListingsScreen({ route }) {
  const getUserListingsApi = useApi(listingApi.getUserListings);
  const { user } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);
  if (route.params.user !== "") user.id = route.params.user;
  const getlisting = () => getUserListingsApi.request(user.id);

  useEffect(() => {
    getlisting();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getUserListingsApi.loading} />
      <Screen style={[styles.screen]}>
        {getUserListingsApi.error && (
          <>
            <AppText>Could not retrieve your listings.</AppText>
            <AppButton title="Retry" onPress={() => getlisting} />
          </>
        )}
        <FlatList
          data={getUserListingsApi.data}
          keyExtractor={(userListing) => userListing._id.toString()}
          onRefresh={() => {
            getUserListingsApi.request(user.id);
            setRefreshing(false);
          }}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={`₦${formatCurrency(item.price)}`}
              imageUrl={item.images[0].url}
              // onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
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
    backgroundColor: colors.light,
    padding: 15,
  },
});
