import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateRecipe = mutation({
  args: {
    recipeName: v.string(),
    imageUrl: v.optional(v.string()),
    jsonData: v.any(),
    uid: v.id("Users"),
  },
  handler: async (convexToJson, args) => {
    const result = await convexToJson.db.insert("Recipes", {
      recipeName: args.recipeName,
      imageUrl: args.imageUrl,
      jsonData: args.jsonData,
      uid: args.uid,
    });
    return result;
  },
});

export const GetRecipeById = query({
  args: {
    id: v.id("Recipes"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  },
});