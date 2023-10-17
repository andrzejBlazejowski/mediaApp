import Discord from "@auth/core/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, tableCreator } from "@media/db";

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
      console.log("++++++++++++++++++++++++++++22222");
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
    // @TODO - if you wanna have auth on the edge
    jwt: ({ token, profile }) => {
      console.log("==================+22222");
      if (profile?.id) {
        token.id = profile.id;
        token.image = profile.picture;
      }
      return token;
    },
    // @TODO
    authorized({ request, auth }) {
      console.log("-------------------------22222", auth, auth?.user);
      return !!auth?.user;
    },
  },
});
