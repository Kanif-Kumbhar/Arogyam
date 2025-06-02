import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import Colors from "../../shared/Colors";
import { useConvex, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import moment from "moment";

export default function TodayNutritionIntake({ userId, selectedDate }) {
	const convex = useConvex();

	const dateToUse = selectedDate || moment().format("DD-MM-YYYY");

	const nutritionProfile = useQuery(
		api.NutritionProfile.GetLatestNutritionProfile,
		{
			userId,
		}
	);

	const [todayConsumed, setTodayConsumed] = useState(null);

	useEffect(() => {
		if (!userId) return;

		const fetchNutrition = async () => {
			const result = await convex.query(api.MealPlan.GetTotalNutritionConsume, {
				userId,
				date: dateToUse,
			});
			setTodayConsumed(result);
		};

		fetchNutrition();
	}, [userId, convex, dateToUse]);

	if (!nutritionProfile || !todayConsumed) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={Colors.PRIMARY} />
			</View>
		);
	}

	const goalValues = {
		calories: nutritionProfile?.calories ?? 2000,
		proteins: nutritionProfile?.proteins ?? 100,
		fats: nutritionProfile?.fats ?? 70,
		carbs: nutritionProfile?.carbs ?? 250,
	};

	const dataValues = [
		Math.min(todayConsumed.calories / goalValues.calories, 1),
		Math.min(todayConsumed.proteins / goalValues.proteins, 1),
		Math.min(todayConsumed.fats / goalValues.fats, 1),
		Math.min(todayConsumed.carbs / goalValues.carbs, 1),
	];

	const labels = ["Calories", "Proteins", "Fats", "Carbs"];

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
		<View
			style={[styles.container, { width: Dimensions.get("window").width - 32 }]}
		>
			<Text style={styles.heading}>Nutrition Intake</Text>
			<ProgressChart
				data={chartData}
				width={Dimensions.get("window").width - 32}
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
		elevation: 5,
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
