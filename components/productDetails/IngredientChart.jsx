import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import Colors from "./../../shared/Colors";	

const screenWidth = Dimensions.get("window").width;

export default function IngredientChart({ ingredients }) {
	const mainIngredients = ingredients.filter(
		(ing) => ing.percent_estimate && ing.percent_estimate > 0
	);

	// Map to pie chart data format
	const data = mainIngredients.map((ing, index) => ({
		name: ing.text,
		population: ing.percent_estimate,
		color: getColor(index),
	}));

	function getColor(index) {
		const colors = [
			"#f39c12",
			"#e74c3c",
			"#2ecc71",
			"#9b59b6",
			"#3498db",
			"#1abc9c",
			"#e67e22",
			"#34495e",
		];
		return colors[index % colors.length];
	}

	return (
		<View
			style={{
				marginTop: 15,
				padding: 15,
				backgroundColor: Colors.WHITE,
				borderRadius: 10,
			}}
		>
			<Text style={styles.title}>Ingredient Composition</Text>

			<View style={styles.chartWrapper}>
				<PieChart
					data={data}
					width={screenWidth * 0.8}
					height={220}
					chartConfig={{
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					}}
					accessor="population"
					backgroundColor="transparent"
					paddingLeft="15"
					center={[65, 0]} 
					hasLegend={false}
					absolute
				/>
			</View>

			{/* Custom legend */}
			<View style={styles.legendContainer}>
				{data.map((item, index) => (
					<View key={index} style={styles.legendItem}>
						<View style={[styles.colorBox, { backgroundColor: item.color }]} />
						<Text style={styles.legendText}>{item.name}</Text>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
      textAlign: "center",
    },
    chartWrapper: {
      alignItems: "center",
    },
    legendContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 8,
      marginVertical: 4,
    },
    colorBox: {
      width: 14,
      height: 14,
      marginRight: 6,
      borderRadius: 3,
    },
    legendText: {
      fontSize: 14,
      color: "#444",
    },
});