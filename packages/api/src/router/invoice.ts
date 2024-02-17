import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  invoicesInsertSchema,
  invoiceTemplatesInsertSchema,
  invoiceTypesInsertSchema,
} from "@media/db/schema/invoice";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const invoiceRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.invoices;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.invoices.findMany({
      with: {
        invoiceType: true,
        media: true,
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
      return ctx.db.query.invoices.findFirst({
        where: eq(schema.invoices.id, input.id),
        with: {
          invoiceType: true,
          media: true,
          user: true,
        },
      });
    }),

  create: permitedProcedure
    .input(invoicesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.invoices).values(input);
    }),
  update: permitedProcedure
    .input(invoicesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.invoices)
        .set(input)
        .where(eq(schema.invoices.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.invoices).where(eq(schema.invoices.id, input));
  }),
});

export const invoiceTypeRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.invoiceTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.invoiceTypes.findMany({
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
      return ctx.db.query.invoiceTypes.findFirst({
        where: eq(schema.invoiceTypes.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(invoiceTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.invoiceTypes).values(input);
    }),
  update: permitedProcedure
    .input(invoiceTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.invoiceTypes)
        .set(input)
        .where(eq(schema.invoiceTypes.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.invoiceTypes)
      .where(eq(schema.invoiceTypes.id, input));
  }),
});

export const invoiceTemplateRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.invoiceTemplates;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.invoiceTemplates.findMany({
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
      return ctx.db.query.invoiceTemplates.findFirst({
        where: eq(schema.invoiceTemplates.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(invoiceTemplatesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.invoiceTemplates).values(input);
    }),
  update: permitedProcedure
    .input(invoiceTemplatesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.invoiceTemplates)
        .set(input)
        .where(eq(schema.invoiceTemplates.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.invoiceTemplates)
      .where(eq(schema.invoiceTemplates.id, input));
  }),
});
