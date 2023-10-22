import { relations } from "drizzle-orm";
import { boolean, index, int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { mediaCastMembers } from "./cast";
import { baseColumns, dictionaryColumns } from "./commonColumns";
import { images } from "./image";
import { videos } from "./video";

export const medias = mySqlTable(
  "media",
  {
    name: varchar("name", { length: 255 }).notNull(),
    shortDescription: varchar("shortDescription", { length: 500 }).notNull(),
    longDescription: varchar("longDescription", { length: 2500 }),
    type: varchar("type", { length: 255 }).notNull(),
    isFree: boolean("isFree").default(false).default(true).notNull(),

    mediaCategoryId: varchar("mediaCategoryId", { length: 255 }).notNull(),

    ...baseColumns,
  },
  (media) => ({
    idIdx: index("id_idx").on(media.id),
  }),
);

export const mediasRelations = relations(medias, ({ many, one }) => ({
  mediaCastMembers: many(mediaCastMembers),
  mediaCategory: one(mediaCategories, {
    fields: [medias.mediaCategoryId],
    references: [mediaCategories.id],
  }),
  mediaImages: many(mediaImages),
  mediaViewImpressions: many(mediaViewImpressions),
  videoContents: many(videoContents),
}));

export const videoContents = mySqlTable(
  "videoContents",
  {
    videoId: varchar("videoId", { length: 255 }).notNull(),
    videoContentTypeId: varchar("videoContentTypeId", {
      length: 255,
    }).notNull(),
    mediaId: varchar("mediaId", { length: 255 }).notNull(),

    ...baseColumns,
  },
  (videoContent) => ({
    idIdx: index("id_idx").on(videoContent.id),
  }),
);

export const videoContentsRelations = relations(videoContents, ({ one }) => ({
  video: one(videos, {
    fields: [videoContents.videoId],
    references: [videos.id],
  }),
  videoContentType: one(videoContentTypes, {
    fields: [videoContents.videoContentTypeId],
    references: [videoContentTypes.id],
  }),
  media: one(medias, {
    fields: [videoContents.mediaId],
    references: [medias.id],
  }),
}));

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

export const videoContentTypesRelations = relations(
  videoContentTypes,
  ({ many }) => ({
    videoContents: many(videoContents),
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

export const mediaCategoriesRelations = relations(
  mediaCategories,
  ({ many }) => ({
    medias: many(medias),
  }),
);

export const mediaImages = mySqlTable(
  "mediaImages",
  {
    mediaId: varchar("mediaId", { length: 255 }).notNull(),
    mediaImageTypeId: varchar("mediaImageTypeId", { length: 255 }).notNull(),
    imageId: varchar("imageId", { length: 255 }).notNull(),

    ...baseColumns,
    ...dictionaryColumns,
  },
  (mediaImage) => ({
    idIdx: index("id_idx").on(mediaImage.id),
  }),
);

export const mediaImagesRelations = relations(mediaImages, ({ many, one }) => ({
  medias: many(medias),
  mediaImageType: one(mediaImageTypes, {
    fields: [mediaImages.mediaImageTypeId],
    references: [mediaImageTypes.id],
  }),
  image: one(images, {
    fields: [mediaImages.imageId],
    references: [images.id],
  }),
}));

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

export const mediaImageTypesRelations = relations(
  mediaImageTypes,
  ({ many }) => ({
    mediaImages: many(mediaImages),
  }),
);

export const mediaViewImpressions = mySqlTable(
  "mediaViewImpressions",
  {
    progress: int("progress").notNull(),

    mediaId: varchar("mediaId", { length: 255 }).notNull(),

    ...baseColumns,
  },
  (mediaViewImpression) => ({
    idIdx: index("id_idx").on(mediaViewImpression.id),
  }),
);

export const mediaViewImpressionsRelations = relations(
  mediaViewImpressions,
  ({ one }) => ({
    media: one(medias, {
      fields: [mediaViewImpressions.mediaId],
      references: [medias.id],
    }),
  }),
);
