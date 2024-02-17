import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { imagesInsertSchema } from "@media/db/schema/image";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const imageRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.images;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.images.findMany({
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
      return ctx.db.query.images.findFirst({
        where: eq(schema.images.id, input.id),
      });
    }),

  create: permitedProcedure
    .input(imagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.images).values(input);
    }),
  update: permitedProcedure
    .input(imagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.images)
        .set(input)
        .where(eq(schema.images.id, input.id ?? 0));
    }),
  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.images).where(eq(schema.images.id, input));
  }),
});
