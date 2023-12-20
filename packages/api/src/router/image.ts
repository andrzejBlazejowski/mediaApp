import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { images } from "@media/db/schema/image";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const imageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.images.findMany({ orderBy: desc(schema.images.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.images.findFirst({
        where: eq(schema.images.id, input.id),
      });
    }),
  create: createCreateQuery<typeof images>(
    images,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof images>(images),
});
