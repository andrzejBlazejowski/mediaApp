import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { privilagesInsertSchema } from "@media/db/schema/auth";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  all: protectedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.users;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.users.findMany({
      with: {
        privilage: true,
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

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.users.findFirst({
        where: eq(schema.users.id, input.id),
        with: {
          privilage: true,
        },
      });
    }),
});

export const userPrivilegeRouter = createTRPCRouter({
  all: protectedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.privilages;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.privilages.findMany({
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
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.privilages.findFirst({
        where: eq(schema.privilages.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(privilagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.privilages).values(input);
    }),
  update: protectedProcedure
    .input(privilagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.privilages)
        .set(input)
        .where(eq(schema.privilages.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.privilages)
      .where(eq(schema.privilages.id, input));
  }),
});
