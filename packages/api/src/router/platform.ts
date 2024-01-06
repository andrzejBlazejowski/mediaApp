import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  menuPlatformsInsertSchema,
  platformsInsertSchema,
} from "@media/db/schema/platform";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const platformRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.platforms.findMany({
      orderBy: desc(schema.platforms.id),
      with: {
        menuPlatforms: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.platforms.findFirst({
        where: eq(schema.platforms.id, input.id),
        with: {
          menuPlatforms: true,
        },
      });
    }),
  create: protectedProcedure
    .input(platformsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.platforms).values(input);
    }),
  update: protectedProcedure
    .input(platformsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.platforms)
        .set(input)
        .where(eq(schema.platforms.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.platforms)
      .where(eq(schema.platforms.id, input));
  }),
});

export const menuPlatformRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menuPlatforms.findMany({
      orderBy: desc(schema.menuPlatforms.id),
      with: {
        platform: true,
        menu: true,
      },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuPlatforms.findFirst({
        where: eq(schema.menuPlatforms.id, input.id),
        with: {
          platform: true,
          menu: true,
        },
      });
    }),

  create: protectedProcedure
    .input(menuPlatformsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuPlatforms).values(input);
    }),
  update: protectedProcedure
    .input(menuPlatformsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menuPlatforms)
        .set(input)
        .where(eq(schema.menuPlatforms.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.menuPlatforms)
      .where(eq(schema.menuPlatforms.id, input));
  }),
});
