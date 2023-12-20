import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  mediaListMedias,
  mediaLists,
  mediaListTypes,
} from "@media/db/schema/mediaList";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const mediaListRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaLists.findMany({
      orderBy: desc(schema.mediaLists.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaLists.findFirst({
        where: eq(schema.mediaLists.id, input.id),
      });
    }),
  create: createCreateQuery<typeof mediaLists>(
    mediaLists,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaLists>(mediaLists),
});

export const mediaListTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaListTypes.findMany({
      orderBy: desc(schema.mediaListTypes.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaListTypes.findFirst({
        where: eq(schema.mediaListTypes.id, input.id),
      });
    }),
  create: createCreateQuery<typeof mediaListTypes>(
    mediaListTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaListTypes>(mediaListTypes),
});

export const mediaListMediaRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaListMedias.findMany({
      orderBy: desc(schema.mediaListMedias.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaListMedias.findFirst({
        where: eq(schema.mediaListMedias.id, input.id),
      });
    }),
  create: createCreateQuery<typeof mediaListMedias>(
    mediaListMedias,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaListMedias>(mediaListMedias),
});
