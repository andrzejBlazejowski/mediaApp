import { z } from "zod";

import {
  mediaCategories,
  mediaImages,
  mediaImageTypes,
  medias,
  mediaViewImpressions,
  videoContents,
  videoContentTypes,
} from "@media/db/schema/media";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const mediaRouter = createTRPCRouter({
  all: createAllQuery<typeof medias>(medias),
  byId: createByIDQuery<typeof medias>(medias),
  create: createCreateQuery<typeof medias>(
    medias,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof medias>(medias),
});

export const videoContentRouter = createTRPCRouter({
  all: createAllQuery<typeof videoContents>(videoContents),
  byId: createByIDQuery<typeof videoContents>(videoContents),
  create: createCreateQuery<typeof videoContents>(
    videoContents,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof videoContents>(videoContents),
});

export const videoContentTypeRouter = createTRPCRouter({
  all: createAllQuery<typeof videoContentTypes>(videoContentTypes),
  byId: createByIDQuery<typeof videoContentTypes>(videoContentTypes),
  create: createCreateQuery<typeof videoContentTypes>(
    videoContentTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof videoContentTypes>(videoContentTypes),
});

export const mediaCategoyRouter = createTRPCRouter({
  all: createAllQuery<typeof mediaCategories>(mediaCategories),
  byId: createByIDQuery<typeof mediaCategories>(mediaCategories),
  create: createCreateQuery<typeof mediaCategories>(
    mediaCategories,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaCategories>(mediaCategories),
});

export const mediaImageRouter = createTRPCRouter({
  all: createAllQuery<typeof mediaImages>(mediaImages),
  byId: createByIDQuery<typeof mediaImages>(mediaImages),
  create: createCreateQuery<typeof mediaImages>(
    mediaImages,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaImages>(mediaImages),
});

export const mediaImageTypeRouter = createTRPCRouter({
  all: createAllQuery<typeof mediaImageTypes>(mediaImageTypes),
  byId: createByIDQuery<typeof mediaImageTypes>(mediaImageTypes),
  create: createCreateQuery<typeof mediaImageTypes>(
    mediaImageTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaImageTypes>(mediaImageTypes),
});

export const mediaViewImpressionRouter = createTRPCRouter({
  all: createAllQuery<typeof mediaViewImpressions>(mediaViewImpressions),
  byId: createByIDQuery<typeof mediaViewImpressions>(mediaViewImpressions),
  create: createCreateQuery<typeof mediaViewImpressions>(
    mediaViewImpressions,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaViewImpressions>(mediaViewImpressions),
});
