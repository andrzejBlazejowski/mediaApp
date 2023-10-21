import { relations } from "drizzle-orm";
import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { baseColumns, dictionaryColumns } from "./commonColumns";
import { countries } from "./dictionary";
import { images } from "./image";
import { medias } from "./media";

export const castMembers = mySqlTable(
  "castMembers",
  {
    peopleId: varchar("peopleId", { length: 255 }),
    countryId: varchar("countryId", { length: 255 }),
    castRoleId: varchar("castRoleId", { length: 255 }),

    ...baseColumns,
  },
  (castMember) => ({
    idIdx: index("id_idx").on(castMember.id),
  }),
);

export const castMembersRelations = relations(castMembers, ({ one, many }) => ({
  country: one(countries, {
    fields: [castMembers.countryId],
    references: [countries.id],
  }),
  castRole: one(castRoles, {
    fields: [castMembers.castRoleId],
    references: [castRoles.id],
  }),
  castMemberImage: one(castMemberImages, {
    fields: [castMembers.id],
    references: [castMemberImages.id],
  }),
  person: one(people, {
    fields: [castMembers.peopleId],
    references: [people.id],
  }),
  mediaCastMembers: many(mediaCastMembers),
}));

export const castMemberImages = mysqlTable(
  "castMemberImages",
  {
    castMemberId: varchar("castMemberId", { length: 255 }),
    imageId: varchar("imageId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (castMemberImage) => ({
    idIdx: index("id_idx").on(castMemberImage.id),
  }),
);

export const castMemberImagesRelations = relations(
  castMemberImages,
  ({ one }) => ({
    castMember: one(castMembers, {
      fields: [castMemberImages.castMemberId],
      references: [castMembers.id],
    }),
    image: one(images, {
      fields: [castMemberImages.imageId],
      references: [images.id],
    }),
  }),
);

export const castRoles = mysqlTable(
  "castRoles",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (castRole) => ({
    idIdx: index("id_idx").on(castRole.id),
  }),
);

export const castRolesRelations = relations(castRoles, ({ many }) => ({
  castMembers: many(castMembers),
}));

export const mediaCastMembers = mysqlTable(
  "mediaCastMembers",
  {
    mediaId: varchar("mediaId", { length: 255 }),
    castMemberId: varchar("castMemberId", { length: 255 }),

    ...baseColumns,
  },
  (mediaCastMember) => ({
    idIdx: index("id_idx").on(mediaCastMember.id),
  }),
);

export const mediaCastMembersRelations = relations(
  mediaCastMembers,
  ({ one }) => ({
    media: one(medias, {
      fields: [mediaCastMembers.mediaId],
      references: [medias.id],
    }),
    castMember: one(castMembers, {
      fields: [mediaCastMembers.castMemberId],
      references: [castMembers.id],
    }),
  }),
);

export const people = mySqlTable(
  "people",
  {
    firstName: varchar("firstName", { length: 255 }),
    middleName: varchar("middleName", { length: 255 }),
    lastName: varchar("lastName", { length: 255 }),
    birthDate: varchar("birthDate", { length: 255 }),
    deathDate: varchar("deathDate", { length: 255 }),
    sex: varchar("sex", { length: 255 }),

    ...baseColumns,
  },
  (person) => ({
    idIdx: index("id_idx").on(person.id),
  }),
);

export const peopleRelations = relations(people, ({ one }) => ({
  castMember: one(castMembers, {
    fields: [people.id],
    references: [castMembers.peopleId],
  }),
}));
