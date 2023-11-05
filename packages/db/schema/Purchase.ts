import { relations } from "drizzle-orm";
import { index, int, mysqlTable } from "drizzle-orm/mysql-core";

import { users } from "./auth";
import { baseColumns, dictionaryColumns } from "./commonColumns";
import { medias } from "./media";

export const purchases = mysqlTable(
  "purchases",
  {
    purchaseTypeId: int("purchaseTypeId").notNull(),
    mediaId: int("mediaId").notNull(),
    userId: int("userId").notNull(),

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
    purchaseId: int("purchaseId").notNull(),
    mediaId: int("mediaId").notNull(),

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
