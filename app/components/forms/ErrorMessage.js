import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../AppText";

export default function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return (
    <View style={styles.container}>
      <AppText style={styles.error}>{error}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});
