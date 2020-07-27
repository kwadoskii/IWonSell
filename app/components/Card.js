import React from "react";
import { View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

export default function Card({ imageUrl, subTitle, title, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

        <View style={styles.detailsContainer}>
          <AppText numberOfLines={2} style={styles.title}>
            {title}
          </AppText>
          <AppText numberOfLines={1} style={styles.subTitle}>
            {subTitle}
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    height: 200,
    width: "100%",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 5,
  },
});
