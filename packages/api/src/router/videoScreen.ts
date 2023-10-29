import { z } from "zod";

import {
  vodScreenMediaLists,
  vodScreens,
  vodScreenTypes,
} from "@media/db/schema/vodScreen";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const vodScreenRouter = createTRPCRouter({
  all: createAllQuery<typeof vodScreens>(vodScreens),
  byId: createByIDQuery<typeof vodScreens>(vodScreens),
  create: createCreateQuery<typeof vodScreens>(
    vodScreens,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof vodScreens>(vodScreens),
});

export const vodScreenTypeRouter = createTRPCRouter({
  all: createAllQuery<typeof vodScreenTypes>(vodScreenTypes),
  byId: createByIDQuery<typeof vodScreenTypes>(vodScreenTypes),
  create: createCreateQuery<typeof vodScreenTypes>(
    vodScreenTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof vodScreenTypes>(vodScreenTypes),
});

export const vodScreenMediaListRouter = createTRPCRouter({
  all: createAllQuery<typeof vodScreenMediaLists>(vodScreenMediaLists),
  byId: createByIDQuery<typeof vodScreenMediaLists>(vodScreenMediaLists),
  create: createCreateQuery<typeof vodScreenMediaLists>(
    vodScreenMediaLists,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof vodScreenMediaLists>(vodScreenMediaLists),
});
