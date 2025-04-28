import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateNutritionProfile = mutation({
  args: {
    userId: v.id("Users"),
    bmi: v.float64(),
    bmi_category: v.string(),
    bmr: v.float64(),
    calories: v.float64(),
    carbs: v.float64(),
    fats: v.float64(),
    proteins: v.float64(),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db.insert("NutritionProfile", {
      userId: args.userId,
      bmi: args.bmi,
      bmi_category: args.bmi_category,
      bmr: args.bmr,
      calories: args.calories,
      carbs: args.carbs,
      fats: args.fats,
      proteins: args.proteins,
      createdAt: Date.now(),
    });
    return profile;
  },
});

export const GetLatestNutritionProfile = query({
  args: {
    userId: v.id("Users"),
  },
  handler: async (ctx, args) => {
    const profiles = await ctx.db
      .query("NutritionProfile")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
    return profiles[0] ?? null; // return latest profile or null
  },
});

export const getByUserId = query({
  args: { userId: v.id("Users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("NutritionProfile")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});