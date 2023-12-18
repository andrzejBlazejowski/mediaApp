import { desc } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  mediaListMedias,
  mediaLists,
  mediaListTypes,
} from "@media/db/schema/mediaList";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const mediaListRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.mediaLists.findMany({
      orderBy: desc(schema.mediaLists.id),
    });
  }),
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
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.mediaListTypes.findMany({
      orderBy: desc(schema.mediaListTypes.id),
    });
  }),
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
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.mediaListMedias.findMany({
      orderBy: desc(schema.mediaListMedias.id),
    });
  }),
  byId: createByIDQuery<typeof mediaListMedias>(mediaListMedias),
  create: createCreateQuery<typeof mediaListMedias>(
    mediaListMedias,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaListMedias>(mediaListMedias),
});
