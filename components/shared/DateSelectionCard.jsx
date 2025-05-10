import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Colors from "../../shared/Colors";

export default function DateSelectionCard({ setSelectedDate}) {
	const [dateList, setDateList] = useState([]);
	const [selectedDate_, setSelectedDate_] = useState();

	useEffect(() => {
		GenerateDates();
	}, []);

	const GenerateDates = () => {
		const result = [];
		for (let i = 0; i < 4; i++) {
			const nextDate = moment().add(i, "days").format("DD-MM-YYYY");
			result.push(nextDate);
		}

		setDateList(result);
	};

	return (
		<View>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "500",
					marginTop: 15,
				}}
			>
				Select Date
			</Text>

			<FlatList
				data={dateList}
				numColumns={4}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => {
							setSelectedDate(item);
							setSelectedDate_(item);
						}}
						style={{
							display: "flex",
							flex: 1,
							alignItems: "center",
							padding: 7,
							borderWidth: selectedDate_ === item ? 2 : 1,
							borderRadius: 10,
							margin: 5,
							backgroundColor:
								selectedDate_ === item ? Colors.SECONDARY : Colors.WHITE,
							borderColor: selectedDate_ === item ? Colors.PRIMARY : Colors.GRAY,
						}}
					>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "450",
							}}
						>
							{" "}
							{moment(item, "DD/MM/YYYY").format("ddd")}{" "}
						</Text>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
							}}
						>
							{" "}
							{moment(item, "DD/MM/YYYY").format("DD")}{" "}
						</Text>
						<Text
							style={{
								fontSize: 16,
							}}
						>
							{" "}
							{moment(item, "DD/MM/YYYY").format("MMM")}{" "}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}