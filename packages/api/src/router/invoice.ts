import { z } from "zod";

import {
  invoices,
  invoiceTemplates,
  invoiceTypes,
} from "@media/db/schema/invoice";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const invoiceRouter = createTRPCRouter({
  all: createAllQuery<typeof invoices>(invoices),
  byId: createByIDQuery<typeof invoices>(invoices),
  create: createCreateQuery<typeof invoices>(
    invoices,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof invoices>(invoices),
});

export const invoiceTypeRouter = createTRPCRouter({
  all: createAllQuery<typeof invoiceTypes>(invoiceTypes),
  byId: createByIDQuery<typeof invoiceTypes>(invoiceTypes),
  create: createCreateQuery<typeof invoiceTypes>(
    invoiceTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof invoiceTypes>(invoiceTypes),
});

export const invoiceTemplateRouter = createTRPCRouter({
  all: createAllQuery<typeof invoiceTemplates>(invoiceTemplates),
  byId: createByIDQuery<typeof invoiceTemplates>(invoiceTemplates),
  create: createCreateQuery<typeof invoiceTemplates>(
    invoiceTemplates,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof invoiceTemplates>(invoiceTemplates),
});
