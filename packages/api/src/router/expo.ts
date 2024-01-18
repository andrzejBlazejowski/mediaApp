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
  getVodScreenDetails: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.screens.findFirst({
        where: eq(schema.screens.id, input.id),
        with: {
          vodScreen: {
            with: {
              vodScreenMediaLists: {
                with: {
                  mediaList: {
                    with: {
                      mediaListType: true,
                      mediaListMedias: {
                        with: {
                          media: {
                            with: {
                              mediaViewImpressions: true,
                              mediaImages: {
                                with: {
                                  image: true,
                                  mediaImageType: true,
                                },
                              },
                            },
                          },
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

  getPurchasesForMedia: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.purchases.findFirst({
        where: eq(schema.purchases.mediaId, input.id),
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
                      destinationScreen: {
                        with: {
                          screenType: true,
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
        createdAt: new Date(),
        createdBy: "1",
        updatedAt: new Date(),
        updatedBy: "1",
      });
    }),

  buyMedia: publicProcedure
    .input(z.object({ mediaId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const currentDate = new Date();
      const purchaseType = await ctx.db.query.purchaseTypes.findFirst({
        where: eq(schema.purchaseTypes.name, "UNLIMITED"),
      });

      const purchase = await ctx.db.insert(schema.purchases).values({
        purchaseTypeId: purchaseType?.id ?? 1,
        userId: 1,
        mediaId: input.mediaId,
        isDeleted: false,
        createdAt: currentDate,
        createdBy: "1",
        updatedAt: currentDate,
        updatedBy: "1",
      });

      return ctx.db.insert(schema.purchaseItems).values({
        mediaId: input.mediaId,
        purchaseId: parseInt(purchase.insertId),
        isDeleted: false,
        createdAt: currentDate,
        createdBy: "1",
        updatedAt: currentDate,
        updatedBy: "1",
      });
    }),
});
