import { relations } from "drizzle-orm";
import { index, int, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { mediaLists } from "./mediaList";
import { screens } from "./screen";

export const vodScreens = mysqlTable(
  "vodScreens",
  {
    vodScreenTypeId: int("vodScreenTypeId"),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (vodScreen) => ({
    idIdx: index("id_idx").on(vodScreen.id),
  }),
);

export const vodScreensRelations = relations(vodScreens, ({ many, one }) => ({
  screens: many(screens),
  vodScreenMediaLists: many(vodScreenMediaLists),
  vodScreenType: one(vodScreenTypes, {
    fields: [vodScreens.vodScreenTypeId],
    references: [vodScreenTypes.id],
  }),
}));

export const vodScreensInsertSchema = createInsertSchema(vodScreens);

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

export const vodScreenTypesInsertSchema = createInsertSchema(vodScreenTypes);

export const vodScreenMediaLists = mysqlTable(
  "vodScreenMediaLists",
  {
    vodScreenId: int("vodScreenId").notNull(),
    mediaListId: int("mediaListId").notNull(),

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

export const vodScreenMediaListsInsertSchema =
  createInsertSchema(vodScreenMediaLists);
