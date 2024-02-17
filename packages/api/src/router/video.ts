import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { videosInsertSchema } from "@media/db/schema/video";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, permitedProcedure } from "../trpc";

export const videoRouter = createTRPCRouter({
  all: permitedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.videos;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.videos.findMany({
      with: {
        videoContents: true,
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
      return ctx.db.query.videos.findFirst({
        where: eq(schema.videos.id, input.id),
        with: {
          videoContents: true,
        },
      });
    }),
  create: permitedProcedure
    .input(videosInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.videos).values(input);
    }),
  update: permitedProcedure
    .input(videosInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.videos)
        .set(input)
        .where(eq(schema.videos.id, input.id ?? 0));
    }),

  delete: permitedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.videos).where(eq(schema.videos.id, input));
  }),
});
