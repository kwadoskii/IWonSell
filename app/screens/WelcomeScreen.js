import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

import colors from "../config/colors";

export default function WelcomeScreen() {
	return (
		<ImageBackground
			source={require("../assets/background.jpg")}
			style={styles.background}
		>
			<View style={styles.logoContainer}>
				<Image source={require("../assets/logo-red.png")} style={styles.logo} />
				<Text style={styles.text}>Sell your Stuffs Anytime!</Text>
			</View>
			<View style={styles.loginButton}></View>
			<View style={styles.registerButton}></View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	loginButton: {
		backgroundColor: colors.primary,
		height: 70,
		width: "100%",
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
	registerButton: {
		backgroundColor: colors.secondary,
		height: 70,
		width: "100%",
	},
	text: {
		color: colors.lightBlack,
		fontSize: 25,
		fontWeight: "bold",
		marginTop: 10,
		textAlign: "center",
	},
});
