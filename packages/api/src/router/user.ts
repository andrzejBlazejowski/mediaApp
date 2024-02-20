import type { AnyColumn } from "drizzle-orm";
import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { privilagesInsertSchema } from "@media/db/schema/auth";

import { allQuerySchema } from "../../utils";
import {
  createTRPCRouter,
  permitedProcedure,
  protectedProcedure,
} from "../trpc";

export const userRouter = createTRPCRouter({
  all: protectedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.users;
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
    return ctx.db.query.users.findMany({
      with: {
        privilage: true,
      },

      orderBy,
      where: (table, { like, eq, not, and }) => {
        const excludeSuperAdmin = not(
          eq(table.id, "c5637392-fc8c-48a6-a61f-3f2e0d80fcca"),
        );
        return filter
          ? filter.eq
            ? //@ts-expect-error
              and(eq(table[filter.column], filter?.value), excludeSuperAdmin)
            : and(
                //@ts-expect-error
                like(table[filter.column], `%${filter?.value}%`),
                excludeSuperAdmin,
              )
          : excludeSuperAdmin;
      },
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
        const schemaCollumn = schemaTable[
          column.column as keyof typeof schemaTable
        ] as AnyColumn;
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.privilages.findMany({
      orderBy,

      where: (table, { like, eq, and, not }) => {
        const excludeSuperAdmin = not(
          eq(table.id, "c5637392-fc8c-48a6-a61f-3f2e0d80fcca"),
        );
        return filter
          ? filter.eq
            ? //@ts-expect-error
              and(eq(table[filter.column], filter?.value), excludeSuperAdmin)
            : and(
                //@ts-expect-error
                like(table[filter.column], `%${filter?.value}%`),
                excludeSuperAdmin,
              )
          : not(eq(table.id, "c5637392-fc8c-48a6-a61f-3f2e0d80fcca"));
      },
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.privilages.findFirst({
        where: eq(schema.privilages.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(privilagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.privilages).values(input);
    }),

  update: permitedProcedure
    .input(privilagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.privilages)
        .set(input)
        .where(eq(schema.privilages.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.privilages)
      .where(eq(schema.privilages.id, input));
  }),
});
