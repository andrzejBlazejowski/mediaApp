import { desc } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  articleScreenImages,
  articleScreens,
} from "@media/db/schema/articleScreen";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const articleScreenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.articleScreens.findMany({
      orderBy: desc(schema.articleScreens.id),
    });
  }),

  byId: createByIDQuery<typeof articleScreens>(articleScreens),
  create: createCreateQuery<typeof articleScreens>(
    articleScreens,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof articleScreens>(articleScreens),
});

export const articleScreenImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.articleScreenImages.findMany({
      orderBy: desc(schema.articleScreenImages.id),
    });
  }),
  byId: createByIDQuery<typeof articleScreenImages>(articleScreenImages),
  create: createCreateQuery<typeof articleScreenImages>(
    articleScreenImages,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof articleScreenImages>(articleScreenImages),
});
