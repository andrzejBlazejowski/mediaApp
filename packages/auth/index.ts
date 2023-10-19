import Discord from "@auth/core/providers/discord";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, tableCreator } from "@media/db";

import { env } from "./env.mjs";

export type { Session } from "next-auth";

// Update this whenever adding new providers so that the client can
export const providers = ["discord"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

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
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    session: ({ session, user }) => {
      console.log("++++++++++++++++++++++++++++");
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user: ", user);
      console.log("account: ", account);
      console.log("profile: ", profile);
      console.log("email: ", email);
      console.log("credentials: ", credentials);
      return true;
    },
    // @TODO - if you wanna have auth on the edge
    jwt: ({ token, profile }) => {
      console.log("=========================");
      if (profile?.id) {
        token.id = profile.id;
        token.image = profile.picture;
      }
      return token;
    },
    // @TODO
    authorized({ request, auth }) {
      console.log("env.DISCORD_CLIENT_ID: ", env.DISCORD_CLIENT_ID);
      console.log("env.DISCORD_CLIENT_SECRET: ", env.DISCORD_CLIENT_SECRET);
      console.log("-------------------------22222", auth, auth?.user);
      return !!auth?.user;
    },
  },
});
