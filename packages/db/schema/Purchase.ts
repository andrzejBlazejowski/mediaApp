import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns } from "./commonColumns";

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
