import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { mediaLists } from "./mediaList";
import { screens } from "./screen";

export const vodScreens = mysqlTable(
  "vodScreens",
  {
    vodScreenTypeId: varchar("vodScreenTypeId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (vodScreen) => ({
    idIdx: index("id_idx").on(vodScreen.id),
  }),
);

export const vodScreensRelations = relations(vodScreens, ({ many, one }) => ({
  screens: many(screens),
  vodScreenType: one(vodScreenTypes, {
    fields: [vodScreens.vodScreenTypeId],
    references: [vodScreenTypes.id],
  }),
}));

export const vodScreenTypes = mysqlTable(
  "vodScreenTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (vodScreenType) => ({
    idIdx: index("id_idx").on(vodScreenType.id),
  }),
);

export const vodScreenTypesRelations = relations(
  vodScreenTypes,
  ({ many }) => ({
    vodScreens: many(vodScreens),
  }),
);

export const vodScreenMediaLists = mysqlTable(
  "vodScreenMediaLists",
  {
    vodScreenId: varchar("vodScreenId", { length: 255 }).notNull(),
    mediaListId: varchar("mediaListId", { length: 255 }).notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (vodScreenMediaList) => ({
    idIdx: index("id_idx").on(vodScreenMediaList.id),
  }),
);

export const vodScreenMediaListsRelations = relations(
  vodScreenMediaLists,
  ({ one }) => ({
    vodScreen: one(vodScreens, {
      fields: [vodScreenMediaLists.vodScreenId],
      references: [vodScreens.id],
    }),
    mediaList: one(mediaLists, {
      fields: [vodScreenMediaLists.mediaListId],
      references: [mediaLists.id],
    }),
  }),
);
