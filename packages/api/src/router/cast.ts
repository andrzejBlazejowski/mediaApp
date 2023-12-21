import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  castMemberImages,
  castMemberImagesInsertSchema,
  castMembers,
  castMembersInsertSchema,
  castRoles,
  castRolesInsertSchema,
  mediaCastMembers,
  mediaCastMembersInsertSchema,
  people,
  peopleInsertSchema,
} from "@media/db/schema/cast";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createDeleteQuery } from "./commonRouter";

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

  create: protectedProcedure
    .input(castMembersInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.castMembers).values(input);
    }),
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

  create: protectedProcedure
    .input(castMemberImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.castMemberImages).values(input);
    }),
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

  create: protectedProcedure
    .input(castRolesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.castRoles).values(input);
    }),
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

  create: protectedProcedure
    .input(mediaCastMembersInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaCastMembers).values(input);
    }),
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

  create: protectedProcedure
    .input(peopleInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.people).values(input);
    }),
  delete: createDeleteQuery<typeof people>(people),
});
