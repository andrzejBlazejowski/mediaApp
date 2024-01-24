import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  brandingColorsInsertSchema,
  brandingColorTypesInsertSchema,
  brandingImagesInsertSchema,
  brandingImageTypesInsertSchema,
  brandingsInsertSchema,
} from "@media/db/schema/branding";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const brandingRouter = createTRPCRouter({
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.brandings;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.brandings.findMany({
      with: {
        brandingColors: true,
        brandingImages: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.brandingColors;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.brandingColors.findMany({
      with: {
        branding: true,
        brandingColorType: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.brandingColorTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.brandingColorTypes.findMany({
      with: {
        brandingColors: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.brandingImages;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.brandingImages.findMany({
      with: {
        brandingImageType: true,
        branding: true,
        image: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.brandingImageTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.brandingImageTypes.findMany({
      with: {
        brandingImages: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
