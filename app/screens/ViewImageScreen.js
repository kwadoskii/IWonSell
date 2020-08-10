import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Screen from "../components/Screen";

export default function ViewImageScreen({ route }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons name="close" color={colors.white} size={35} />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons name="trash-can-outline" color={colors.white} size={35} />
      </View>
      <Image
        resizeMode="contain"
        source={{ uri: route.params.listing.images[0].url }}
        style={styles.image}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  closeIcon: {
    left: 30,
    position: "absolute",
    top: 40,
  },
  deleteIcon: {
    right: 30,
    position: "absolute",
    top: 40,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
