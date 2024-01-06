import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  vodScreenMediaListsInsertSchema,
  vodScreensInsertSchema,
  vodScreenTypesInsertSchema,
} from "@media/db/schema/vodScreen";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const vodScreenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.vodScreens.findMany({
      orderBy: desc(schema.vodScreens.id),
      with: {
        screens: true,
        vodScreenType: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.vodScreens.findFirst({
        where: eq(schema.vodScreens.id, input.id),
        with: {
          screens: true,
          vodScreenType: true,
        },
      });
    }),

  create: protectedProcedure
    .input(vodScreensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.vodScreens).values(input);
    }),
  update: protectedProcedure
    .input(vodScreensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.vodScreens)
        .set(input)
        .where(eq(schema.vodScreens.id, input.id ?? 0));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.vodScreens)
      .where(eq(schema.vodScreens.id, input));
  }),
});

export const vodScreenTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.vodScreenTypes.findMany({
      orderBy: desc(schema.vodScreenTypes.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.vodScreenTypes.findFirst({
        where: eq(schema.vodScreenTypes.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(vodScreenTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.vodScreenTypes).values(input);
    }),
  update: protectedProcedure
    .input(vodScreenTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.vodScreenTypes)
        .set(input)
        .where(eq(schema.vodScreenTypes.id, input.id ?? 0));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.vodScreenTypes)
      .where(eq(schema.vodScreenTypes.id, input));
  }),
});

export const vodScreenMediaListRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.vodScreenMediaLists.findMany({
      orderBy: desc(schema.vodScreenMediaLists.id),
      with: {
        vodScreen: true,
        mediaList: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.vodScreenMediaLists.findFirst({
        where: eq(schema.vodScreenMediaLists.id, input.id),
        with: {
          vodScreen: true,
          mediaList: true,
        },
      });
    }),

  create: protectedProcedure
    .input(vodScreenMediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.vodScreenMediaLists).values(input);
    }),
  update: protectedProcedure
    .input(vodScreenMediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.vodScreenMediaLists)
        .set(input)
        .where(eq(schema.vodScreenMediaLists.id, input.id ?? 0));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.vodScreenMediaLists)
      .where(eq(schema.vodScreenMediaLists.id, input));
  }),
});
