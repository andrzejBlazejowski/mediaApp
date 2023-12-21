import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  mediaCategories,
  mediaCategoriesInsertSchema,
  mediaImages,
  mediaImagesInsertSchema,
  mediaImageTypes,
  mediaImageTypesInsertSchema,
  medias,
  mediasInsertSchema,
  mediaViewImpressions,
  mediaViewImpressionsInsertSchema,
  videoContents,
  videoContentsInsertSchema,
  videoContentTypes,
  videoContentTypesInsertSchema,
} from "@media/db/schema/media";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createDeleteQuery } from "./commonRouter";

export const mediaRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.medias.findMany({ orderBy: desc(schema.medias.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.medias.findFirst({
        where: eq(schema.medias.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(mediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.medias).values(input);
    }),

  delete: createDeleteQuery<typeof medias>(medias),
});

export const videoContentRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.videoContents.findMany({
      orderBy: desc(schema.videoContents.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videoContents.findFirst({
        where: eq(schema.videoContents.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(videoContentsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.videoContents).values(input);
    }),

  delete: createDeleteQuery<typeof videoContents>(videoContents),
});

export const videoContentTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.videoContentTypes.findMany({
      orderBy: desc(schema.videoContentTypes.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videoContentTypes.findFirst({
        where: eq(schema.videoContentTypes.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(videoContentTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.videoContentTypes).values(input);
    }),

  delete: createDeleteQuery<typeof videoContentTypes>(videoContentTypes),
});

export const mediaCategoyRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaCategories.findMany({
      orderBy: desc(schema.mediaCategories.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaCategories.findFirst({
        where: eq(schema.mediaCategories.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(mediaCategoriesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaCategories).values(input);
    }),

  delete: createDeleteQuery<typeof mediaCategories>(mediaCategories),
});

export const mediaImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaImages.findMany({
      orderBy: desc(schema.mediaImages.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaImages.findFirst({
        where: eq(schema.mediaImages.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(mediaImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaImages).values(input);
    }),

  delete: createDeleteQuery<typeof mediaImages>(mediaImages),
});

export const mediaImageTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaImageTypes.findMany({
      orderBy: desc(schema.mediaImageTypes.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaImageTypes.findFirst({
        where: eq(schema.mediaImageTypes.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(mediaImageTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaImageTypes).values(input);
    }),

  delete: createDeleteQuery<typeof mediaImageTypes>(mediaImageTypes),
});

export const mediaViewImpressionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaViewImpressions.findMany({
      orderBy: desc(schema.mediaViewImpressions.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaViewImpressions.findFirst({
        where: eq(schema.mediaViewImpressions.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(mediaViewImpressionsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaViewImpressions).values(input);
    }),

  delete: createDeleteQuery<typeof mediaViewImpressions>(mediaViewImpressions),
});
