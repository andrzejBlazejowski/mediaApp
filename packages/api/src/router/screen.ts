import { desc } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { screens, screenTypes } from "@media/db/schema/screen";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const screenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.screens.findMany({ orderBy: desc(schema.screens.id) });
  }),

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
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.screenTypes.findMany({
      orderBy: desc(schema.screenTypes.id),
    });
  }),

  byId: createByIDQuery<typeof screenTypes>(screenTypes),
  create: createCreateQuery<typeof screenTypes>(
    screenTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof screenTypes>(screenTypes),
});
