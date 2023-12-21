import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  menuLinkImages,
  menuLinkImagesInsertSchema,
  menuLinks,
  menuLinksInsertSchema,
  menus,
  menusInsertSchema,
  menuTypes,
  menuTypesInsertSchema,
} from "@media/db/schema/menu";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createDeleteQuery } from "./commonRouter";

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

  create: protectedProcedure
    .input(menusInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menus).values(input);
    }),
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

  create: protectedProcedure
    .input(menuLinksInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuLinks).values(input);
    }),
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

  create: protectedProcedure
    .input(menuTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuTypes).values(input);
    }),
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

  create: protectedProcedure
    .input(menuLinkImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuLinkImages).values(input);
    }),
  delete: createDeleteQuery<typeof menuLinkImages>(menuLinkImages),
});
