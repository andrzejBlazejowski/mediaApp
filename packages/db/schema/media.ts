import { sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { typicalColumns } from "./_typicalColumns";

export const medias = mySqlTable(
  "media",
  {
    name: varchar("name", { length: 255 }),
    shortDescription: varchar("shortDescription", { length: 500 }),
    longDescription: varchar("longDescription", { length: 2500 }),
    type: varchar("type", { length: 255 }),

    ...typicalColumns,
  },
  (media) => ({
    idIdx: index("id_idx").on(media.id),
  }),
);
