import { z } from "zod";

import {
  purchaseItems,
  purchases,
  purchaseTypes,
} from "@media/db/schema/Purchase";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const purchaseRouter = createTRPCRouter({
  // TODO: fix it - change to specific query not generic
  all: createAllQuery<typeof purchases>(purchases),

  // byId: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.db.query.purchases.findFirst({
  //       where: eq(schema.purchases.id, input.id),
  //     });
  //   }),
  byId: createByIDQuery<typeof purchases>(purchases),

  // create: protectedProcedure
  //   .input(purchasesInsertSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(schema.purchases).values(input);
  //   }),

  create: createCreateQuery<typeof purchases>(
    purchases,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof purchases>(purchases),
});

export const purchaseItemRouter = createTRPCRouter({
  // TODO: fix it - change to specific query not generic
  all: createAllQuery<typeof purchaseItems>(purchaseItems),

  // byId: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.db.query.purchaseItems.findFirst({
  //       where: eq(schema.purchaseItems.id, input.id),
  //     });
  //   }),
  byId: createByIDQuery<typeof purchaseItems>(purchaseItems),

  // create: protectedProcedure
  //   .input(purchaseItemsInsertSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(schema.purchaseItems).values(input);
  //   }),

  create: createCreateQuery<typeof purchaseItems>(
    purchaseItems,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof purchaseItems>(purchaseItems),
});

export const purchaseTypeRouter = createTRPCRouter({
  // TODO: fix it - change to specific query not generic
  all: createAllQuery<typeof purchaseTypes>(purchaseTypes),

  // byId: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.db.query.purchaseTypes.findFirst({
  //       where: eq(schema.purchaseTypes.id, input.id),
  //     });
  //   }),
  byId: createByIDQuery<typeof purchaseTypes>(purchaseTypes),

  // create: protectedProcedure
  //   .input(purchaseTypesInsertSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(schema.purchaseTypes).values(input);
  //   }),

  create: createCreateQuery<typeof purchaseTypes>(
    purchaseTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof purchaseTypes>(purchaseTypes),
});
