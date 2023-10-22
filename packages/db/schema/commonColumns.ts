import { sql } from "drizzle-orm";
import { boolean, timestamp, varchar } from "drizzle-orm/mysql-core";

export const baseColumns = {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    fsp: 3,
  })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),
  createdBy: varchar("createdBy", { length: 255 }),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  updatedBy: varchar("updatedBy", { length: 255 }),
  isDeleted: boolean("isDeleted").default(false).notNull(),
};

export const dictionaryColumns = {
  name: varchar("name", { length: 255 }),
  description: varchar("description", { length: 255 }),
};
