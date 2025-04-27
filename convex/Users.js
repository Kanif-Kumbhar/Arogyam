import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length == 0) {
      const data = {
        name: args.name,
        email: args.email,
        credits: 10,
      };
      const result = await ctx.db.insert("Users", {
        ...data,
      });
      return data;
    }
    return user[0];
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return user[0];
  },
});

export const UpdateUserPref = mutation({
  args: {
    uid: v.id("Users"),
    height: v.float64(),
    weight: v.float64(),
    gender: v.string(),
    goal: v.string(),
    age: v.float64(),
    foodType: v.string(),
    medicalCondition: v.string(),
    activityLevel: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.uid, {
      height: args.height,
      weight: args.weight,
      goal: args.goal,
      gender: args.gender,
      age: args.age,
      foodType: args.foodType,
      medicalCondition: args.medicalCondition,
      activityLevel: args.activityLevel,
    });
    return result;
  },
});