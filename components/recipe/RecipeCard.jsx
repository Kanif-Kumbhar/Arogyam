import { View, Text,Image, StyleSheet } from 'react-native'
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
	Fire03FreeIcons,
	TimeQuarter02FreeIcons,
} from "@hugeicons/core-free-icons";
import Colors from '../../shared/Colors';
import { Link } from 'expo-router';

export default function RecipeCard({ recipe }) {
	const recipeJson = recipe?.jsonData;

	return (
		<Link
			href={"/recipe-detail?recipeId=" + recipe?._id}
			style={{
				flex: 1,
				margin: 5,
			}}
		>
			<View style={styles.cardContainer}>
				<Image source={{ uri: recipe?.imageUrl }} style={styles.cardImage} />
				<View style={styles.cardContent}>
					<Text style={styles.recipeTitle}>{recipe?.recipeName}</Text>
					<View style={[styles.infoRow, { gap: 15, marginTop: 6 }]}>
						<View style={styles.infoContainer}>
							<HugeiconsIcon
								icon={Fire03FreeIcons}
								size={18}
								color={Colors.PRIMARY}
							/>
							<Text style={styles.infoText}>{recipeJson?.calories} kcal</Text>
						</View>
						<View style={styles.infoContainer}>
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
		height: 180, // total fixed height for the card
		backgroundColor: Colors.WHITE,
		borderRadius: 15,
		overflow: "hidden",
	},
	cardImage: {
		width: "100%",
		height: 100,
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
	infoContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	infoText: {
		fontSize: 14,
		color: Colors.GRAY,
	},
});
