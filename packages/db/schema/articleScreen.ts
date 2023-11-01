import { relations } from "drizzle-orm";
import { index, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { screens } from "./screen";

export const articleScreens = mysqlTable(
  "articleScreens",
  {
    title: varchar("title", { length: 255 }).notNull(),
    content: varchar("content", { length: 5000 }).notNull(),

    articleScreenImageId: serial("articleScreenImageId"),

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
    articleScreenId: serial("articleScreenId").notNull(),
    imageId: serial("imageId").notNull(),

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
