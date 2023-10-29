import { z } from "zod";

import { menuPlatforms, platforms } from "@media/db/schema/platform";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const platformRouter = createTRPCRouter({
  all: createAllQuery<typeof platforms>(platforms),
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
  all: createAllQuery<typeof menuPlatforms>(menuPlatforms),
  byId: createByIDQuery<typeof menuPlatforms>(menuPlatforms),
  create: createCreateQuery<typeof menuPlatforms>(
    menuPlatforms,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuPlatforms>(menuPlatforms),
});
