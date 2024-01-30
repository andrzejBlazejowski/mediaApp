import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { genresInsertSchema } from "@media/db/schema/genre";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const genreRouter = createTRPCRouter({
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.genres;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.genres.findMany({
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

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.genres.findFirst({
        where: eq(schema.genres.id, input.id),
      });
    }),
  create: protectedProcedure
    .input(genresInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.genres).values(input);
    }),
  update: protectedProcedure
    .input(genresInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.genres)
        .set(input)
        .where(eq(schema.genres.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.genres).where(eq(schema.genres.id, input));
  }),
});
