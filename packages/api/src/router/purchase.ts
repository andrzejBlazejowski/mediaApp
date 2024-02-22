import type { AnyColumn } from "drizzle-orm";
import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  purchaseItemsInsertSchema,
  purchasesInsertSchema,
  purchaseTypesInsertSchema,
} from "@media/db/schema/purchase";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const purchaseRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.purchases;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.purchases.findMany({
      with: {
        purchaseType: true,
        user: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], `%${filter?.value}%`),
      }),
    });
  }),
  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.purchases.findFirst({
        where: eq(schema.purchases.id, input.id),
        with: {
          purchaseType: true,
          user: true,
          purchaseItems: {
            with: {
              media: true,
            },
          },
        },
      });
    }),
  create: permitedProcedure
    .input(purchasesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.purchases).values(input);
    }),
  update: permitedProcedure
    .input(purchasesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.purchases)
        .set(input)
        .where(eq(schema.purchases.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.purchases)
      .where(eq(schema.purchases.id, input));
  }),
});

export const purchaseItemRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.purchaseItems;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.purchaseItems.findMany({
      with: {
        purchase: true,
        media: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], `%${filter?.value}%`),
      }),
    });
  }),
  byId: permitedProcedure
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
  create: permitedProcedure
    .input(purchaseItemsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.purchaseItems).values(input);
    }),
  update: permitedProcedure
    .input(purchaseItemsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.purchaseItems)
        .set(input)
        .where(eq(schema.purchaseItems.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.purchaseItems)
      .where(eq(schema.purchaseItems.id, input));
  }),
});

export const purchaseTypeRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.purchaseTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.purchaseTypes.findMany({
      with: {},

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], `%${filter?.value}%`),
      }),
    });
  }),
  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.purchaseTypes.findFirst({
        where: eq(schema.purchaseTypes.id, input.id),
        with: {},
      });
    }),
  create: permitedProcedure
    .input(purchaseTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.purchaseTypes).values(input);
    }),
  update: permitedProcedure
    .input(purchaseTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.purchaseTypes)
        .set(input)
        .where(eq(schema.purchaseTypes.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.purchaseTypes)
      .where(eq(schema.purchaseTypes.id, input));
  }),
});
