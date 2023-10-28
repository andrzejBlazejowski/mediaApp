import { z } from "zod";

import { articleScreens } from "@media/db/schema/articleScreen";

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
      content: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof articleScreens>(articleScreens),
});
