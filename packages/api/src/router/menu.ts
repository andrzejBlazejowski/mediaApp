import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  menuLinkImages,
  menuLinks,
  menus,
  menuTypes,
} from "@media/db/schema/menu";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCreateQuery, createDeleteQuery } from "./commonRouter";

export const menuRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menus.findMany({ orderBy: desc(schema.menus.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menus.findFirst({
        where: eq(schema.menus.id, input.id),
      });
    }),
  create: createCreateQuery<typeof menus>(
    menus,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menus>(menus),
});

export const menuLinkRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menuLinks.findMany({
      orderBy: desc(schema.menuLinks.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuLinks.findFirst({
        where: eq(schema.menuLinks.id, input.id),
      });
    }),
  create: createCreateQuery<typeof menuLinks>(
    menuLinks,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuLinks>(menuLinks),
});

export const menuTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menuTypes.findMany({
      orderBy: desc(schema.menuTypes.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuTypes.findFirst({
        where: eq(schema.menuTypes.id, input.id),
      });
    }),
  create: createCreateQuery<typeof menuTypes>(
    menuTypes,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuTypes>(menuTypes),
});

export const menuLinkImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menuLinkImages.findMany({
      orderBy: desc(schema.menuLinkImages.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuLinkImages.findFirst({
        where: eq(schema.menuLinkImages.id, input.id),
      });
    }),
  create: createCreateQuery<typeof menuLinkImages>(
    menuLinkImages,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof menuLinkImages>(menuLinkImages),
});
