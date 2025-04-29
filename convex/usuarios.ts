import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
export const getUsuarios = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("usuarios").collect();
  },
});

export const atualizarStatus = mutation({
  args: {
    digitando: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Usuário não autenticado");
    }

    const userId = identity.subject as Id<"users">;

    // Procura o registro do usuário
    const usuario = await ctx.db
      .query("usuarios")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!usuario) {
      // Se não existir, cria um novo
      return await ctx.db.insert("usuarios", {
        userId,
        name: identity.name ?? "Anônimo",
        ultimaAtividade: Date.now(),
        digitando: args.digitando,
      });
    }

    // Se existir, atualiza
    return await ctx.db.patch(usuario._id, {
      ultimaAtividade: Date.now(),
      digitando: args.digitando,
    });
  },
});
