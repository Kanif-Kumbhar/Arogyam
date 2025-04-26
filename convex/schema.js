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
    goal: v.optional(v.string()),
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
    createdAt: v.int64(), // Timestamp to know when this was calculated
  }),
});
