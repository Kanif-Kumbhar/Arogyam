import {
	View,
	Text,
	Platform,
	FlatList,
	Modal,
	StyleSheet,
} from "react-native";
import React from "react";
import GenerateRecipeCard from "../../components/home/GenerateRecipeCard";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import RecipeCard from "../../components/recipe/RecipeCard";
import Loader from "../../components/shared/Loader";

export default function Meals() {
	const recipeList = useQuery(api.Recipes.GetAllRecipes);

	const LoaderModal = ({ visible }) => (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			statusBarTranslucent
		>
			<View style={styles.overlay}>
				<Loader />
			</View>
		</Modal>
	);

	// Show loader while data is undefined
	const isLoading = recipeList === undefined;

	return (
		<>
			<LoaderModal visible={isLoading} />

			{!isLoading && (
				<FlatList
					data={[]}
					renderItem={() => null}
					ListHeaderComponent={
						<View
							style={{
								padding: 20,
								paddingTop: Platform.OS === "ios" ? 40 : 30,
							}}
						>
							<Text
								style={{
									fontSize: 30,
									fontWeight: "bold",
								}}
							>
								Discover Recipes
							</Text>
							<GenerateRecipeCard />

							<View style={{ marginTop: 5 }}>
								<FlatList
									data={recipeList}
									numColumns={2}
									renderItem={({ item }) => <RecipeCard recipe={item} />}
									keyExtractor={(item) => item._id}
									scrollEnabled={false}
								/>
							</View>
						</View>
					}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "center",
		alignItems: "center",
	},
});
