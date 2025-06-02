import { View, Text, Platform, FlatList } from "react-native";
import React, { useState, useContext } from "react";
import DateSelectionCard from "../../components/shared/DateSelectionCard";
import TodayNutritionIntake from "../../components/progress/TodayNutritionIntake";
import moment from "moment";
import { UserContext } from "./../../context/UserContext";
import FavouriteRecipe from "../../components/progress/FavouriteRecipe";

export default function Progress() {
	const [selectedDate, setSelectedDate] = useState(
		moment().format("DD-MM-YYYY")
	);
	const { user } = useContext(UserContext);

	return (
		<FlatList
			data={[]}
			renderItem={() => null}
			ListHeaderComponent={
				<View
					style={{
						padding: 20,
						paddingTop: Platform.OS == "ios" ? 40 : 25,
					}}
				>
					<Text
						style={{
							fontSize: 25,
							fontWeight: "bold",
						}}
					>
						Progress
					</Text>

					<DateSelectionCard setSelectedDate={setSelectedDate} reverse={true} />
					<FavouriteRecipe userId={user._id} />
					<TodayNutritionIntake userId={user._id} selectedDate={selectedDate} />
				</View>
			}
		/>
	);
}
