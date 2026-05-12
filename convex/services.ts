import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("services").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    durationMinutes: v.number(),
    category: v.union(v.literal("hair"), v.literal("beard"), v.literal("spa"), v.literal("packages")),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("services", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("services"),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    durationMinutes: v.optional(v.number()),
    category: v.optional(v.union(v.literal("hair"), v.literal("beard"), v.literal("spa"), v.literal("packages"))),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const seed = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("services").collect();
    if (existing.length > 0) return;
    const defaults = [
      { name: "قصة الأسطورة", price: 150, durationMinutes: 45, category: "hair" as const, description: "قصة شعر متكاملة مع غسيل وتصفيف احترافي حسب ملامح وجهك." },
      { name: "قصة كلاسيكية", price: 100, durationMinutes: 30, category: "hair" as const, description: "القصة التقليدية التي لا تفقد بريقها أبدًا." },
      { name: "تحديد وتدريج اللحية", price: 80, durationMinutes: 30, category: "beard" as const, description: "نحت اللحية وتحديدها بالأمواس والزيوت الطبيعية." },
      { name: "حلاقة ملكية", price: 120, durationMinutes: 40, category: "beard" as const, description: "حلاقة بالمنشفة الساخنة والزيوت العطرية لتنعيم البشرة." },
      { name: "تنظيف بشرة ملكي", price: 200, durationMinutes: 60, category: "spa" as const, description: "برنامج متكامل لتنظيف المسام وتقشير وتنعيم بشرة الوجه." },
      { name: "مساج فروة الرأس", price: 50, durationMinutes: 15, category: "spa" as const, description: "تجربة استرخاء عميقة لتنشيط الدورة الدموية." },
      { name: "باقة العريس", price: 500, durationMinutes: 180, category: "packages" as const, description: "كل ما يحتاجه العريس من شعر ولحية وبشرة في جلسة واحدة." },
      { name: "باقة الــVIP الأسبوعية", price: 300, durationMinutes: 90, category: "packages" as const, description: "الحل الأمثل للحفاظ على مظهرك أسبوعيًا بأسعار تفضيلية." },
    ];
    for (const s of defaults) {
      await ctx.db.insert("services", s);
    }
  },
});
