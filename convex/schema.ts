import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  messages: defineTable({
    text: v.string(),
    userId: v.id("users"),
    timestamp: v.number(),
  }),
  usuarios: defineTable({
    userId: v.id("users"),
    name: v.string(),
    ultimaAtividade: v.number(),
    digitando: v.boolean(),
    imagem: v.optional(v.string()),
  }).index("by_user", ["userId"]),
});
