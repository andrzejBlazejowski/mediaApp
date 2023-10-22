import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { users } from "./auth";
import { baseColumns, dictionaryColumns } from "./commonColumns";
import { medias } from "./media";

export const purchases = mysqlTable(
  "purchases",
  {
    purchaseTypeId: varchar("purchaseTypeId", { length: 255 }),
    mediaId: varchar("mediaId", { length: 255 }),
    userId: varchar("userId", { length: 255 }),

    ...baseColumns,
  },
  (purchase) => ({
    idIdx: index("id_idx").on(purchase.id),
  }),
);

export const purchasesRelations = relations(purchases, ({ many, one }) => ({
  purchaseType: one(purchaseTypes, {
    fields: [purchases.purchaseTypeId],
    references: [purchaseTypes.id],
  }),
  user: one(users, { fields: [purchases.userId], references: [users.id] }),
  purchaseItems: many(purchaseItems),
}));

export const purchaseItems = mysqlTable(
  "purchaseItems",
  {
    purchaseId: varchar("purchaseId", { length: 255 }),
    mediaId: varchar("mediaId", { length: 255 }),

    ...baseColumns,
  },
  (purchaseItem) => ({
    idIdx: index("id_idx").on(purchaseItem.id),
  }),
);

export const purchaseItemsRelations = relations(purchaseItems, ({ one }) => ({
  purchase: one(purchases, {
    fields: [purchaseItems.purchaseId],
    references: [purchases.id],
  }),
  media: one(medias, {
    fields: [purchaseItems.mediaId],
    references: [medias.id],
  }),
}));

export const purchaseTypes = mysqlTable(
  "purchaseTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (purchaseType) => ({
    idIdx: index("id_idx").on(purchaseType.id),
  }),
);

export const purchaseTypesRelations = relations(purchaseTypes, ({ many }) => ({
  purchases: many(purchases),
}));
