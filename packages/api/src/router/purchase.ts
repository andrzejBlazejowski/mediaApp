import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  purchaseItemsInsertSchema,
  purchasesInsertSchema,
  purchaseTypesInsertSchema,
} from "@media/db/schema/purchase";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const purchaseRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.purchases.findMany({
      orderBy: desc(schema.purchases.id),
      with: {
        purchaseType: true,
        user: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.purchases.findFirst({
        where: eq(schema.purchases.id, input.id),
        with: {
          purchaseType: true,
          user: true,
          purchaseItems: true,
        },
      });
    }),
  create: protectedProcedure
    .input(purchasesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.purchases).values(input);
    }),
  update: protectedProcedure
    .input(purchasesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.purchases)
        .set(input)
        .where(eq(schema.purchases.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.purchases)
      .where(eq(schema.purchases.id, input));
  }),
});

export const purchaseItemRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.purchaseItems.findMany({
      orderBy: desc(schema.purchaseItems.id),
      with: {
        purchase: true,
        media: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.purchaseItems.findFirst({
        where: eq(schema.purchaseItems.id, input.id),
        with: {
          purchase: true,
          media: true,
        },
      });
    }),
  create: protectedProcedure
    .input(purchaseItemsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.purchaseItems).values(input);
    }),
  update: protectedProcedure
    .input(purchaseItemsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.purchaseItems)
        .set(input)
        .where(eq(schema.purchaseItems.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.purchaseItems)
      .where(eq(schema.purchaseItems.id, input));
  }),
});

export const purchaseTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.purchaseTypes.findMany({
      orderBy: desc(schema.purchaseTypes.id),
      with: {},
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.purchaseTypes.findFirst({
        where: eq(schema.purchaseTypes.id, input.id),
        with: {},
      });
    }),
  create: protectedProcedure
    .input(purchaseTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.purchaseTypes).values(input);
    }),
  update: protectedProcedure
    .input(purchaseTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.purchaseTypes)
        .set(input)
        .where(eq(schema.purchaseTypes.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.purchaseTypes)
      .where(eq(schema.purchaseTypes.id, input));
  }),
});
