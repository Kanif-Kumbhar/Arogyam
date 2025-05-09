import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import Colors from "../../shared/Colors";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
	CheckmarkSquare02FreeIcons,
	SquareFreeIcons,
} from "@hugeicons/core-free-icons";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useContext } from "react";
import { RefreshDataContext } from "../../context/RefreshDataContext";

export default function MealPlanCard({ mealPlanInfo }) {
	const updateStatus = useMutation(api.MealPlan.UpdateStatus);

	const { refreshData, setRefreshData } = useContext(RefreshDataContext);

	const onCheck = async (status) => {
		const result = await updateStatus({
			id: mealPlanInfo?.mealPlan?._id,
			status: status,
			calories: mealPlanInfo?.recipe?.jsonData?.calories,
		});
		Alert.alert("Great!", "Status updated successfully");

		setRefreshData(Date.now());
	};

	return (
		<View
			style={{
				padding: 10,
				display: "flex",
				flexDirection: "row",
				gap: 10,
				backgroundColor: Colors.WHITE,
				marginTop: 10,
				borderRadius: 15,
			}}
		>
			<Image
				source={{ uri: mealPlanInfo?.recipe?.imageUrl }}
				style={{
					width: 70,
					height: 70,
					borderRadius: 15,
				}}
			/>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 10,
					flex: 1,
				}}
			>
				<View>
					<Text style={styles.mealType}>
						{mealPlanInfo?.mealPlan?.mealType}
					</Text>
					<Text style={styles.recipeName}>
						{mealPlanInfo?.recipe?.recipeName}
					</Text>
					<Text style={styles.calories}>
						{mealPlanInfo?.recipe?.jsonData?.calories}kcal
					</Text>
				</View>
				<View>
					{mealPlanInfo?.mealPlan?.status != true ? (
						<TouchableOpacity onPress={() => onCheck(true)}>
							<HugeiconsIcon
								icon={SquareFreeIcons}
								size={20}
								color={Colors.GRAY}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={() => onCheck(false)}>
							<HugeiconsIcon
								icon={CheckmarkSquare02FreeIcons}
								size={20}
								color={Colors.PRIMARY}
							/>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mealType: {
		backgroundColor: Colors.SECONDARY,
		color: Colors.PRIMARY,
		padding: 1,
		paddingHorizontal: 10,
		borderRadius: 99,
		alignSelf: "flex-start",
	},
	recipeName: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 5,
	},
	calories: {
		fontSize: 16,
		fontWeight: "500",
		marginTop: 5,
		color: Colors.GRAY,
	},
});
