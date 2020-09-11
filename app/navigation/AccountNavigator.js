import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import colors from "../config/colors";
import MessagesScreen from "../screens/MessagesScreen";
import MessageDetailsScreen from "../screens/MessageDetailsScreen";
import MyListingsScreen from "../screens/MyListingsScreen";

const Stack = createStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen
        name="MessageDetails"
        component={MessageDetailsScreen}
        options={({ route: { params } }) => ({
          title: params.title,
        })}
      />
      <Stack.Screen
        name="MyListings"
        component={MyListingsScreen}
        options={{ title: "My Listings" }}
      />
    </Stack.Navigator>
  );
}
