import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	Users: defineTable({
		name: v.string(),
		email: v.string(),
		picture: v.optional(v.string()),
		subscriptionId: v.optional(v.string()),
		credits: v.number(),
		height: v.optional(v.float64()),
		weight: v.optional(v.float64()),
		gender: v.optional(v.string()),
		age: v.optional(v.float64()),
		goal: v.optional(v.string()),
		foodType: v.optional(v.string()),
		medicalCondition: v.optional(v.string()),
		activityLevel: v.optional(v.string()),
	}),
	NutritionProfile: defineTable({
		userId: v.id("Users"),
		bmi: v.float64(),
		bmi_category: v.string(),
		bmr: v.float64(),
		calories: v.float64(),
		carbs: v.float64(),
		fats: v.float64(),
		proteins: v.float64(),
		createdAt: v.number(), // Timestamp to know when this was calculated
	}),
	Recipes: defineTable({
		recipeName: v.string(),
		jsonData: v.any(),
		imageUrl: v.optional(v.string()),
		uid: v.id("Users"),
	}),
	MealPlan: defineTable({
		recipeId: v.id("Recipes"),
		date: v.string(),
		mealType: v.string(), // breakfast, lunch, dinner
		userId: v.id("Users"),
	}),
});