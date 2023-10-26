import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { screens } from "./screen";

export const articleScreens = mysqlTable(
  "articleScreens",
  {
    title: varchar("title", { length: 255 }).notNull(),
    content: varchar("content", { length: 5000 }).notNull(),

    articleScreenImageId: varchar("articleScreenImageId", { length: 255 }),

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

export const articleScreenImages = mysqlTable(
  "articleScreenImages",
  {
    articleScreenId: varchar("articleScreenId", { length: 255 }).notNull(),
    imageId: varchar("imageId", { length: 255 }).notNull(),

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
  }),
);
