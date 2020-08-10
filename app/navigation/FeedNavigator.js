import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingScreen from "../screens/ListingScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import ViewImageScreen from "../screens/ViewImageScreen";

const Stack = createStackNavigator();

export default function FeedNavigator() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Listings"
        component={ListingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
        options={({ route }) => ({
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="ViewImageScreen"
        component={ViewImageScreen}
        options={({ route }) => ({
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="MyListings"
        component={MyListingsScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        })}
      />
    </Stack.Navigator>
  );
}
