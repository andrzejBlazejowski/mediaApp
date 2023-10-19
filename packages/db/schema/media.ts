import { boolean, index, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { baseColumns, dictionaryColumns } from "./commonColumns";

export const medias = mySqlTable(
  "media",
  {
    name: varchar("name", { length: 255 }),
    shortDescription: varchar("shortDescription", { length: 500 }),
    longDescription: varchar("longDescription", { length: 2500 }),
    type: varchar("type", { length: 255 }),
    isFree: boolean("isFree").default(false),

    ...baseColumns,
  },
  (media) => ({
    idIdx: index("id_idx").on(media.id),
  }),
);

export const videoContents = mySqlTable("videoContents", {
  ...baseColumns,
  url: varchar("url", { length: 1000 }),

  typeId: varchar("type", { length: 255 }),
  mediaId: varchar("mediaId", { length: 255 }),
});

export const videoContentTypes = mySqlTable("videoContentTypes", {
  ...baseColumns,
  ...dictionaryColumns,
});
