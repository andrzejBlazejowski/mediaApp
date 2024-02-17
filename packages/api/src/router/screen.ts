import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  screensInsertSchema,
  screenTypesInsertSchema,
} from "@media/db/schema/screen";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const screenRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.screens;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.screens.findMany({
      with: {
        screenType: true,
        menuLinks: true,
        articleScreen: true,
        vodScreen: true,
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
      return ctx.db.query.screens.findFirst({
        where: eq(schema.screens.id, input.id),
        with: {
          screenType: true,
          menuLinks: true,
          articleScreen: true,
          vodScreen: true,
        },
      });
    }),

  create: permitedProcedure
    .input(screensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.screens).values(input);
    }),
  update: permitedProcedure
    .input(screensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.screens)
        .set(input)
        .where(eq(schema.screens.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.screens).where(eq(schema.screens.id, input));
  }),
});

export const screenTypeRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.screenTypes;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.screenTypes.findMany({
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
      return ctx.db.query.screenTypes.findFirst({
        where: eq(schema.screenTypes.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(screenTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.screenTypes).values(input);
    }),
  update: permitedProcedure
    .input(screenTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.screenTypes)
        .set(input)
        .where(eq(schema.screenTypes.id, input.id ?? 0));
    }),
  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.screenTypes)
      .where(eq(schema.screenTypes.id, input));
  }),
});
