import { View, Modal, Platform, FlatList, StyleSheet } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import React, { useRef } from "react";
import RecipeIntro from "../../components/recipeDetail/RecipeIntro";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Colors from "../../shared/Colors";
import RecipeIngredients from "../../components/recipeDetail/RecipeIngredients";
import RecipeSteps from "../../components/recipeDetail/RecipeSteps";
import Button from "../../components/shared/Button";
import AddToMealActionSheet from "../../components/actionSheets/AddToMealActionSheet";
import Loader from "../../components/shared/Loader";

export default function RecipeDetail() {
	const { recipeId } = useLocalSearchParams();

	const recipeDetails = useQuery(api.Recipes.GetRecipeById, {
		id: recipeId ?? "jn79xbdyf2yx6vyrfp66718c5h7fda7f",
	});

	const isLoading = recipeDetails === undefined;

	const actionSheetRef = useRef(null);

	const LoaderModal = ({ visible }) => {
		return (
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
	};

	return (
		<>
			<LoaderModal visible={isLoading} />
			<FlatList
				data={[]}
				renderItem={() => null}
				ListHeaderComponent={
					!isLoading && (
						<View
							style={{
								padding: 20,
								paddingTop: Platform.OS === "ios" ? 40 : 30,
								backgroundColor: Colors.WHITE,
								height: "100%",
							}}
						>
							{/* Recipe Intro */}
							<RecipeIntro recipeDetail={recipeDetails} />

							{/* Recipe Ingredients */}
							<RecipeIngredients recipeDetail={recipeDetails} />

							{/* Cooking Steps */}
							<RecipeSteps recipeDetail={recipeDetails} />

							<View style={{ marginTop: 10 }}>
								<Button
									title={"Add to Meal Plan"}
									onPress={() => actionSheetRef.current?.show()}
								/>
							</View>

							<ActionSheet ref={actionSheetRef}>
								<AddToMealActionSheet
									recipeDetail={recipeDetails}
									hideActionSheet={() => actionSheetRef.current?.hide()}
								/>
							</ActionSheet>
						</View>
					)
				}
			/>
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
