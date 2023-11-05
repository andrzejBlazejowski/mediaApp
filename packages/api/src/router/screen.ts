import { z } from "zod";

import { screens, screenTypes } from "@media/db/schema/screen";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const screenRouter = createTRPCRouter({
  all: createAllQuery<typeof screens>(screens),
  byId: createByIDQuery<typeof screens>(screens),
  create: createCreateQuery<typeof screens>(
    screens,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof screens>(screens),
});

export const screenTypeRouter = createTRPCRouter({
  all: createAllQuery<typeof screenTypes>(screenTypes),
  byId: createByIDQuery<typeof screenTypes>(screenTypes),
  create: createCreateQuery<typeof screenTypes>(
    screenTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof screenTypes>(screenTypes),
});
