import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import {
  articleScreen,
  auth,
  branding,
  cast,
  dictionary,
  genre,
  image,
  invoice,
  media,
  mediaList,
  menu,
  platform,
  post,
  purchase,
  screen,
  video,
  vodScreen,
} from "./schema";

export const schema = {
  ...articleScreen,
  ...auth,
  ...branding,
  ...cast,
  ...dictionary,
  ...genre,
  ...image,
  ...invoice,
  ...media,
  ...mediaList,
  ...menu,
  ...platform,
  ...purchase,
  ...post,
  ...screen,
  ...video,
  ...vodScreen,
};

export * from "./schema";

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);
