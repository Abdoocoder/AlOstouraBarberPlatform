import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("bookings").order("desc").collect();
  },
});

export const listByDate = query({
  args: { date: v.string() },
  handler: async (ctx, { date }) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_date", (q) => q.eq("date", date))
      .collect();
  },
});

export const create = mutation({
  args: {
    serviceId: v.id("services"),
    serviceName: v.string(),
    date: v.string(),
    time: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    clerkUserId: v.optional(v.string()),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookings", { ...args, status: "pending" });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, { id, status }) => {
    await ctx.db.patch(id, { status });
  },
});
