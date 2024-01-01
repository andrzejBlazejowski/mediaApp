import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  mediaCategoriesInsertSchema,
  mediaImagesInsertSchema,
  mediaImageTypesInsertSchema,
  mediasInsertSchema,
  mediaViewImpressionsInsertSchema,
  videoContentsInsertSchema,
  videoContentTypesInsertSchema,
} from "@media/db/schema/media";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const mediaRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.medias.findMany({
      orderBy: desc(schema.medias.id),
      with: {
        mediaCategory: true,
        mediaImages: true,
        mediaCastMembers: true,
        mediaViewImpressions: true,
        videoContents: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.medias.findFirst({
        where: eq(schema.medias.id, input.id),
        with: {
          mediaCategory: true,
          mediaImages: true,
          mediaCastMembers: true,
          mediaViewImpressions: true,
          videoContents: true,
        },
      });
    }),

  create: protectedProcedure
    .input(mediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.medias).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.medias).where(eq(schema.medias.id, input));
  }),
});

export const videoContentRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.videoContents.findMany({
      orderBy: desc(schema.videoContents.id),
      with: {
        videoContentType: true,
        media: true,
        video: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videoContents.findFirst({
        where: eq(schema.videoContents.id, input.id),
        with: {
          videoContentType: true,
        },
      });
    }),

  create: protectedProcedure
    .input(videoContentsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.videoContents).values(input);
    }),
  update: protectedProcedure
    .input(videoContentsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.videoContents)
        .set(input)
        .where(eq(schema.videoContents.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.videoContents)
      .where(eq(schema.videoContents.id, input));
  }),
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

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.videoContentTypes)
      .where(eq(schema.videoContentTypes.id, input));
  }),
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

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaCategories)
      .where(eq(schema.mediaCategories.id, input));
  }),
});

export const mediaImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaImages.findMany({
      orderBy: desc(schema.mediaImages.id),
      with: {
        mediaImageType: true,
        media: true,
        image: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaImages.findFirst({
        where: eq(schema.mediaImages.id, input.id),
        with: {
          mediaImageType: true,
          media: true,
          image: true,
        },
      });
    }),

  create: protectedProcedure
    .input(mediaImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaImages).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaImages)
      .where(eq(schema.mediaImages.id, input));
  }),
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

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaImageTypes)
      .where(eq(schema.mediaImageTypes.id, input));
  }),
});

export const mediaViewImpressionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaViewImpressions.findMany({
      orderBy: desc(schema.mediaViewImpressions.id),
      with: {
        media: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaViewImpressions.findFirst({
        where: eq(schema.mediaViewImpressions.id, input.id),
        with: {
          media: true,
        },
      });
    }),

  create: protectedProcedure
    .input(mediaViewImpressionsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaViewImpressions).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaViewImpressions)
      .where(eq(schema.mediaViewImpressions.id, input));
  }),
});
