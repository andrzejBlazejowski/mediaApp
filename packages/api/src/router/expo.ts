import { eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const expoRouter = createTRPCRouter({
  getArticle: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      const article = ctx.db.query.articleScreens.findFirst({
        where: eq(schema.articleScreens.id, input.id),
        with: {
          articleScreenImages: {
            with: {
              image: true,
            },
          },
        },
      });
      return article;
    }),
  getBranding: publicProcedure
    .input(z.object({ client: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.brandings.findFirst({
        where: eq(schema.brandings.name, input.client),
        with: {
          brandingColors: { with: { brandingColorType: true } },
          brandingImages: { with: { image: true, brandingImageType: true } },
        },
      });
    }),
  getMediaDetails: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.medias.findFirst({
        where: eq(schema.medias.id, input.id),
        with: {
          videoContents: {
            with: {
              video: true,
              videoContentType: true,
            },
          },
          mediaViewImpressions: true,
          mediaImages: {
            with: {
              image: true,
              mediaImageType: true,
            },
          },
          mediaCastMembers: {
            with: {
              castMember: {
                with: {
                  castMemberImage: {
                    with: {
                      image: true,
                    },
                  },
                  person: true,
                  castRole: true,
                  country: true,
                },
              },
            },
          },
        },
      });
    }),
  getMenu: publicProcedure
    .input(z.object({ platform: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.platforms.findFirst({
        where: eq(schema.platforms.name, input.platform.toUpperCase()),
        with: {
          menuPlatforms: {
            with: {
              menu: {
                with: {
                  menuLinks: {
                    with: {
                      menuLinkImage: {
                        with: {
                          image: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),

  saveMediaImpression: protectedProcedure
    .input(z.object({ mediaId: z.number(), progress: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.mediaViewImpressions).values({
        mediaId: input.mediaId,
        progress: input.progress,
        isDeleted: false,
        createdAt: new Date().toString(),
        createdBy: 1,
        updatedAt: new Date().toString(),
        updatedBy: 1,
      });
    }),

  buyMedia: protectedProcedure
    .input(z.object({ mediaId: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.).values({
        mediaId: input.mediaId,
        date: new Date(),
      });
      // return ctx.db.insert(schema.clientAppDictionaries).values(input);
    }),
});
