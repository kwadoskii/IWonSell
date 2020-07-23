import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";

export default function Screen({ children, style }) {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={[styles.view, style]}>{children}</SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
