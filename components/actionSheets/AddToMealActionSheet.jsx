import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from "react";
import Colors from "../../shared/Colors";
import {
	Coffee02FreeIcons,
	Moon02FreeIcons,
	Sun03FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import Button from "./../../components/shared/Button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UserContext } from "../../context/UserContext";
import DateSelectionCard from "../shared/DateSelectionCard";

export default function AddToMealActionSheet({
	recipeDetail,
	hideActionSheet,
}) {
	const [selectedDate, setSelectedDate] = useState();
	const [selectedMeal, setSelectedMeal] = useState();
	const CreateMealPlan = useMutation(api.MealPlan.CreateMealPlan);
	const { user } = useContext(UserContext);
	const mealOptions = [
		{
			title: "Breakfast",
			icon: Coffee02FreeIcons,
		},
		{
			title: "Lunch",
			icon: Sun03FreeIcons,
		},
		{
			title: "Dinner",
			icon: Moon02FreeIcons,
		},
	];

	const AddToMealPlan = async () => {
		if (!selectedDate || !selectedMeal) {
			Alert.alert("Error!", "Please select a date and meal type.");
			return;
		}
		const result = await CreateMealPlan({
			recipeId: recipeDetail?._id,
			date: selectedDate,
			mealType: selectedMeal,
			userId: user?._id,
		});
		hideActionSheet();
	};

	return (
		<View
			style={{
				padding: 20,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "bold",
					textAlign: "center",
				}}
			>
				Add to Meal Plan
			</Text>

			<DateSelectionCard
				setSelectedDate={setSelectedDate}
				selectedDate={selectedDate}
			/>

			<Text
				style={{
					fontSize: 20,
					fontWeight: "500",
					marginTop: 15,
				}}
			>
				Select Meal
			</Text>
			<FlatList
				data={mealOptions}
				numColumns={4}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						onPress={() => {
							setSelectedMeal(item?.title);
						}}
						style={{
							display: "flex",
							flex: 1,
							alignItems: "center",
							padding: 7,
							borderWidth: selectedMeal === item.title ? 2 : 1,
							borderRadius: 10,
							margin: 5,
							backgroundColor:
								selectedMeal === item.title ? Colors.SECONDARY : Colors.WHITE,
							borderColor:
								selectedMeal === item.title ? Colors.PRIMARY : Colors.GRAY,
						}}
					>
						<HugeiconsIcon
							icon={item.icon}
							size={30}
							color={selectedMeal === item.title ? Colors.PRIMARY : Colors.GRAY}
						/>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "450",
							}}
						>
							{" "}
							{item.title}{" "}
						</Text>
					</TouchableOpacity>
				)}
			/>

			<View
				style={{
					marginTop: 15,
				}}
			>
				<Button title="+ Add to Meal Plan" onPress={AddToMealPlan} />
				<TouchableOpacity
					onPress={() => hideActionSheet()}
					style={{ padding: 15 }}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "500",
							textAlign: "center",
							marginTop: 10,
							color: Colors.GRAY,
						}}
					>
						Cancel
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}