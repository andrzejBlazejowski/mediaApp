import { relations } from "drizzle-orm";
import { boolean, index, int, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

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

    mediaCategoryId: int("mediaCategoryId").notNull(),

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

export const mediasInsertSchema = createInsertSchema(medias);

export const videoContents = mySqlTable(
  "videoContents",
  {
    videoId: int("videoId").notNull(),
    videoContentTypeId: int("videoContentTypeId").notNull(),
    mediaId: int("mediaId").notNull(),

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

export const videoContentsInsertSchema = createInsertSchema(videoContents);

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

export const videoContentTypesInsertSchema =
  createInsertSchema(videoContentTypes);

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

export const mediaCategoriesInsertSchema = createInsertSchema(mediaCategories);

export const mediaImages = mySqlTable(
  "mediaImages",
  {
    mediaId: int("mediaId").notNull(),
    mediaImageTypeId: int("mediaImageTypeId").notNull(),
    imageId: int("imageId").notNull(),

    ...baseColumns,
    ...dictionaryColumns,
  },
  (mediaImage) => ({
    idIdx: index("id_idx").on(mediaImage.id),
  }),
);

export const mediaImagesRelations = relations(mediaImages, ({ many, one }) => ({
  media: one(medias, {
    fields: [mediaImages.mediaId],
    references: [medias.id],
  }),
  mediaImageType: one(mediaImageTypes, {
    fields: [mediaImages.mediaImageTypeId],
    references: [mediaImageTypes.id],
  }),
  image: one(images, {
    fields: [mediaImages.imageId],
    references: [images.id],
  }),
}));

export const mediaImagesInsertSchema = createInsertSchema(mediaImages);

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

export const mediaImageTypesInsertSchema = createInsertSchema(mediaImageTypes);

export const mediaViewImpressions = mySqlTable(
  "mediaViewImpressions",
  {
    progress: int("progress").notNull(),

    mediaId: int("mediaId").notNull(),

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

export const mediaViewImpressionsInsertSchema =
  createInsertSchema(mediaViewImpressions);
