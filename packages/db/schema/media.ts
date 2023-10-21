import { relations } from "drizzle-orm";
import { boolean, index, int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { mediaCastMembers } from "./cast";
import { baseColumns, dictionaryColumns } from "./commonColumns";

export const medias = mySqlTable(
  "media",
  {
    name: varchar("name", { length: 255 }),
    shortDescription: varchar("shortDescription", { length: 500 }),
    longDescription: varchar("longDescription", { length: 2500 }),
    type: varchar("type", { length: 255 }),
    isFree: boolean("isFree").default(false),

    mediaCategoryId: varchar("mediaCategoryId", { length: 255 }),

    ...baseColumns,
  },
  (media) => ({
    idIdx: index("id_idx").on(media.id),
  }),
);

export const mediasRelations = relations(medias, ({ many }) => ({
  mediaCastMembers: many(mediaCastMembers),
}));

export const videoContents = mySqlTable(
  "videoContents",
  {
    videoId: varchar("videoId", { length: 255 }),
    videoContentTypeId: varchar("videoContentTypeId", { length: 255 }),
    mediaId: varchar("mediaId", { length: 255 }),

    ...baseColumns,
  },
  (videoContent) => ({
    idIdx: index("id_idx").on(videoContent.id),
  }),
);

export const videoContentTypes = mySqlTable(
  "videoContentTypes",
  {
    ...baseColumns,
    ...dictionaryColumns,
  },
  (videoContentType) => ({
    idIdx: index("id_idx").on(videoContentType.id),
  }),
);

export const mediaCategories = mySqlTable(
  "mediaCategories",
  {
    ...baseColumns,
    ...dictionaryColumns,
  },
  (mediaCategory) => ({
    idIdx: index("id_idx").on(mediaCategory.id),
  }),
);

export const mediaImages = mySqlTable(
  "mediaImages",
  {
    mediaId: varchar("mediaId", { length: 255 }),
    mediaImageTypeId: varchar("mediaImageTypeId", { length: 255 }),
    imageId: varchar("imageId", { length: 255 }),

    ...baseColumns,
    ...dictionaryColumns,
  },
  (mediaImage) => ({
    idIdx: index("id_idx").on(mediaImage.id),
  }),
);

export const mediaImageTypes = mySqlTable(
  "mediaImageTypes",
  {
    ...baseColumns,
    ...dictionaryColumns,
  },
  (mediaImageType) => ({
    idIdx: index("id_idx").on(mediaImageType.id),
  }),
);

export const mediaViewImpressions = mySqlTable(
  "mediaViewImpressions",
  {
    progress: int("progress"),

    mediaId: varchar("mediaId", { length: 255 }),

    ...baseColumns,
  },
  (mediaViewImpression) => ({
    idIdx: index("id_idx").on(mediaViewImpression.id),
  }),
);
