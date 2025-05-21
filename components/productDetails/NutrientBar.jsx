import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "./../../shared/Colors";

const levelColors = {
	low: "#3AD29F", // green
	moderate: "#FADB14", // yellow
	high: "#F5222D", // red
};

const NutrientBar = ({ label, level }) => {
	return (
		<View style={styles.row}>
			<Text style={styles.label}>{label}</Text>
			<View
				style={[styles.bar, { backgroundColor: levelColors[level] || "#ccc" }]}
			>
				<Text style={styles.level}>{level?.toUpperCase() || "N/A"}</Text>
			</View>
		</View>
	);
};

const NutrientLevels = ({ levels }) => {
	return (
		<View
			style={{
				marginTop: 15,
				padding: 15,
				backgroundColor: Colors.WHITE,
				borderRadius: 10,
			}}
		>
			<Text style={styles.title}>Nutrient Levels</Text>
			<NutrientBar label="Fat" level={levels?.fat} />
			<NutrientBar label="Saturated Fat" level={levels?.["saturated-fat"]} />
			<NutrientBar label="Sugars" level={levels?.sugars} />
			<NutrientBar label="Salt" level={levels?.salt} />
		</View>
	);
};

export default NutrientLevels;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 6,
	},
	label: {
		width: 120,
		fontSize: 16,
	},
	bar: {
		flex: 1,
		padding: 8,
		borderRadius: 6,
		alignItems: "center",
	},
	level: {
		fontWeight: "bold",
		color: "#fff",
	},
});
