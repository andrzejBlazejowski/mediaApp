import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { images } from "./picture";

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

export const brandingColors = mysqlTable(
  "brandingColors",
  {
    value: varchar("value", { length: 255 }),

    brandingId: varchar("brandingId", { length: 255 }).notNull(),
    brandingColorTypeId: varchar("brandingColorTypeId", {
      length: 255,
    }).notNull(),

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

export const brandingImages = mysqlTable(
  "brandingImages",
  {
    brandingImageTypeId: varchar("brandingImageTypeId", {
      length: 255,
    }).notNull(),
    brandingId: varchar("brandingId", { length: 255 }).notNull(),
    imageId: varchar("imageId", { length: 255 }).notNull(),

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
