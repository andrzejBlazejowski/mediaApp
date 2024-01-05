import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  brandingColorsInsertSchema,
  brandingColorTypesInsertSchema,
  brandingImagesInsertSchema,
  brandingImageTypesInsertSchema,
  brandingsInsertSchema,
} from "@media/db/schema/branding";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const brandingRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.brandings.findMany({
      orderBy: desc(schema.brandings.id),
      with: {
        brandingColors: true,
        brandingImages: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.brandings.findFirst({
        where: eq(schema.brandings.id, input.id),
        with: {
          brandingColors: true,
          brandingImages: true,
        },
      });
    }),

  create: protectedProcedure
    .input(brandingsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.brandings).values(input);
    }),
  update: protectedProcedure
    .input(brandingsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.brandings)
        .set(input)
        .where(eq(schema.brandings.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.brandings)
      .where(eq(schema.brandings.id, input));
  }),
});

export const brandingColorRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.brandingColors.findMany({
      orderBy: desc(schema.brandingColors.id),
      with: {
        branding: true,
        brandingColorType: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.brandingColors.findFirst({
        where: eq(schema.brandingColors.id, input.id),
        with: {
          branding: true,
          brandingColorType: true,
        },
      });
    }),

  create: protectedProcedure
    .input(brandingColorsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.brandingColors).values(input);
    }),
  update: protectedProcedure
    .input(brandingColorsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.brandingColors)
        .set(input)
        .where(eq(schema.brandingColors.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.brandingColors)
      .where(eq(schema.brandingColors.id, input));
  }),
});

export const brandingColorTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.brandingColorTypes.findMany({
      orderBy: desc(schema.brandingColorTypes.id),
      with: {
        brandingColors: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.brandingColorTypes.findFirst({
        where: eq(schema.brandingColorTypes.id, input.id),
        with: {
          brandingColors: true,
        },
      });
    }),

  create: protectedProcedure
    .input(brandingColorTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.brandingColorTypes).values(input);
    }),
  update: protectedProcedure
    .input(brandingColorTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.brandingColorTypes)
        .set(input)
        .where(eq(schema.brandingColorTypes.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.brandingColorTypes)
      .where(eq(schema.brandingColorTypes.id, input));
  }),
});

export const brandingImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.brandingImages.findMany({
      orderBy: desc(schema.brandingImages.id),
      with: {
        brandingImageType: true,
        branding: true,
        image: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.brandingImages.findFirst({
        where: eq(schema.brandingImages.id, input.id),
        with: {
          brandingImageType: true,
          branding: true,
          image: true,
        },
      });
    }),

  create: protectedProcedure
    .input(brandingImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.brandingImages).values(input);
    }),
  update: protectedProcedure
    .input(brandingImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.brandingImages)
        .set(input)
        .where(eq(schema.brandingImages.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.brandingImages)
      .where(eq(schema.brandingImages.id, input));
  }),
});

export const brandingImageTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.brandingImageTypes.findMany({
      orderBy: desc(schema.brandingImageTypes.id),
      with: {
        brandingImages: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.brandingImageTypes.findFirst({
        where: eq(schema.brandingImageTypes.id, input.id),
        with: {
          brandingImages: true,
        },
      });
    }),

  create: protectedProcedure
    .input(brandingImageTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.brandingImageTypes).values(input);
    }),
  update: protectedProcedure
    .input(brandingImageTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.brandingImageTypes)
        .set(input)
        .where(eq(schema.brandingImageTypes.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.brandingImageTypes)
      .where(eq(schema.brandingImageTypes.id, input));
  }),
});
