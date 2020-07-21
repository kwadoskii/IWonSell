import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	View,
	StatusBar as RNStatusbar,
	StyleSheet,
	SafeAreaView,
	Platform,
	Text,
	Image,
	ImageBackground,
} from "react-native";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";

export default function App() {
	// <View style={styles.container}>
	// <SafeAreaView>
	// </SafeAreaView>
	// 	<StatusBar style="auto" />
	// </View>
	return <WelcomeScreen />;
}

const styles = StyleSheet.create({
	container: {
		// alignItems: "center",
		// backgroundColor: "dodgerblue",
		flex: 1,
		// justifyContent: "center",
		paddingTop: Platform.OS === "android" ? RNStatusbar.currentHeight : 0,
	},
});
