import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateMealPlan = mutation({
    args:{
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
    }
})