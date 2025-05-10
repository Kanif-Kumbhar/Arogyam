import { View, Text, Platform, FlatList } from "react-native";
import React, { useState } from "react";
import DateSelectionCard from "../../components/shared/DateSelectionCard";
import TodaysMealPlan from "../../components/home/TodaysMealPlan";
import TodayProgress from "../../components/home/TodayProgress";

export default function Progress() {
	const [selectedDate, setSelectedDate] = useState();

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

					<DateSelectionCard setSelectedDate={setSelectedDate} />
					<TodaysMealPlan selectedDate={selectedDate} />
					<TodayProgress />
				</View>
			}
		/>
	);
}
