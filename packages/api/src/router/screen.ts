import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  screensInsertSchema,
  screenTypesInsertSchema,
} from "@media/db/schema/screen";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const screenRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.screens.findMany({ orderBy: desc(schema.screens.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.screens.findFirst({
        where: eq(schema.screens.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(screensInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.screens).values(input);
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.screens).where(eq(schema.screens.id, input));
  }),
});

export const screenTypeRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.screenTypes.findMany({
      orderBy: desc(schema.screenTypes.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.screenTypes.findFirst({
        where: eq(schema.screenTypes.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(screenTypesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.screenTypes).values(input);
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.screenTypes)
      .where(eq(schema.screenTypes.id, input));
  }),
});
