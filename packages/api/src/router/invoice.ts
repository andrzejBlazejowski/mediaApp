import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  invoices,
  invoiceTemplates,
  invoiceTypes,
} from "@media/db/schema/invoice";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCreateQuery, createDeleteQuery } from "./commonRouter";

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
  create: createCreateQuery<typeof invoices>(
    invoices,
    z.object({
      title: z.string().min(1),
    }),
  ),
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
  create: createCreateQuery<typeof invoiceTypes>(
    invoiceTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
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
  create: createCreateQuery<typeof invoiceTemplates>(
    invoiceTemplates,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof invoiceTemplates>(invoiceTemplates),
});
