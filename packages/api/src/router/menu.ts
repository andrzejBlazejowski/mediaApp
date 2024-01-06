import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  menuLinkImagesInsertSchema,
  menuLinksInsertSchema,
  menusInsertSchema,
  menuTypesInsertSchema,
} from "@media/db/schema/menu";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const menuRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menus.findMany({
      orderBy: desc(schema.menus.id),
      with: {
        menuLinks: true,
        menuPlatform: true,
        menuType: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menus.findFirst({
        where: eq(schema.menus.id, input.id),
        with: {
          menuLinks: true,
        },
      });
    }),

  create: protectedProcedure
    .input(menusInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menus).values(input);
    }),
  update: protectedProcedure
    .input(menusInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menus)
        .set(input)
        .where(eq(schema.menus.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.menus).where(eq(schema.menus.id, input));
  }),
});

export const menuLinkRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menuLinks.findMany({
      orderBy: desc(schema.menuLinks.id),
      with: {
        menuLinkImage: true,
        menu: true,
        destinationScreen: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuLinks.findFirst({
        where: eq(schema.menuLinks.id, input.id),
        with: {
          menuLinkImage: true,
          menu: true,
          destinationScreen: true,
        },
      });
    }),

  create: protectedProcedure
    .input(menuLinksInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuLinks).values(input);
    }),
  update: protectedProcedure
    .input(menuLinksInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menuLinks)
        .set(input)
        .where(eq(schema.menuLinks.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.menuLinks)
      .where(eq(schema.menuLinks.id, input));
  }),
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
  update: protectedProcedure
    .input(menuTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menuTypes)
        .set(input)
        .where(eq(schema.menuTypes.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.menuTypes)
      .where(eq(schema.menuTypes.id, input));
  }),
});

export const menuLinkImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.menuLinkImages.findMany({
      orderBy: desc(schema.menuLinkImages.id),
      with: {
        menuLink: true,
        image: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuLinkImages.findFirst({
        where: eq(schema.menuLinkImages.id, input.id),
        with: {
          menuLink: true,
          image: true,
        },
      });
    }),

  create: protectedProcedure
    .input(menuLinkImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuLinkImages).values(input);
    }),
  update: protectedProcedure
    .input(menuLinkImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menuLinkImages)
        .set(input)
        .where(eq(schema.menuLinkImages.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.menuLinkImages)
      .where(eq(schema.menuLinkImages.id, input));
  }),
});
