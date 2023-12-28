import { relations } from "drizzle-orm";
import { index, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

import { users } from "./auth";
import { baseColumns, dictionaryColumns } from "./commonColumns";
import { medias } from "./media";

export const invoices = mysqlTable(
  "invoices",
  {
    invoiceTypeId: int("invoiceTypeId").notNull(),
    mediaId: int("mediaId").notNull(),
    userId: int("userId").notNull(),

    ...baseColumns,
  },
  (invoice) => ({
    idIdx: index("id_idx").on(invoice.id),
  }),
);

export const invoicesRelations = relations(invoices, ({ one }) => ({
  invoiceType: one(invoiceTypes, {
    fields: [invoices.invoiceTypeId],
    references: [invoiceTypes.id],
  }),
  media: one(medias, { fields: [invoices.mediaId], references: [medias.id] }),
  user: one(users, { fields: [invoices.userId], references: [users.id] }),
}));

export const invoicesInsertSchema = createInsertSchema(invoices);

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

export const invoiceTypesRelations = relations(invoiceTypes, ({ many }) => ({
  invoices: many(invoices),
}));

export const invoiceTypesInsertSchema = createInsertSchema(invoiceTypes);

export const invoiceTemplates = mysqlTable(
  "invoiceTemplates",
  {
    content: varchar("content", { length: 255 }).notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (invoiceTemplate) => ({
    idIdx: index("id_idx").on(invoiceTemplate.id),
  }),
);

export const invoiceTemplatesInsertSchema =
  createInsertSchema(invoiceTemplates);
