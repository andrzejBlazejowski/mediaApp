import { asc, desc, eq } from "drizzle-orm";
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

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const mediaRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.medias;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];

    return ctx.db.query.medias.findMany({
      with: {
        mediaCategory: true,
        mediaImages: true,
        mediaCastMembers: true,
        mediaViewImpressions: true,
        videoContents: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
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

  create: permitedProcedure
    .input(mediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.medias).values(input);
    }),
  update: permitedProcedure
    .input(mediasInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.medias)
        .set(input)
        .where(eq(schema.medias.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.medias).where(eq(schema.medias.id, input));
  }),
});

export const videoContentRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.videoContents;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];

    return ctx.db.query.videoContents.findMany({
      with: {
        videoContentType: true,
        media: true,
        video: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videoContents.findFirst({
        where: eq(schema.videoContents.id, input.id),
        with: {
          videoContentType: true,
        },
      });
    }),

  create: permitedProcedure
    .input(videoContentsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.videoContents).values(input);
    }),
  update: permitedProcedure
    .input(videoContentsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.videoContents)
        .set(input)
        .where(eq(schema.videoContents.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.videoContents)
      .where(eq(schema.videoContents.id, input));
  }),
});

export const videoContentTypeRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.videoContentTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];

    return ctx.db.query.videoContentTypes.findMany({
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videoContentTypes.findFirst({
        where: eq(schema.videoContentTypes.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(videoContentTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.videoContentTypes).values(input);
    }),
  update: permitedProcedure
    .input(videoContentTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.videoContentTypes)
        .set(input)
        .where(eq(schema.videoContentTypes.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.videoContentTypes)
      .where(eq(schema.videoContentTypes.id, input));
  }),
});

export const mediaCategoyRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.mediaCategories;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.mediaCategories.findMany({
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaCategories.findFirst({
        where: eq(schema.mediaCategories.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(mediaCategoriesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaCategories).values(input);
    }),
  update: permitedProcedure
    .input(mediaCategoriesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.mediaCategories)
        .set(input)
        .where(eq(schema.mediaCategories.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaCategories)
      .where(eq(schema.mediaCategories.id, input));
  }),
});

export const mediaImageRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.medias;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.mediaImages.findMany({
      orderBy: desc(schema.mediaImages.id),
      with: {
        mediaImageType: true,
        media: true,
        image: true,
      },
    });
  }),

  byId: permitedProcedure
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

  create: permitedProcedure
    .input(mediaImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaImages).values(input);
    }),

  update: permitedProcedure
    .input(mediaImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.mediaImages)
        .set(input)
        .where(eq(schema.mediaImages.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaImages)
      .where(eq(schema.mediaImages.id, input));
  }),
});

export const mediaImageTypeRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.mediaImageTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.mediaImageTypes.findMany({
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaImageTypes.findFirst({
        where: eq(schema.mediaImageTypes.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(mediaImageTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaImageTypes).values(input);
    }),

  update: permitedProcedure
    .input(mediaImageTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.mediaImageTypes)
        .set(input)
        .where(eq(schema.mediaImageTypes.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaImageTypes)
      .where(eq(schema.mediaImageTypes.id, input));
  }),
});

export const mediaViewImpressionRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.mediaViewImpressions;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.mediaViewImpressions.findMany({
      with: {
        media: true,
      },

      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaViewImpressions.findFirst({
        where: eq(schema.mediaViewImpressions.id, input.id),
        with: {
          media: true,
        },
      });
    }),

  create: permitedProcedure
    .input(mediaViewImpressionsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaViewImpressions).values(input);
    }),
  update: permitedProcedure
    .input(mediaViewImpressionsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.mediaViewImpressions)
        .set(input)
        .where(eq(schema.mediaViewImpressions.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaViewImpressions)
      .where(eq(schema.mediaViewImpressions.id, input));
  }),
});
