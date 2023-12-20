import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { menuPlatforms, platforms } from "@media/db/schema/platform";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCreateQuery, createDeleteQuery } from "./commonRouter";

export const platformRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.platforms.findMany({
      orderBy: desc(schema.platforms.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.platforms.findFirst({
        where: eq(schema.platforms.id, input.id),
      });
    }),
  create: createCreateQuery<typeof platforms>(
    platforms,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof platforms>(platforms),
});

export const menuPlatformRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menuPlatforms.findMany({
      orderBy: desc(schema.menuPlatforms.id),
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuPlatforms.findFirst({
        where: eq(schema.menuPlatforms.id, input.id),
      });
    }),
  create: createCreateQuery<typeof menuPlatforms>(
    menuPlatforms,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuPlatforms>(menuPlatforms),
});
