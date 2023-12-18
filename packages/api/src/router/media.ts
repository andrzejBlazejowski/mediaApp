import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  mediaCategories,
  mediaImages,
  mediaImageTypes,
  medias,
  mediaViewImpressions,
  videoContents,
  videoContentTypes,
} from "@media/db/schema/media";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCreateQuery, createDeleteQuery } from "./commonRouter";

export const mediaRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.medias.findMany({ orderBy: desc(schema.medias.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.medias.findFirst({
        where: eq(schema.medias.id, input.id),
      });
    }),
  create: createCreateQuery<typeof medias>(
    medias,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof medias>(medias),
});

export const videoContentRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.videoContents.findMany({
      orderBy: desc(schema.videoContents.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.videoContents.findFirst({
        where: eq(schema.videoContents.id, input.id),
      });
    }),
  create: createCreateQuery<typeof videoContents>(
    videoContents,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof videoContents>(videoContents),
});

export const videoContentTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.videoContentTypes.findMany({
      orderBy: desc(schema.videoContentTypes.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.videoContentTypes.findFirst({
        where: eq(schema.videoContentTypes.id, input.id),
      });
    }),
  create: createCreateQuery<typeof videoContentTypes>(
    videoContentTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof videoContentTypes>(videoContentTypes),
});

export const mediaCategoyRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.mediaCategories.findMany({
      orderBy: desc(schema.mediaCategories.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.mediaCategories.findFirst({
        where: eq(schema.mediaCategories.id, input.id),
      });
    }),
  create: createCreateQuery<typeof mediaCategories>(
    mediaCategories,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaCategories>(mediaCategories),
});

export const mediaImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.mediaImages.findMany({
      orderBy: desc(schema.mediaImages.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.mediaImages.findFirst({
        where: eq(schema.mediaImages.id, input.id),
      });
    }),
  create: createCreateQuery<typeof mediaImages>(
    mediaImages,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaImages>(mediaImages),
});

export const mediaImageTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.mediaImageTypes.findMany({
      orderBy: desc(schema.mediaImageTypes.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.mediaImageTypes.findFirst({
        where: eq(schema.mediaImageTypes.id, input.id),
      });
    }),
  create: createCreateQuery<typeof mediaImageTypes>(
    mediaImageTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaImageTypes>(mediaImageTypes),
});

export const mediaViewImpressionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.mediaViewImpressions.findMany({
      orderBy: desc(schema.mediaViewImpressions.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      return ctx.db.query.mediaViewImpressions.findFirst({
        where: eq(schema.mediaViewImpressions.id, input.id),
      });
    }),
  create: createCreateQuery<typeof mediaViewImpressions>(
    mediaViewImpressions,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaViewImpressions>(mediaViewImpressions),
});
