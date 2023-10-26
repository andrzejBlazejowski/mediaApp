import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { medias } from "./media";

export const mediaLists = mysqlTable(
  "mediaLists",
  {
    mediaListTypeId: varchar("mediaListTypeId", { length: 255 }).notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (mediaList) => ({
    idIdx: index("id_idx").on(mediaList.id),
  }),
);

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
    mediaId: varchar("mediaId", { length: 255 }).notNull(),
    mediaListId: varchar("mediaListId", { length: 255 }).notNull(),

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
