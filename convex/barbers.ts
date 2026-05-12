import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("barbers").order("asc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    imageUrl: v.string(),
    bio: v.string(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("barbers", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("barbers"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("barbers") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
