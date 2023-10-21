import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { baseColumns, dictionaryColumns } from "./commonColumns";

export const castMembers = mySqlTable(
  "castMembers",
  {
    firstName: varchar("firstName", { length: 255 }),
    middleName: varchar("middleName", { length: 255 }),
    lastName: varchar("lastName", { length: 255 }),
    birthDate: varchar("birthDate", { length: 255 }),
    sex: varchar("sex", { length: 255 }),

    countryId: varchar("countryId", { length: 255 }),
    castRoleId: varchar("castRoleId", { length: 255 }),

    ...baseColumns,
  },
  (castMember) => ({
    idIdx: index("id_idx").on(castMember.id),
  }),
);

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
