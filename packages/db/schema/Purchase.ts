import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

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
