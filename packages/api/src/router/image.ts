import { z } from "zod";

import { images } from "@media/db/schema/image";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const imageRouter = createTRPCRouter({
  all: createAllQuery<typeof images>(images),
  byId: createByIDQuery<typeof images>(images),
  create: createCreateQuery<typeof images>(
    images,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof images>(images),
});
