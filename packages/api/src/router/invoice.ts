import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  invoicesInsertSchema,
  invoiceTemplatesInsertSchema,
  invoiceTypesInsertSchema,
} from "@media/db/schema/invoice";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const invoiceRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.invoices.findMany({
      orderBy: desc(schema.invoices.id),
      with: {
        invoiceType: true,
        media: true,
        user: true,
      },
    });
  }),

  byId: publicProcedure
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

  create: protectedProcedure
    .input(invoicesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.invoices).values(input);
    }),
  update: protectedProcedure
    .input(invoicesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.invoices)
        .set(input)
        .where(eq(schema.invoices.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.invoices).where(eq(schema.invoices.id, input));
  }),
});

export const invoiceTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.invoiceTypes.findMany({
      orderBy: desc(schema.invoiceTypes.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.invoiceTypes.findFirst({
        where: eq(schema.invoiceTypes.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(invoiceTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.invoiceTypes).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.invoiceTypes)
      .where(eq(schema.invoiceTypes.id, input));
  }),
});

export const invoiceTemplateRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.invoiceTemplates.findMany({
      orderBy: desc(schema.invoiceTemplates.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.invoiceTemplates.findFirst({
        where: eq(schema.invoiceTemplates.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(invoiceTemplatesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.invoiceTemplates).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.invoiceTemplates)
      .where(eq(schema.invoiceTemplates.id, input));
  }),
});
