import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  menuLinkImagesInsertSchema,
  menuLinksInsertSchema,
  menusInsertSchema,
  menuTypesInsertSchema,
} from "@media/db/schema/menu";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const menuRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.menus;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.menus.findMany({
      with: {
        menuLinks: true,
        menuPlatform: true,
        menuType: true,
      },
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menus.findFirst({
        where: eq(schema.menus.id, input.id),
        with: {
          menuLinks: true,
        },
      });
    }),

  create: permitedProcedure
    .input(menusInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menus).values(input);
    }),
  update: permitedProcedure
    .input(menusInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menus)
        .set(input)
        .where(eq(schema.menus.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.menus).where(eq(schema.menus.id, input));
  }),
});

export const menuLinkRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.menuLinks;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.menuLinks.findMany({
      with: {
        menuLinkImage: true,
        menu: true,
        destinationScreen: true,
      },
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
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

  create: permitedProcedure
    .input(menuLinksInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuLinks).values(input);
    }),
  update: permitedProcedure
    .input(menuLinksInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menuLinks)
        .set(input)
        .where(eq(schema.menuLinks.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.menuLinks)
      .where(eq(schema.menuLinks.id, input));
  }),
});

export const menuTypeRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.menuTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.menuTypes.findMany({
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuTypes.findFirst({
        where: eq(schema.menuTypes.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(menuTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuTypes).values(input);
    }),
  update: permitedProcedure
    .input(menuTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menuTypes)
        .set(input)
        .where(eq(schema.menuTypes.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.menuTypes)
      .where(eq(schema.menuTypes.id, input));
  }),
});

export const menuLinkImageRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.menuLinkImages;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.menuLinkImages.findMany({
      with: {
        image: true,
      },
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuLinkImages.findFirst({
        where: eq(schema.menuLinkImages.id, input.id),
        with: {
          image: true,
        },
      });
    }),

  create: permitedProcedure
    .input(menuLinkImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuLinkImages).values(input);
    }),
  update: permitedProcedure
    .input(menuLinkImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menuLinkImages)
        .set(input)
        .where(eq(schema.menuLinkImages.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.menuLinkImages)
      .where(eq(schema.menuLinkImages.id, input));
  }),
});
