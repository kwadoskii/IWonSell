import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

export default function ListItemSeparator() {
  return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.light,
    height: 1,
    width: "100%",
  },
});
