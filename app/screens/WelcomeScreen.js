import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

import AppButton from "../components/AppButton";
import colors from "../config/colors";
import routes from "../navigation/route";
import Screen from "../components/Screen";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={10}
      source={require("../assets/background.jpg")}
      style={styles.imageBackground}
    >
      <Screen style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo-red.png")} style={styles.logo} />
          <Text style={styles.tagline}>Sell your Stuffs Anytime!</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <AppButton title="login" onPress={() => navigation.navigate(routes.LOGIN)} />
          <AppButton
            title="register"
            color="secondary"
            onPress={() => navigation.navigate(routes.REGISTER)}
          />
        </View>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 70,
  },
  tagline: {
    color: colors.medium,
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 20,
    textAlign: "center",
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
    textTransform: "uppercase",
  },
});
