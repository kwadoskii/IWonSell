import React from "react";
import { View, Image, StyleSheet } from "react-native";

import colors from "../config/colors";

export default function ViewImageScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.closeIcon}></View>
			<View style={styles.deleteIcon}></View>
			<Image
				source={require("../assets/chair.jpg")}
				style={styles.image}
				resizeMode="contain"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		flex: 1,
	},
	closeIcon: {
		backgroundColor: colors.primary,
		height: 50,
		left: 30,
		position: "absolute",
		top: 40,
		width: 50,
	},
	deleteIcon: {
		backgroundColor: colors.secondary,
		height: 50,
		right: 30,
		position: "absolute",
		top: 40,
		width: 50,
	},
	image: {
		height: "100%",
		width: "100%",
	},
});
