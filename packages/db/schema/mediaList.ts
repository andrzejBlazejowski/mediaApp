import { relations } from "drizzle-orm";
import { index, int, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { medias } from "./media";

export const mediaLists = mysqlTable(
  "mediaLists",
  {
    mediaListTypeId: int("mediaListTypeId").notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (mediaList) => ({
    idIdx: index("id_idx").on(mediaList.id),
  }),
);

export const mediaListsInsertSchema = createInsertSchema(mediaLists);

export const mediaListsRelations = relations(mediaLists, ({ many, one }) => ({
  mediaListMedias: many(mediaListMedias),
  mediaListType: one(mediaListTypes, {
    fields: [mediaLists.mediaListTypeId],
    references: [mediaListTypes.id],
  }),
}));

export const mediaListMedias = mysqlTable(
  "mediaListMedias",
  {
    mediaId: int("mediaId").notNull(),
    mediaListId: int("mediaListId").notNull(),

    ...baseColumns,
  },
  (mediaListMedia) => ({
    idIdx: index("id_idx").on(mediaListMedia.id),
  }),
);

export const mediaListMediasRelations = relations(
  mediaListMedias,
  ({ one }) => ({
    media: one(medias, {
      fields: [mediaListMedias.mediaId],
      references: [medias.id],
    }),
    mediaList: one(mediaLists, {
      fields: [mediaListMedias.mediaListId],
      references: [mediaLists.id],
    }),
  }),
);

export const mediaListMediasInsertSchema = createInsertSchema(mediaListMedias);

export const mediaListTypes = mysqlTable(
  "mediaListTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (mediaListType) => ({
    idIdx: index("id_idx").on(mediaListType.id),
  }),
);

export const mediaListTypesRelations = relations(
  mediaListTypes,
  ({ many }) => ({
    mediaLists: many(mediaLists),
  }),
);

export const mediaListTypesInsertSchema = createInsertSchema(mediaListTypes);
