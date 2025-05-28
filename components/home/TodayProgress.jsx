import { View, Text, Animated } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import moment from "moment";
import Colors from "./../../shared/Colors";
import { UserContext } from "./../../context/UserContext";
import { api } from "../../convex/_generated/api";
import { useConvex, useQuery } from "convex/react";
import { RefreshDataContext } from "../../context/RefreshDataContext";

export default function TodayProgress() {
	const { user } = useContext(UserContext);
	const convex = useConvex();
	const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);
	const { refreshData } = useContext(RefreshDataContext);

	const progressAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (user) {
			GetTotalCaloriesConsume();
		}
	}, [user, refreshData]);

	const GetTotalCaloriesConsume = async () => {
		const result = await convex.query(api.MealPlan.GetTotalCaloriesConsume, {
			date: moment().format("DD-MM-YYYY"),
			userId: user?._id,
		});
		setTotalCaloriesConsumed(result);
	};

	const data = useQuery(api.NutritionProfile.GetLatestNutritionProfile, {
		userId: user?._id,
	});

	// Animate progress bar when values change
	useEffect(() => {
		if (data?.calories > 0) {
			const progressPercent = Math.min(
				totalCaloriesConsumed / data.calories,
				1
			);
			Animated.timing(progressAnim, {
				toValue: progressPercent,
				duration: 500,
				useNativeDriver: false,
			}).start();
		}
	}, [totalCaloriesConsumed, data?.calories]);

	const animatedWidth = progressAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["0%", "100%"],
	});

	const progressMessages = [
		{ max: 0, message: "Let's get started!" },
		{ max: 0.5, message: "You're off to a good start!" },
		{ max: 0.9, message: "You're doing great!" },
		{ max: 1, message: "Almost there, keep it up!" },
		{ max: Infinity, message: "Goal achieved! Great job!" },
	];

	function getProgressMessage(progressPercent) {
		const entry = progressMessages.find(({ max }) => progressPercent <= max);
		return entry ? entry.message : "";
	}

	return (
		<View
			style={{
				marginTop: 15,
				padding: 15,
				backgroundColor: Colors.WHITE,
				borderRadius: 10,
				elevation: 5,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>Today's Goal</Text>
				<Text style={{ fontSize: 18 }}>{moment().format("MMM DD, YYYY")}</Text>
			</View>

			<Text
				style={{
					fontSize: 30,
					fontWeight: "bold",
					textAlign: "center",
					marginTop: 10,
					color: Colors.PRIMARY,
				}}
			>
				{totalCaloriesConsumed}/{data?.calories ?? "..."} kcal
			</Text>

			<Text style={{ textAlign: "center", marginTop: 2, fontSize: 16 }}>
				{getProgressMessage(
					data?.calories > 0
						? Math.min(totalCaloriesConsumed / data.calories, 1)
						: 0
				)}
			</Text>

			{/* Progress Bar */}
			<View
				style={{
					backgroundColor: Colors.GRAY,
					height: 10,
					borderRadius: 99,
					marginTop: 10,
					opacity: 0.7,
					overflow: "hidden",
				}}
			>
				<Animated.View
					style={{
						backgroundColor: Colors.PRIMARY,
						height: 10,
						borderRadius: 99,
						width: animatedWidth,
					}}
				/>
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 5,
				}}
			>
				<Text>Calories Consumed</Text>
			</View>
		</View>
	);
}
