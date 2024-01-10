import { eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
});
z;
