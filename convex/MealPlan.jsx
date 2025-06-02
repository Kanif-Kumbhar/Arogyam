import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateMealPlan = mutation({
	args: {
		recipeId: v.id("Recipes"),
		date: v.string(),
		mealType: v.string(),
		userId: v.id("Users"),
	},
	handler: async (ctx, args) => {
		const result = await ctx.db.insert("MealPlan", {
			recipeId: args.recipeId,
			date: args.date,
			mealType: args.mealType,
			userId: args.userId,
		});
		return result;
	},
});

export const GetTodayMealPlan = query({
	args: {
		userId: v.id("Users"),
		date: v.string(),
	},
	handler: async (ctx, args) => {
		const mealPlan = await ctx.db
			.query("MealPlan")
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), args.userId),
					q.eq(q.field("date"), args.date),
					q.not(q.eq(q.field("status"), true)) // <= fixed here
				)
			)
			.collect();

		const result = await Promise.all(
			mealPlan.map(async (mealPlan) => {
				const recipe = await ctx.db.get(mealPlan.recipeId);
				return {
					mealPlan,
					recipe,
				};
			})
		);

		return result;
	},
});

export const UpdateStatus = mutation({
	args: {
		id: v.id("MealPlan"),
		status: v.boolean(),
		calories: v.number(),
		proteins: v.number(),
		fats: v.number(),
		carbs: v.number(),
	},
	handler: async (ctx, args) => {
		const result = await ctx.db.patch(args.id, {
			status: args.status,
			calories: args.calories,
			proteins: args.proteins,
			fats: args.fats,
			carbs: args.carbs,
		});
	},
});

export const GetTotalCaloriesConsume = query({
	args: {
		date: v.string(),
		userId: v.id("Users"),
	},
	handler: async (ctx, args) => {
		const mealPlanResult = await ctx.db
			.query("MealPlan")
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), args.userId),
					q.eq(q.field("date"), args.date),
					q.eq(q.field("status"), true)
				)
			)
			.collect();

		const totalCalories = mealPlanResult.reduce((sum, meal) => {
			return sum + (meal.calories ?? 0);
		}, 0);
		return totalCalories;
	},
});

export const GetTotalNutritionConsume = query({
	args: {
		date: v.string(),
		userId: v.id("Users"),
	},
	handler: async (ctx, args) => {
		const mealPlanResult = await ctx.db
			.query("MealPlan")
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), args.userId),
					q.eq(q.field("date"), args.date),
					q.eq(q.field("status"), true)
				)
			)
			.collect();

		const totalNutrition = mealPlanResult.reduce(
			(totals, meal) => {
				totals.calories += meal.calories ?? 0;
				totals.proteins += meal.proteins ?? 0;
				totals.carbs += meal.carbs ?? 0;
				totals.fats += meal.fats ?? 0;
				return totals;
			},
			{ calories: 0, proteins: 0, carbs: 0, fats: 0 }
		);

		return totalNutrition;
	},
});

export const GetFavouriteRecipe = query({
	args: {
		userId: v.id("Users"),
	},
	handler: async (ctx, { userId }) => {
		const mealPlans = await ctx.db
			.query("MealPlan")
			.filter((q) => q.eq(q.field("userId"), userId))
			.collect();

		const recipeCount = {};

		for (const plan of mealPlans) {
			const id = plan.recipeId;
			recipeCount[id] = (recipeCount[id] || 0) + 1;
		}

		const sortedEntries = Object.entries(recipeCount).sort(
			(a, b) => b[1] - a[1]
		);
		const mostMadeId = sortedEntries.length > 0 ? sortedEntries[0][0] : null;

		if (!mostMadeId) return null;

		const recipe = await ctx.db.get(mostMadeId);

		return recipe;
	},
});  