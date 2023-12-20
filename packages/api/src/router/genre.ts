import { desc } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { genres } from "@media/db/schema/genre";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const genreRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.genres.findMany({ orderBy: desc(schema.genres.id) });
  }),
  byId: createByIDQuery<typeof genres>(genres),
  create: createCreateQuery<typeof genres>(
    genres,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof genres>(genres),
});
