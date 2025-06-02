import { View, Text, Image, StyleSheet } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
	Fire03FreeIcons,
	TimeQuarter02FreeIcons,
} from "@hugeicons/core-free-icons";
import Colors from "../../shared/Colors";
import { Link } from "expo-router";

export default function RecipeCard({ recipe, fullWidth = false }) {
	const recipeJson = recipe?.jsonData;

	return (
		<Link
			href={"/recipe-detail?recipeId=" + recipe?._id}
			style={{
				flex: fullWidth ? undefined : 1,
				width: fullWidth ? "100%" : undefined,
			}}
		>
			<View
				style={[
					styles.cardContainer,
					fullWidth && styles.fullWidthCardContainer,
				]}
			>
				<Image
					source={{ uri: recipe?.imageUrl }}
					style={[styles.cardImage, fullWidth && styles.fullWidthCardImage]}
				/>
				<View style={styles.cardContent}>
					<Text style={styles.recipeTitle}>{recipe?.recipeName}</Text>
					<View
						style={[
							styles.infoRow,
							fullWidth ? styles.infoRowFullWidth : { gap: 15, marginTop: 6 },
						]}
					>
						<View style={styles.infoContainer}>
							<HugeiconsIcon
								icon={Fire03FreeIcons}
								size={18}
								color={Colors.PRIMARY}
							/>
							<Text style={styles.infoText}>{recipeJson?.calories} kcal</Text>
						</View>
						<View style={styles.infoContainerRight}>
							<HugeiconsIcon
								icon={TimeQuarter02FreeIcons}
								size={18}
								color={Colors.PRIMARY}
							/>
							<Text style={styles.infoText}>{recipeJson?.cookTime} min</Text>
						</View>
					</View>
				</View>
			</View>
		</Link>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		height: 180,
		backgroundColor: Colors.WHITE,
		borderRadius: 15,
		overflow: "hidden",
		elevation: 5,
	},
	fullWidthCardContainer: {
		width: "100%",
		height: 220,
	},
	cardImage: {
		width: "100%",
		height: 100,
	},
	fullWidthCardImage: {
		height: 140,
	},
	cardContent: {
		flex: 1,
		padding: 10,
		justifyContent: "center",
	},
	recipeTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	infoRow: {
		flexDirection: "row",
	},
	infoRowFullWidth: {
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 6,
	},
	infoContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	infoContainerRight: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	infoText: {
		fontSize: 14,
		color: Colors.GRAY,
	},
});
