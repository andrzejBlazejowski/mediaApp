import { z } from "zod";

import {
  articleScreenImages,
  articleScreens,
} from "@media/db/schema/articleScreen";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const articleScreenRouter = createTRPCRouter({
  all: createAllQuery<typeof articleScreens>(articleScreens),
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
  all: createAllQuery<typeof articleScreenImages>(articleScreenImages),
  byId: createByIDQuery<typeof articleScreenImages>(articleScreenImages),
  create: createCreateQuery<typeof articleScreenImages>(
    articleScreenImages,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof articleScreenImages>(articleScreenImages),
});
