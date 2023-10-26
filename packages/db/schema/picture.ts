import { relations } from "drizzle-orm";
import { index, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { brandingImages } from "./branding";
import { castMemberImages } from "./cast";
import { baseColumns, dictionaryColumns } from "./commonColumns";
import { mediaImages } from "./media";
import { menuLinkImages } from "./menu";

export const images = mySqlTable(
  "images",
  {
    url: varchar("url", { length: 255 }).notNull(),
    alt: varchar("alt", { length: 255 }),

    ...baseColumns,
    ...dictionaryColumns,
  },
  (image) => ({
    idIdx: index("id_idx").on(image.id),
  }),
);

export const imagesRelations = relations(images, ({ many }) => ({
  brandingImages: many(brandingImages),
  castMemberImages: many(castMemberImages),
  mediaImages: many(mediaImages),
  menuLinkImages: many(menuLinkImages),
}));
