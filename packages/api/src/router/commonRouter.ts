import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { AnyMySqlTable } from "drizzle-orm/mysql-core";
import { z } from "zod";

import { schema } from "@media/db";

import { protectedProcedure } from "../trpc";

export function createAllQuery<TTable extends AnyMySqlTable>(table: TTable) {
  return protectedProcedure.query(({ ctx }) => {
    const tableQuery = ctx.db.query[
      table._.name as keyof typeof ctx.db.query
    ] as unknown as { findMany: any };
    if (!tableQuery) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "database table not found. " + table._.name,
      });
    }

    return tableQuery.findMany({
      where: (table: { id: number; isDeleted: boolean }, { eq }: any) =>
        eq(table.isDeleted, false),
    });
  });
}

export function createByIDQuery<TTable extends AnyMySqlTable>(table: TTable) {
  return protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      const tableQuery = ctx.db.query[
        table._.name as keyof typeof ctx.db.query
      ] as unknown as { findFirst: any };
      if (!tableQuery) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "database table not found. " + table._.name,
        });
      }
      return tableQuery.findFirst({
        where: (tab: { id: number; isDeleted: boolean }, { eq, and }: any) =>
          and(eq(tab.id, input.id), eq(tab.isDeleted, false)),
      });
    });
}

export interface TableWithId extends AnyMySqlTable {
  id: number;
}

export function createDeleteQuery<TTable extends AnyMySqlTable>(table: TTable) {
  return protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    const tableSchema = schema[table._.name as keyof typeof schema];
    if (!tableSchema) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Table schema not found: " + table._.name,
      });
    }
    //@ts-ignore
    return (
      ctx.db
        .update(table)
        .set({ isDeleted: true })
        //@ts-ignore
        .where(eq(table.id, input))
    );
  });
}

export function createCreateQuery<TTable extends AnyMySqlTable>(
  table: TTable,
  inputType: z.ZodType,
) {
  return protectedProcedure.input(inputType).mutation(({ ctx, input }) => {
    const tableSchema = schema[table._.name as keyof typeof schema];
    if (!tableSchema) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Table schema not found: " + table._.name,
      });
    }
    //@ts-ignore
    return ctx.db.insert(tableSchema).values({ ...input });
  });
}
