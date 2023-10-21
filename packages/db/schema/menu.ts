import { index, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { baseColumns, dictionaryColumns } from "./commonColumns";

export const menus = mysqlTable(
  "menus",
  {
    platformId: varchar("platformId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (menu) => ({
    idIdx: index("id_idx").on(menu.id),
  }),
);

export const menuLinks = mysqlTable(
  "menuLinks",
  {
    menuImageId: varchar("menuImageId", { length: 255 }),
    destinationScreenId: varchar("destinationScreenId", { length: 255 }),
    menuId: varchar("menuId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (menuLink) => ({
    idIdx: index("id_idx").on(menuLink.id),
  }),
);

export const menuTypes = mysqlTable(
  "menuTypes",
  {
    ...dictionaryColumns,
    ...baseColumns,
  },
  (menuType) => ({
    idIdx: index("id_idx").on(menuType.id),
  }),
);

export const menuLinkImages = mysqlTable(
  "menuLinkImages",
  {
    menuLinkId: varchar("menuLinkId", { length: 255 }),
    imageId: varchar("imageId", { length: 255 }),

    ...dictionaryColumns,
    ...baseColumns,
  },
  (menuLinkImage) => ({
    idIdx: index("id_idx").on(menuLinkImage.id),
  }),
);
