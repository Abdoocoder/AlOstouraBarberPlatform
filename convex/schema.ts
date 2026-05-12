import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  services: defineTable({
    name: v.string(),
    price: v.number(),
    durationMinutes: v.number(),
    category: v.union(
      v.literal("hair"),
      v.literal("beard"),
      v.literal("spa"),
      v.literal("packages"),
    ),
    description: v.string(),
  }),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  }),

  bookings: defineTable({
    serviceId: v.id("services"),
    serviceName: v.string(),
    date: v.string(),
    time: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    clerkUserId: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    price: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_date", ["date"]),

  gallery: defineTable({
    title: v.string(),
    category: v.string(),
    url: v.string(),
    order: v.number(),
  }),

  siteContent: defineTable({
    key: v.string(),
    value: v.string(),
  }),

  barbers: defineTable({
    name: v.string(),
    role: v.string(),
    imageUrl: v.string(),
    bio: v.string(),
    sortOrder: v.number(),
  }),
});
