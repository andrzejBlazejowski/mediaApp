import { relations } from "drizzle-orm";
import { index, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { images } from "./image";
import { screens } from "./screen";

export const articleScreens = mysqlTable(
  "articleScreens",
  {
    title: varchar("title", { length: 255 }).notNull(),
    content: varchar("content", { length: 5000 }).notNull(),

    articleScreenImageId: int("articleScreenImageId"),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (articleScreen) => ({
    idIdx: index("id_idx").on(articleScreen.id),
  }),
);

export const articleScreensRelations = relations(
  articleScreens,
  ({ many }) => ({
    articleScreenImages: many(articleScreenImages),
    screens: many(screens),
  }),
);

export const articleScreensInsertSchema = createInsertSchema(articleScreens);

export const articleScreenImages = mysqlTable(
  "articleScreenImages",
  {
    articleScreenId: int("articleScreenId"),
    imageId: int("imageId"),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (articleScreenImage) => ({
    idIdx: index("id_idx").on(articleScreenImage.id),
  }),
);

export const articleScreenImagesRelations = relations(
  articleScreenImages,
  ({ one }) => ({
    articleScreen: one(articleScreens, {
      fields: [articleScreenImages.articleScreenId],
      references: [articleScreens.id],
    }),
    image: one(images, {
      fields: [articleScreenImages.imageId],
      references: [images.id],
    }),
  }),
);

export const articleScreenImagesInsertSchema =
  createInsertSchema(articleScreenImages);
