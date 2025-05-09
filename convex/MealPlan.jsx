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
					q.eq(q.field("date"), args.date)
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
