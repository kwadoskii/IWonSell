import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Switch, Button, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ListingScreen from "./app/screens/ListingScreen";
import colors from "./app/config/colors";
import LoginScreen from "./app/screens/LoginScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import ImageInputList from "./app/components/ImageInputList";

export default function App() {
  return <ListingEditScreen />;
}

const styles = StyleSheet.create({});
