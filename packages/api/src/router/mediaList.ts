import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  mediaListMediasInsertSchema,
  mediaListsInsertSchema,
  mediaListTypesInsertSchema,
} from "@media/db/schema/mediaList";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const mediaListRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaLists.findMany({
      orderBy: desc(schema.mediaLists.id),
      with: {
        mediaListType: true,
        mediaListMedias: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaLists.findFirst({
        where: eq(schema.mediaLists.id, input.id),
        with: {
          mediaListType: true,
          mediaListMedias: true,
        },
      });
    }),

  create: protectedProcedure
    .input(mediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaLists).values(input);
    }),
  update: protectedProcedure
    .input(mediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.videoContents)
        .set(input)
        .where(eq(schema.videoContents.id, input.id ?? 0));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaLists)
      .where(eq(schema.mediaLists.id, input));
  }),
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
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaListTypes)
      .where(eq(schema.mediaListTypes.id, input));
  }),
});

export const mediaListMediaRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaListMedias.findMany({
      orderBy: desc(schema.mediaListMedias.id),
      with: {
        mediaList: true,
        media: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaListMedias.findFirst({
        where: eq(schema.mediaListMedias.id, input.id),
        with: {
          mediaList: true,
          media: true,
        },
      });
    }),

  create: protectedProcedure
    .input(mediaListMediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaListMedias).values(input);
    }),
  update: protectedProcedure
    .input(mediaListMediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.videoContents)
        .set(input)
        .where(eq(schema.videoContents.id, input.id ?? 0));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaListMedias)
      .where(eq(schema.mediaListMedias.id, input));
  }),
});
