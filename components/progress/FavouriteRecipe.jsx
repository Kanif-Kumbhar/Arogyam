import { View, Text } from 'react-native'
import React from 'react'
import { api } from "../../convex/_generated/api";
import { useQuery } from 'convex/react';
import RecipeCard from "../../components/recipe/RecipeCard";


export default function FavouriteRecipe({userId}) {
    
    const favouriteRecipes = useQuery(api.MealPlan.GetFavouriteRecipe,{userId});
    
    return (
			<View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "500",
                    marginBottom: 5,
                }}>Favourite Recipe</Text>
				<RecipeCard recipe={favouriteRecipes} fullWidth={true}/>
			</View>
		);
}