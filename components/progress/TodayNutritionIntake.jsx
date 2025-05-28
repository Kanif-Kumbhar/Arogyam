import React from "react";
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import Colors from "../../shared/Colors";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function TodayNutritionIntake({ userId }) {
	const screenWidth = Dimensions.get("window").width;
	const chartPadding = 32;
	const chartWidth = screenWidth - chartPadding;

	const nutritionData = useQuery(
		api.NutritionProfile.GetLatestNutritionProfile,
		{
			userId: userId,
		}
	);

	if (!nutritionData) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={Colors.PRIMARY} />
			</View>
		);
	}

	const goalValues = {
		calories: 2000, // kcal
		proteins: 100, // g
		fats: 70, // g
		carbs: 250, // g
	};

	const dataValues = [
		Math.min(nutritionData.calories / goalValues.calories, 1),
		Math.min(nutritionData.proteins / goalValues.proteins, 1),
		Math.min(nutritionData.fats / goalValues.fats, 1),
		Math.min(nutritionData.carbs / goalValues.carbs, 1),
	];

	const labels = [
		'Calories',
		'Proteins',
		'Fats',
		'Carbs',
	];	  

	const chartData = {
		labels,
		data: dataValues,
	};

	const chartConfig = {
		backgroundGradientFrom: Colors.WHITE,
		backgroundGradientTo: Colors.WHITE,
		color: (opacity = 1) => `rgba(136, 55, 255, ${opacity})`,
		strokeWidth: 2,
	};

	return (
		<View style={[styles.container, { width: chartWidth }]}>
			<Text style={styles.heading}>Today's Nutrition Intake</Text>
			<ProgressChart
				data={chartData}
				width={chartWidth}
				height={240}
				strokeWidth={16}
				radius={32}
				hideLegend={false}
				chartConfig={chartConfig}
				style={styles.chart}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: Colors.WHITE,
		paddingVertical: 16,
		borderRadius: 16,
		alignSelf: "center",
		marginTop: 16,
	},
	heading: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.PRIMARY,
		marginBottom: 12,
	},
	chart: {
		borderRadius: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 32,
	},
});
