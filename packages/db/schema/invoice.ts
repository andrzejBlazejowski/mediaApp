import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const invoices = mysqlTable(
  "invoices",
  {
    invoiceTypeId: varchar("invoiceTypeId", { length: 255 }),
    mediaId: varchar("mediaId", { length: 255 }),
    userId: varchar("userId", { length: 255 }),

    ...baseColumns,
  },
  (invoice) => ({
    idIdx: index("id_idx").on(invoice.id),
  }),
);

export const invoiceTypes = mysqlTable(
  "invoiceTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (invoiceType) => ({
    idIdx: index("id_idx").on(invoiceType.id),
  }),
);

export const invoiceTemplates = mysqlTable(
  "invoiceTemplates",
  {
    content: varchar("content", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (invoiceTemplate) => ({
    idIdx: index("id_idx").on(invoiceTemplate.id),
  }),
);
