import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  mediaListMedias,
  mediaListMediasInsertSchema,
  mediaLists,
  mediaListsInsertSchema,
  mediaListTypes,
  mediaListTypesInsertSchema,
} from "@media/db/schema/mediaList";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createDeleteQuery } from "./commonRouter";

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

  create: protectedProcedure
    .input(mediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaLists).values(input);
    }),
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

  create: protectedProcedure
    .input(mediaListTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaListTypes).values(input);
    }),
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

  create: protectedProcedure
    .input(mediaListMediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaListMedias).values(input);
    }),
  delete: createDeleteQuery<typeof mediaListMedias>(mediaListMedias),
});
