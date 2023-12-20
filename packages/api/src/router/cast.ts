import { desc } from "drizzle-orm";
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
import {
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const castMemberRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.castMembers.findMany({
      orderBy: desc(schema.castMembers.id),
    });
  }),
  byId: createByIDQuery<typeof castMembers>(castMembers),
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
  byId: createByIDQuery<typeof castMemberImages>(castMemberImages),
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
  byId: createByIDQuery<typeof castRoles>(castRoles),
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
  byId: createByIDQuery<typeof mediaCastMembers>(mediaCastMembers),
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
  byId: createByIDQuery<typeof people>(people),
  create: createCreateQuery<typeof people>(
    people,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof people>(people),
});
