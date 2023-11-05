import { z } from "zod";

import {
  menuLinkImages,
  menuLinks,
  menus,
  menuTypes,
} from "@media/db/schema/menu";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const menuRouter = createTRPCRouter({
  all: createAllQuery<typeof menus>(menus),
  byId: createByIDQuery<typeof menus>(menus),
  create: createCreateQuery<typeof menus>(
    menus,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menus>(menus),
});

export const menuLinkRouter = createTRPCRouter({
  all: createAllQuery<typeof menuLinks>(menuLinks),
  byId: createByIDQuery<typeof menuLinks>(menuLinks),
  create: createCreateQuery<typeof menuLinks>(
    menuLinks,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuLinks>(menuLinks),
});

export const menuTypeRouter = createTRPCRouter({
  all: createAllQuery<typeof menuTypes>(menuTypes),
  byId: createByIDQuery<typeof menuTypes>(menuTypes),
  create: createCreateQuery<typeof menuTypes>(
    menuTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuTypes>(menuTypes),
});

export const menuLinkImageRouter = createTRPCRouter({
  all: createAllQuery<typeof menuLinkImages>(menuLinkImages),
  byId: createByIDQuery<typeof menuLinkImages>(menuLinkImages),
  create: createCreateQuery<typeof menuLinkImages>(
    menuLinkImages,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuLinkImages>(menuLinkImages),
});
