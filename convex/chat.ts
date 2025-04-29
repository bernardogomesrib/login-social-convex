import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    return (await ctx.db.query("messages").order("desc").take(50)).reverse();
  },
});

export const sendMessages = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Usuário não autenticado");
    }

    const userId = identity.subject.split("|")[0] as Id<"users">;

    await ctx.db.insert("messages", {
      text: args.text,
      userId,
      timestamp: Date.now(),
    });
  },
});


