import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getRandomFact } from "../../shared/FoodFacts.js";
import Colors from "@/shared/Colors.jsx";
import { AiIdeaIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";

export default function FoodFact() {
	const [fact, setFact] = useState("");

	useEffect(() => {
		setFact(getRandomFact());
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.titleRow}>
				<HugeiconsIcon icon={AiIdeaIcon} size={20} color={Colors.PRIMARY} />
				<Text style={styles.title}>Did you know?</Text>
			</View>
			<Text style={styles.factText}>{fact}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.PRIMARY2,
		padding: 16,
		borderRadius: 12,
		marginBottom: 25,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		gap: 5,
	},
	title: {
		fontWeight: "800",
		fontSize: 17,
		color: Colors.PRIMARY,
	},

	factText: {
		fontSize: 15,
		color: "#333",
		lineHeight: 22,
	},
});
