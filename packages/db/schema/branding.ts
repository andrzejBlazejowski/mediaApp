import { relations } from "drizzle-orm";
import { index, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { images } from "./image";

export const brandings = mysqlTable(
  "brandings",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (branding) => ({
    idIdx: index("id_idx").on(branding.id),
  }),
);

export const brandingsRelations = relations(brandings, ({ many }) => ({
  brandingColors: many(brandingColors),
  brandingImages: many(brandingImages),
}));

export const brandingsInsertSchema = createInsertSchema(brandings);

export const brandingColors = mysqlTable(
  "brandingColors",
  {
    value: varchar("value", { length: 255 }),

    brandingId: int("brandingId"),
    brandingColorTypeId: int("brandingColorTypeId"),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (brandingColor) => ({
    idIdx: index("id_idx").on(brandingColor.id),
  }),
);

export const brandingColorsRelations = relations(brandingColors, ({ one }) => ({
  branding: one(brandings, {
    fields: [brandingColors.brandingId],
    references: [brandings.id],
  }),
  brandingColorType: one(brandingColorTypes, {
    fields: [brandingColors.brandingColorTypeId],
    references: [brandingColorTypes.id],
  }),
}));

export const brandingColorsInsertSchema = createInsertSchema(brandingColors);

export const brandingColorTypes = mysqlTable(
  "brandingColorTypes",
  {
    key: varchar("key", { length: 255 }).notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (brandingColorType) => ({
    idIdx: index("id_idx").on(brandingColorType.id),
  }),
);

export const brandingColorTypesRelations = relations(
  brandingColorTypes,
  ({ many }) => ({
    brandingColors: many(brandingColors),
  }),
);

export const brandingColorTypesInsertSchema =
  createInsertSchema(brandingColorTypes);

export const brandingImages = mysqlTable(
  "brandingImages",
  {
    brandingImageTypeId: int("brandingImageTypeId"),
    brandingId: int("brandingId"),
    imageId: int("imageId"),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (brandingImage) => ({
    idIdx: index("id_idx").on(brandingImage.id),
  }),
);

export const brandingImagesRelations = relations(brandingImages, ({ one }) => ({
  branding: one(brandings, {
    fields: [brandingImages.brandingId],
    references: [brandings.id],
  }),
  image: one(images, {
    fields: [brandingImages.imageId],
    references: [images.id],
  }),
  brandingImageType: one(brandingImageTypes, {
    fields: [brandingImages.brandingImageTypeId],
    references: [brandingImageTypes.id],
  }),
}));

export const brandingImagesInsertSchema = createInsertSchema(brandingImages);

export const brandingImageTypes = mysqlTable(
  "brandingImageTypes",
  {
    key: varchar("key", { length: 255 }).notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (brandingImageType) => ({
    idIdx: index("id_idx").on(brandingImageType.id),
  }),
);

export const brandingImageTypesRelations = relations(
  brandingImageTypes,
  ({ many }) => ({
    brandingImages: many(brandingImages),
  }),
);

export const brandingImageTypesInsertSchema =
  createInsertSchema(brandingImageTypes);
