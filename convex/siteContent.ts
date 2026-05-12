import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("siteContent").collect();
  },
});

export const update = mutation({
  args: {
    id: v.id("siteContent"),
    value: v.string(),
  },
  handler: async (ctx, { id, value }) => {
    await ctx.db.patch(id, { value });
  },
});
