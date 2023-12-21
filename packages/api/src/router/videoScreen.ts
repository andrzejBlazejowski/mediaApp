import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  vodScreenMediaLists,
  vodScreenMediaListsInsertSchema,
  vodScreens,
  vodScreensInsertSchema,
  vodScreenTypes,
  vodScreenTypesInsertSchema,
} from "@media/db/schema/vodScreen";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createDeleteQuery } from "./commonRouter";

export const vodScreenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.vodScreens.findMany({
      orderBy: desc(schema.vodScreens.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.vodScreens.findFirst({
        where: eq(schema.vodScreens.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(vodScreensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.vodScreens).values(input);
    }),
  delete: createDeleteQuery<typeof vodScreens>(vodScreens),
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
  delete: createDeleteQuery<typeof vodScreenTypes>(vodScreenTypes),
});

export const vodScreenMediaListRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.vodScreenMediaLists.findMany({
      orderBy: desc(schema.vodScreenMediaLists.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.vodScreenMediaLists.findFirst({
        where: eq(schema.vodScreenMediaLists.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(vodScreenMediaListsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.vodScreenMediaLists).values(input);
    }),
  delete: createDeleteQuery<typeof vodScreenMediaLists>(vodScreenMediaLists),
});
