import { sql } from "drizzle-orm";
import { boolean, timestamp, varchar } from "drizzle-orm/mysql-core";

export const typicalColumns = {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  createdBy: varchar("createdBy", { length: 255 }),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedBy: varchar("updatedBy", { length: 255 }),
  isDeleted: boolean("isDeleted").default(false),
};
