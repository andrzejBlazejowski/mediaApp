import { z } from "zod";

import {
  castMemberImages,
  castMembers,
  castRoles,
  mediaCastMembers,
  people,
} from "@media/db/schema/cast";

import { createTRPCRouter } from "../trpc";
import {
  createAllQuery,
  createByIDQuery,
  createCreateQuery,
  createDeleteQuery,
} from "./commonRouter";

export const castMemberRouter = createTRPCRouter({
  all: createAllQuery<typeof castMembers>(castMembers),
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
  all: createAllQuery<typeof castMemberImages>(castMemberImages),
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
  all: createAllQuery<typeof castRoles>(castRoles),
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
  all: createAllQuery<typeof mediaCastMembers>(mediaCastMembers),
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
  all: createAllQuery<typeof people>(people),
  byId: createByIDQuery<typeof people>(people),
  create: createCreateQuery<typeof people>(
    people,
    z.object({
      title: z.string().min(1),
    }),
  ),
  delete: createDeleteQuery<typeof people>(people),
});
