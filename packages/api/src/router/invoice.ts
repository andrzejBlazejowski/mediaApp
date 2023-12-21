import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  invoices,
  invoicesInsertSchema,
  invoiceTemplates,
  invoiceTemplatesInsertSchema,
  invoiceTypes,
  invoiceTypesInsertSchema,
} from "@media/db/schema/invoice";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createDeleteQuery } from "./commonRouter";

export const invoiceRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.invoices.findMany({
      orderBy: desc(schema.invoices.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.invoices.findFirst({
        where: eq(schema.invoices.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(invoicesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.invoices).values(input);
    }),
  delete: createDeleteQuery<typeof invoices>(invoices),
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
  delete: createDeleteQuery<typeof invoiceTypes>(invoiceTypes),
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
  delete: createDeleteQuery<typeof invoiceTemplates>(invoiceTemplates),
});
