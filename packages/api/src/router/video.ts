import { z } from "zod";

import { videos } from "@media/db/schema/video";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const videoRouter = createTRPCRouter({
  all: createAllQuery<typeof videos>(videos),
  byId: createByIDQuery<typeof videos>(videos),
  create: createCreateQuery<typeof videos>(
    videos,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof videos>(videos),
});
