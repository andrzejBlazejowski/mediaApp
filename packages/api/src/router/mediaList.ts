import { z } from "zod";

import {
  mediaListMedias,
  mediaLists,
  mediaListTypes,
} from "@media/db/schema/mediaList";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const mediaListRouter = createTRPCRouter({
  all: createAllQuery<typeof mediaLists>(mediaLists),
  byId: createByIDQuery<typeof mediaLists>(mediaLists),
  create: createCreateQuery<typeof mediaLists>(
    mediaLists,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaLists>(mediaLists),
});

export const mediaListTypeRouter = createTRPCRouter({
  all: createAllQuery<typeof mediaListTypes>(mediaListTypes),
  byId: createByIDQuery<typeof mediaListTypes>(mediaListTypes),
  create: createCreateQuery<typeof mediaListTypes>(
    mediaListTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaListTypes>(mediaListTypes),
});

export const mediaListMediaRouter = createTRPCRouter({
  all: createAllQuery<typeof mediaListMedias>(mediaListMedias),
  byId: createByIDQuery<typeof mediaListMedias>(mediaListMedias),
  create: createCreateQuery<typeof mediaListMedias>(
    mediaListMedias,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaListMedias>(mediaListMedias),
});
