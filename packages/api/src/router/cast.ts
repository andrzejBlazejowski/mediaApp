import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import {
  castMemberImagesInsertSchema,
  castMembersInsertSchema,
  castRolesInsertSchema,
  mediaCastMembersInsertSchema,
  peopleInsertSchema,
} from "@media/db/schema/cast";

import { allQuerySchema } from "../../utils";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const castMemberRouter = createTRPCRouter({
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.castMembers;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.castMembers.findMany({
      with: {
        castMemberImage: true,
        castRole: true,
        person: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
  update: protectedProcedure
    .input(castMembersInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.videoContents)
        .set(input)
        .where(eq(schema.videoContents.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.castMembers)
      .where(eq(schema.castMembers.id, input));
  }),
});

export const castMemberImageRouter = createTRPCRouter({
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.castMemberImages;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.castMemberImages.findMany({
      with: {
        image: true,
        castMember: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
  update: protectedProcedure
    .input(castMemberImagesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.castMemberImages)
        .set(input)
        .where(eq(schema.castMemberImages.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.castMemberImages)
      .where(eq(schema.castMemberImages.id, input));
  }),
});

export const castRoleRouter = createTRPCRouter({
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.castRoles;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.castRoles.findMany({
      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
  update: protectedProcedure
    .input(castRolesInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.castRoles)
        .set(input)
        .where(eq(schema.castRoles.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.castRoles)
      .where(eq(schema.castRoles.id, input));
  }),
});

export const mediaCastMemberRouter = createTRPCRouter({
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.mediaCastMembers;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.mediaCastMembers.findMany({
      with: {
        castMember: true,
        media: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
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
  update: protectedProcedure
    .input(mediaCastMembersInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.mediaCastMembers)
        .set(input)
        .where(eq(schema.mediaCastMembers.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.mediaCastMembers)
      .where(eq(schema.mediaCastMembers.id, input));
  }),
});

export const peopleRouter = createTRPCRouter({
  all: publicProcedure.input(allQuerySchema).query(({ ctx, input }) => {
    const schemaTable = schema.people;
    const { sort, filter } = input ?? { sort: [] };
    const orderBy =
      sort?.map((column) => {
        //@ts-expect-error
        const schemaCollumn = schemaTable[column.column];
        return column.direction === "asc"
          ? asc(schemaCollumn)
          : desc(schemaCollumn);
      }) ?? [];
    return ctx.db.query.people.findMany({
      with: {
        castMember: true,
      },

      orderBy,
      ...(filter && {
        //@ts-expect-error
        where: (table, { like }) => like(table[filter.column], filter?.value),
      }),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.people.findFirst({
        where: eq(schema.people.id, input.id),
        with: {
          castMember: true,
        },
      });
    }),

  create: protectedProcedure
    .input(peopleInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.people).values(input);
    }),
  update: protectedProcedure
    .input(peopleInsertSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.people)
        .set(input)
        .where(eq(schema.people.id, input.id ?? 0));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.people).where(eq(schema.people.id, input));
  }),
});
