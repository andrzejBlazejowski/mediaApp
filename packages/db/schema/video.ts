import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";
import { videoContents } from "./media";

export const videos = mysqlTable(
  "videos",
  {
    url: varchar("url", { length: 255 }).notNull(),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (video) => ({
    idIdx: index("id_idx").on(video.id),
  }),
);

export const videosRelations = relations(videos, ({ many }) => ({
  videoContents: many(videoContents),
}));
