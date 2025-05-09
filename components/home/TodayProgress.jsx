import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from "react";
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

	const { refreshData, setRefreshDate } = useContext(RefreshDataContext);

	useEffect(() => {
		user && GetTotalCaloriesConsume();
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
	return (
		<View
			style={{
				marginTop: 15,
				padding: 15,
				backgroundColor: Colors.WHITE,
				borderRadius: 10,
			}}
		>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
					}}
				>
					Today's Goal{" "}
				</Text>
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
				{totalCaloriesConsumed}/{data?.calories} kcal
			</Text>
			<Text
				style={{
					textAlign: "center",
					marginTop: 2,
					fontSize: 16,
				}}
			>
				You're doing great!
			</Text>

			<View
				style={{
					backgroundColor: Colors.GRAY,
					height: 10,
					borderRadius: 99,
					marginTop: 15,
					opacity: 0.7,
				}}
			>
				<View
					style={{
						backgroundColor: Colors.PRIMARY,
						width: "40%",
						height: 10,
						borderRadius: 99,
					}}
				></View>
			</View>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 5,
				}}
			>
				<Text>Calories Consumes</Text>
				<Text>Keep it up!</Text>
			</View>
		</View>
	);
}