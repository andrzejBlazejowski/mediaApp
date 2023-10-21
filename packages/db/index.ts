import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as articleScreen from "./schema/articleScreen";
import * as auth from "./schema/auth";
import * as branding from "./schema/branding";
import * as cast from "./schema/cast";
import * as dictionary from "./schema/dictionary";
import * as genre from "./schema/genre";
import * as image from "./schema/image";
import * as invoice from "./schema/invoice";
import * as media from "./schema/media";
import * as mediaList from "./schema/mediaList";
import * as menu from "./schema/menu";
import * as platform from "./schema/platform";
import * as post from "./schema/post";
import * as screen from "./schema/screen";
import * as video from "./schema/video";
import * as vodScreen from "./schema/vodScreen";

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
  ...post,
  ...screen,
  ...video,
  ...vodScreen,
};

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema },
);
