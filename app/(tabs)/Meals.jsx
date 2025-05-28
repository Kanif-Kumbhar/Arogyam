import { View, Text, Platform, FlatList } from "react-native";
import React from "react";
import GenerateRecipeCard from "../../components/home/GenerateRecipeCard";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import RecipeCard from "../../components/recipe/RecipeCard";

export default function Meals() {
	const recipeList = useQuery(api.Recipes.GetAllRecipes);

	return (
		<FlatList
			data={[]}
			renderItem={() => null}
			ListHeaderComponent={
				<View
					style={{
						padding: 20,
						paddingTop: Platform.OS == "ios" ? 40 : 30,
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

					<View
						style={{
							marginTop: 5,
						}}
					>
						<FlatList
							data={recipeList}
							numColumns={2}
							renderItem={({ item }) => <RecipeCard recipe={item} />}
						/>
					</View>
				</View>
			}
		/>
	);
}
