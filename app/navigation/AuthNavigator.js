import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
    //   screenOptions={{
    //     headerStyle: { backgroundColor: colors.primary },
    //     headerTintColor: colors.white,
    //   }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
    </Stack.Navigator>
  );
}
