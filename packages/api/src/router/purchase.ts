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
  all: createAllQuery<typeof purchases>(purchases),
  byId: createByIDQuery<typeof purchases>(purchases),
  create: createCreateQuery<typeof purchases>(
    purchases,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof purchases>(purchases),
});

export const purchaseItemRouter = createTRPCRouter({
  all: createAllQuery<typeof purchaseItems>(purchaseItems),
  byId: createByIDQuery<typeof purchaseItems>(purchaseItems),
  create: createCreateQuery<typeof purchaseItems>(
    purchaseItems,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof purchaseItems>(purchaseItems),
});

export const purchaseTypeRouter = createTRPCRouter({
  all: createAllQuery<typeof purchaseTypes>(purchaseTypes),
  byId: createByIDQuery<typeof purchaseTypes>(purchaseTypes),
  create: createCreateQuery<typeof purchaseTypes>(
    purchaseTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof purchaseTypes>(purchaseTypes),
});
