import { z } from "zod";

import { genres } from "@media/db/schema/genre";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const genreRouter = createTRPCRouter({
  all: createAllQuery<typeof genres>(genres),
  byId: createByIDQuery<typeof genres>(genres),
  create: createCreateQuery<typeof genres>(
    genres,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof genres>(genres),
});
