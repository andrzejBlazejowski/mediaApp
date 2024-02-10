import Discord from "@auth/core/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, tableCreator } from "@media/db";
import { privilages } from "@media/db/schema/auth";

import { env } from "./env.mjs";

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  adapter: DrizzleAdapter(db, tableCreator),
  providers: [
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },

    async signIn({ user, account, profile, email, credentials }) {
      console.warn(
        "sign in - get.ts",
        "user : ",
        user,
        "account : ",
        account,
        "profile : ",
        profile,
        "email : ",
        email,
        "credentials",
        credentials,
      );
      const privilage = await db.query.privilages.findFirst({
        where: (table, { eq }) => eq(table.userId, user.id),
      });
      !privilage &&
        db.insert(privilages).values({
          id: user.id,
          userId: user.id,
          media: 1,
          branding: 1,
          cast: 1,
          screens: 1,
          dictionary: 1,
          menu: 1,
          purcchase: 1,
        });
      return true;
    },
    // @TODO - if you wanna have auth on the edge
    jwt: ({ token, profile }) => {
      if (profile?.id) {
        token.id = profile.id;
        token.image = profile.picture;
      }
      return token;
    },
    // @TODO
    authorized({ request, auth }) {
      console.warn("authorized - get.ts");
      return !!auth?.user;
    },
  },
});
