import type { AnyColumn } from "drizzle-orm";
import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  menuPlatformsInsertSchema,
  platformsInsertSchema,
} from "@media/db/schema/platform";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const platformRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.platforms;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.platforms.findMany({
      with: {
        menuPlatforms: true,
      },
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], `%${filter?.value}%`),
      }),
    });
  }),
  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.platforms.findFirst({
        where: eq(schema.platforms.id, input.id),
        with: {
          menuPlatforms: true,
        },
      });
    }),
  create: permitedProcedure
    .input(platformsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.platforms).values(input);
    }),
  update: permitedProcedure
    .input(platformsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.platforms)
        .set(input)
        .where(eq(schema.platforms.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.platforms)
      .where(eq(schema.platforms.id, input));
  }),
});

export const menuPlatformRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.menuPlatforms;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.menuPlatforms.findMany({
      with: {
        platform: true,
        menu: true,
      },
      orderBy,
      ...(filter && {
        where: (table, { like, eq }) =>
          filter.eq
            ? //@ts-expect-error
              eq(table[filter.column], filter?.value)
            : //@ts-expect-error
              like(table[filter.column], `%${filter?.value}%`),
      }),
    });
  }),
  byId: permitedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.menuPlatforms.findFirst({
        where: eq(schema.menuPlatforms.id, input.id),
        with: {
          platform: true,
          menu: true,
        },
      });
    }),

  create: permitedProcedure
    .input(menuPlatformsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.menuPlatforms).values(input);
    }),
  update: permitedProcedure
    .input(menuPlatformsInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.menuPlatforms)
        .set(input)
        .where(eq(schema.menuPlatforms.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.menuPlatforms)
      .where(eq(schema.menuPlatforms.id, input));
  }),
});
