import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  castMemberImagesInsertSchema,
  castMembersInsertSchema,
  castRolesInsertSchema,
  mediaCastMembersInsertSchema,
  peopleInsertSchema,
} from "@media/db/schema/cast";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const castMemberRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.castMembers.findMany({
      orderBy: desc(schema.castMembers.id),
      with: {
        castMemberImage: true,
        castRole: true,
        person: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.castMembers.findFirst({
        where: eq(schema.castMembers.id, input.id),
        with: {
          castMemberImage: true,
          castRole: true,
          person: true,
        },
      });
    }),

  create: protectedProcedure
    .input(castMembersInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.castMembers).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.castMembers)
      .where(eq(schema.castMembers.id, input));
  }),
});

export const castMemberImageRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.castMemberImages.findMany({
      orderBy: desc(schema.castMemberImages.id),
      with: {
        image: true,
        castMember: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.castMemberImages.findFirst({
        where: eq(schema.castMemberImages.id, input.id),
        with: {
          image: true,
          castMember: true,
        },
      });
    }),

  create: protectedProcedure
    .input(castMemberImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.castMemberImages).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.castMemberImages)
      .where(eq(schema.castMemberImages.id, input));
  }),
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

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.castRoles)
      .where(eq(schema.castRoles.id, input));
  }),
});

export const mediaCastMemberRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.mediaCastMembers.findMany({
      orderBy: desc(schema.mediaCastMembers.id),
      with: {
        castMember: true,
        media: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.mediaCastMembers.findFirst({
        where: eq(schema.mediaCastMembers.id, input.id),
        with: {
          castMember: true,
          media: true,
        },
      });
    }),

  create: protectedProcedure
    .input(mediaCastMembersInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaCastMembers).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaCastMembers)
      .where(eq(schema.mediaCastMembers.id, input));
  }),
});

export const peopleRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.people.findMany({
      orderBy: desc(schema.people.id),
      with: {
        castMembers: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.people.findFirst({
        where: eq(schema.people.id, input.id),
        with: {
          castMembers: true,
        },
      });
    }),

  create: protectedProcedure
    .input(peopleInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.people).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.people).where(eq(schema.people.id, input));
  }),
});
