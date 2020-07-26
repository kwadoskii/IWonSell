import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingScreen from "../screens/ListingScreen";
import colors from "../config/colors";

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
    </Stack.Navigator>
  );
}
