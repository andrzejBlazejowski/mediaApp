import { eq } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@media/db";
import { menus } from "@media/db/schema/menu";
import { menuPlatforms, platforms } from "@media/db/schema/platform";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const expoRouter = createTRPCRouter({
  //   all: publicProcedure.query(({ ctx }) => {
  //     return ctx.db.query.articleScreens.findMany({
  //       orderBy: desc(schema.articleScreens.id),
  //       with: {
  //         articleScreenImages: true,
  //         screens: true,
  //       },
  //     });
  //   }),
  //   byId: publicProcedure
  //     .input(z.object({ id: z.number() }))
  //     .query(({ ctx, input }) => {
  //       return ctx.db.query.articleScreens.findFirst({
  //         where: eq(schema.articleScreens.id, input.id),
  //         with: {
  //           articleScreenImages: true,
  //           screens: true,
  //         },
  //       });
  //     }),

  //   create: protectedProcedure
  //     .input(articleScreensInsertSchema)
  //     .mutation(({ ctx, input }) => {
  //       return ctx.db.insert(schema.articleScreens).values(input);
  //     }),
  //   update: protectedProcedure
  //     .input(articleScreensInsertSchema)
  //     .mutation(({ ctx, input }) => {
  //       return ctx.db
  //         .update(schema.articleScreens)
  //         .set(input)
  //         .where(eq(schema.articleScreens.id, input.id ?? 0));
  //     }),

  //   delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //     return ctx.db
  //       .delete(schema.articleScreens)
  //       .where(eq(schema.articleScreens.id, input));
  //   }),
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
  getMenu: publicProcedure
    .input(z.object({ platform: z.string() }))
    .query(({ ctx, input }) => {
      // const article = ctx.db.query.menus.findFirst({
      //   where: eq(
      //     schema.menus.menuPlatform.name.toUpperCase(),
      //     input.platform.toUpperCase(),
      //   ),
      //   with: {
      //     menuPlatform: true,
      //     menuLinks: {
      //       with: {
      //         menuLinkImages: {
      //           with: {
      //             image: true,
      //           },
      //         },
      //       },
      //     },
      //     menuType,
      //   },
      // });
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
