import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from "react-native";
import { RadarChart } from "@salmonco/react-native-radar-chart";
import Colors from "./../../shared/Colors";
import { InformationCircleFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";

const screenWidth = Dimensions.get("window").width;

const NUTRIENT_LABELS = [
	{ label: "Energy (kcal)", key: "energy-kcal" },
	{ label: "Carbs", key: "carbohydrates" },
	{ label: "Sugars", key: "sugars" },
	{ label: "Fat", key: "fat" },
	{ label: "Sat. Fat", key: "saturated-fat" },
	{ label: "Proteins", key: "proteins" },
	{ label: "Fiber", key: "fiber" },
	{ label: "Salt", key: "salt" },
];

const REFERENCE_VALUES = {
	"energy-kcal": 2000,
	carbohydrates: 275,
	sugars: 50,
	fat: 70,
	"saturated-fat": 20,
	proteins: 50,
	fiber: 28,
	salt: 6,
};

export default function NutritionRadarChart({ nutriments }) {
	if (!nutriments) return null;

	const data = NUTRIENT_LABELS.map((n) => {
		const rawValue = parseFloat(nutriments[n.key]) || 0;
		const reference = REFERENCE_VALUES[n.key] || 1;
		const normalizedValue = Math.max((rawValue / reference) * 100, 10); // scale 0-100 with min 10 for visibility
		return {
			label: n.label,
			value: normalizedValue,
		};
	});

	// Calculate maxValue dynamically, min floor 100 (since we're scaling to 100)
	const maxNormalizedValue = Math.max(...data.map((d) => d.value));
	const chartMaxValue =
		maxNormalizedValue < 100 ? 100 : maxNormalizedValue + 10;

	return (
		<View style={styles.container}>
			<View style={{
				display: "flex",
				flexDirection: "row",
			}}>
				<Text style={styles.title}>Nutritional Info (per 100g)</Text>
				<TouchableOpacity onPress={() => {
					Alert.alert(
						"Nutrition Information",
						"Nutrient values are scaled relative to recommended daily intake levels based on a 2000 kcal diet. This helps you understand how much each nutrient contributes to your daily needs.",
						[{ text: "OK" }]
					);
				}}>
					<HugeiconsIcon icon={InformationCircleFreeIcons} style={{
						margin: 5,
					}}/>
				</TouchableOpacity>
			</View>
			<RadarChart
				data={data}
				size={screenWidth * 0.9}
				maxValue={chartMaxValue}
				gradientColor={{
					startColor: "#bfa3ff",
					endColor: "#f3e8ff",
					count: 5,
				}}
				stroke={["#d9bfff", "#d9bfff", "#d9bfff", "#d9bfff", "#8837FF"]}
				strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
				strokeOpacity={[1, 1, 1, 1, 0.13]}
				labelColor="#433D3A"
				dataFillColor="#8837FF"
				dataFillOpacity={0.8}
				dataStroke="#8837FF"
				dataStrokeWidth={2}
				isCircle
				labelFontSize={12}
			/>

			<View style={styles.legendContainer}>
				{NUTRIENT_LABELS.map((n, index) => (
					<View key={index} style={styles.legendItem}>
						<Text style={styles.legendText}>
							{n.label}:{" "}
							<Text style={{ fontWeight: "bold" }}>
								{nutriments[n.key] ?? 0}
							</Text>
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
		alignItems: "center",
		marginTop: 15,
		padding: 15,
		backgroundColor: Colors.WHITE,
		borderRadius: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 10,
		color: "#2c3e50",
	},
	legendContainer: {
		marginTop: -5,
		width: "90%",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	legendItem: {
		width: "45%",
		marginBottom: 6,
		alignItems: "center",
	},
	legendText: {
		fontSize: 14,
		color: "#333",
		textAlign: "center",
	},
});
