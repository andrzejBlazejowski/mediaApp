import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  castMemberImages,
  castMembers,
  castRoles,
  mediaCastMembers,
  people,
} from "@media/db/schema/cast";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCreateQuery, createDeleteQuery } from "./commonRouter";

export const castMemberRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.castMembers.findMany({
      orderBy: desc(schema.castMembers.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.castMembers.findFirst({
        where: eq(schema.castMembers.id, input.id),
      });
    }),
  create: createCreateQuery<typeof castMembers>(
    castMembers,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof castMembers>(castMembers),
});

export const castMemberImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.castMemberImages.findMany({
      orderBy: desc(schema.castMemberImages.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.castMemberImages.findFirst({
        where: eq(schema.castMemberImages.id, input.id),
      });
    }),
  create: createCreateQuery<typeof castMemberImages>(
    castMemberImages,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof castMemberImages>(castMemberImages),
});

export const castRoleRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.castRoles.findMany({
      orderBy: desc(schema.castRoles.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.castRoles.findFirst({
        where: eq(schema.castRoles.id, input.id),
      });
    }),
  create: createCreateQuery<typeof castRoles>(
    castRoles,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof castRoles>(castRoles),
});

export const mediaCastMemberRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaCastMembers.findMany({
      orderBy: desc(schema.mediaCastMembers.id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaCastMembers.findFirst({
        where: eq(schema.mediaCastMembers.id, input.id),
      });
    }),
  create: createCreateQuery<typeof mediaCastMembers>(
    mediaCastMembers,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof mediaCastMembers>(mediaCastMembers),
});

export const peopleRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.people.findMany({ orderBy: desc(schema.people.id) });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.people.findFirst({
        where: eq(schema.people.id, input.id),
      });
    }),
  create: createCreateQuery<typeof people>(
    people,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof people>(people),
});
