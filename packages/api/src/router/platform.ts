import { desc } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { menuPlatforms, platforms } from "@media/db/schema/platform";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const platformRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.platforms.findMany({
      orderBy: desc(schema.platforms.id),
    });
  }),
  byId: createByIDQuery<typeof platforms>(platforms),
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
  byId: createByIDQuery<typeof menuPlatforms>(menuPlatforms),
  create: createCreateQuery<typeof menuPlatforms>(
    menuPlatforms,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuPlatforms>(menuPlatforms),
});
