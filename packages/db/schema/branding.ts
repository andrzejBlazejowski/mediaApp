import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

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

export const brandingColors = mysqlTable(
  "brandingColors",
  {
    value: varchar("value", { length: 255 }),

    brandingId: varchar("brandingId", { length: 255 }),
    brandingColorTypeId: varchar("brandingColorTypeId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (brandingColor) => ({
    idIdx: index("id_idx").on(brandingColor.id),
  }),
);

export const brandingColorTypes = mysqlTable(
  "brandingColorTypes",
  {
    key: varchar("key", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (brandingColorType) => ({
    idIdx: index("id_idx").on(brandingColorType.id),
  }),
);

export const brandingImages = mysqlTable(
  "brandingImages",
  {
    brandingImageTypeId: varchar("brandingImageTypeId", { length: 255 }),
    brandingId: varchar("brandingId", { length: 255 }),
    imageId: varchar("imageId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (brandingImage) => ({
    idIdx: index("id_idx").on(brandingImage.id),
  }),
);

export const brandingImageTypes = mysqlTable(
  "brandingImageTypes",
  {
    key: varchar("key", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (brandingImageType) => ({
    idIdx: index("id_idx").on(brandingImageType.id),
  }),
);
