import { View, Text, StyleSheet } from "react-native";
import React from "react";
import QRScanner from "../../components/shared/QRScanner";

export default function KnowYourFood() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Know Your Food</Text>
			<View style={styles.scannerContainer}>
				<QRScanner />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	scannerContainer: {
		alignItems: "center",
	},
});
