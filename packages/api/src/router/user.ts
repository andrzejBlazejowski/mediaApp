import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  all: protectedProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    return ctx.db.query.users.findMany({
      orderBy: desc(schema.users.id),
      with: {
        privilage: true,
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
  // all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
  //   return ctx.db.query.articleScreens.findMany({
  //     orderBy: desc(schema.articleScreens.id),
  //     with: {
  //       articleScreenImages: true,
  //       screens: true,
  //     },
  //   });
  // }),
  // byId: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.db.query.articleScreens.findFirst({
  //       where: eq(schema.articleScreens.id, input.id),
  //       with: {
  //         articleScreenImages: true,
  //         screens: true,
  //       },
  //     });
  //   }),
  // create: protectedProcedure
  //   .input(articleScreensInsertSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(schema.articleScreens).values(input);
  //   }),
  // update: protectedProcedure
  //   .input(articleScreensInsertSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db
  //       .update(schema.articleScreens)
  //       .set(input)
  //       .where(eq(schema.articleScreens.id, input.id ?? 0));
  //   }),
  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db
  //     .delete(schema.articleScreens)
  //     .where(eq(schema.articleScreens.id, input));
  // }),
  //TODO : add user router + add place for invoice data
});
