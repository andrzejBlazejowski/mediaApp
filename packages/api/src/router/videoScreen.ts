import { desc } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  vodScreenMediaLists,
  vodScreens,
  vodScreenTypes,
} from "@media/db/schema/vodScreen";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const vodScreenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.vodScreens.findMany({
      orderBy: desc(schema.vodScreens.id),
    });
  }),
  byId: createByIDQuery<typeof vodScreens>(vodScreens),
  create: createCreateQuery<typeof vodScreens>(
    vodScreens,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof vodScreens>(vodScreens),
});

export const vodScreenTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.vodScreenTypes.findMany({
      orderBy: desc(schema.vodScreenTypes.id),
    });
  }),
  byId: createByIDQuery<typeof vodScreenTypes>(vodScreenTypes),
  create: createCreateQuery<typeof vodScreenTypes>(
    vodScreenTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof vodScreenTypes>(vodScreenTypes),
});

export const vodScreenMediaListRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.vodScreenMediaLists.findMany({
      orderBy: desc(schema.vodScreenMediaLists.id),
    });
  }),
  byId: createByIDQuery<typeof vodScreenMediaLists>(vodScreenMediaLists),
  create: createCreateQuery<typeof vodScreenMediaLists>(
    vodScreenMediaLists,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof vodScreenMediaLists>(vodScreenMediaLists),
});
