import { View, Text, Platform, FlatList } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import React, { useRef } from "react";
import RecipeIntro from "../../components/recipeDetail/RecipeIntro";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Colors from "../../shared/Colors";
import RecipeIngredients from "../../components/recipeDetail/RecipeIngredients";
import RecipeSteps from "../../components/recipeDetail/RecipeSteps";
import Button from "./../../components/shared/Button";
import AddToMealActionSheet from "../../components/actionSheets/AddToMealActionSheet";

export default function RecipeDetail() {
	const { recipeId } = useLocalSearchParams();

	const recipeDetails = useQuery(api.Recipes.GetRecipeById, {
		id: recipeId == undefined ? "jn79xbdyf2yx6vyrfp66718c5h7fda7f" : recipeId,
	});

	const actionSheetRef = useRef(null);
	return (
		<FlatList
			data={[]}
			renderItem={() => null}
			ListHeaderComponent={
				<View
					style={{
						padding: 20,
						paddingTop: Platform.OS == "ios" ? 40 : 30,
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

					<View
						style={{
							marginTop: 10,
						}}
					>
						<Button
							title={"Add to Meal Plan"}
							onPress={() => actionSheetRef.current.show()}
						/>
					</View>

					<ActionSheet ref={actionSheetRef}>
						<AddToMealActionSheet recipeDetail={recipeDetails} 
						hideActionSheet={() => actionSheetRef.current.hide()}/>
					</ActionSheet>
				</View>
			}
		/>
	);
}
