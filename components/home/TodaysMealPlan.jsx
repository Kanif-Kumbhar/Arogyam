import { View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { CalendarAdd01Icon } from "@hugeicons/core-free-icons";
import Colors from "../../shared/Colors";
import Button from "../../components/shared/Button";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { RefreshDataContext } from "../../context/RefreshDataContext";
import MealPlanCard from "./MealPlanCard";

export default function TodaysMealPlan({ selectedDate = null }) {
	const [mealPlan, setMealPlan] = useState();
	const convex = useConvex();
	const { user } = useContext(UserContext);
	const { refreshData, setRefreshDate } = useContext(RefreshDataContext);

	useEffect(() => {
		user && GetTodayMealPlan();
	}, [user, refreshData]);

	const GetTodayMealPlan = async () => {
		const result = await convex.query(api.MealPlan.GetTodayMealPlan, {
			userId: user?._id,
			date: selectedDate ?? moment().format("DD-MM-YYYY"),
		});
		setMealPlan(result);
	};

	return (
		<View
			style={{
				marginTop: 15,
			}}
		>
			{!selectedDate && (
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
					}}
				>
					Today's Meal Plan
				</Text>
			)}

			{mealPlan?.length === 0 ? (
				<View
					style={{
						display: "flex",
						alignItems: "center",
						padding: 20,
						backgroundColor: Colors.WHITE,
						marginTop: 15,
						borderRadius: 15,
					}}
				>
					<HugeiconsIcon
						icon={CalendarAdd01Icon}
						size={40}
						color={Colors.PRIMARY}
					/>
					<Text
						style={{
							fontSize: 16,
							color: Colors.GRAY,
							marginBottom: 20,
						}}
					>
						You don't have any meal plan for today yet.
					</Text>
					<Button title={"Create New Meal Plan"} />
				</View>
			) : (
				<View>
					<FlatList
						data={mealPlan}
						renderItem={({ item }) => <MealPlanCard mealPlanInfo={item} />}
					/>
				</View>
			)}
		</View>
	);
}
