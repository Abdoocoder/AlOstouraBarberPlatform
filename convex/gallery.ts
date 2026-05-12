import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("gallery").order("asc").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    url: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("gallery", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("gallery"),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    url: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
