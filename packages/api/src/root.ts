import {
  articleScreenImageRouter,
  articleScreenRouter,
} from "./router/articleScreen";
import { authRouter } from "./router/auth";
// import {
//   brandingColorRouter,
//   brandingColorTypeRouter,
//   brandingImageRouter,
//   brandingImageTypeRouter,
//   brandingRouter,
// } from "./router/branding";
import {
  castMemberImageRouter,
  castMemberRouter,
  castRoleRouter,
  mediaCastMemberRouter,
  peopleRouter,
} from "./router/cast";
import {
  backOfficeDictionaryRouter,
  clientAppDictionaryRouter,
  countryRouter,
} from "./router/dictionary";
import { genreRouter } from "./router/genre";
import { imageRouter } from "./router/image";
import {
  invoiceRouter,
  invoiceTemplateRouter,
  invoiceTypeRouter,
} from "./router/invoice";
import {
  mediaCategoyRouter,
  mediaImageRouter,
  mediaImageTypeRouter,
  mediaRouter,
  mediaViewImpressionRouter,
  videoContentRouter,
  videoContentTypeRouter,
} from "./router/media";
import {
  mediaListMediaRouter,
  mediaListRouter,
  mediaListTypeRouter,
} from "./router/mediaList";
import {
  menuLinkImageRouter,
  menuLinkRouter,
  menuRouter,
  menuTypeRouter,
} from "./router/menu";
import { menuPlatformRouter, platformRouter } from "./router/platform";
import { postRouter } from "./router/post";
import {
  purchaseItemRouter,
  purchaseRouter,
  purchaseTypeRouter,
} from "./router/purchase";
import { screenRouter, screenTypeRouter } from "./router/screen";
import { videoRouter } from "./router/video";
import {
  vodScreenMediaListRouter,
  vodScreenRouter,
  vodScreenTypeRouter,
} from "./router/videoScreen";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  media: mediaRouter,
  videoContent: videoContentRouter,
  videoContentType: videoContentTypeRouter,
  mediaCategory: mediaCategoyRouter,
  mediaImage: mediaImageRouter,
  mediaImageType: mediaImageTypeRouter,
  mediaViewImpression: mediaViewImpressionRouter,
  articleScreen: articleScreenRouter,
  articleScreenImage: articleScreenImageRouter,
  castMemberImage: castMemberImageRouter,
  castMember: castMemberRouter,
  castRole: castRoleRouter,
  mediaCastMember: mediaCastMemberRouter,
  people: peopleRouter,
  // brandingColor: brandingColorRouter,
  // brandingColorType: brandingColorTypeRouter,
  // brandingImage: brandingImageRouter,
  // brandingImageType: brandingImageTypeRouter,
  // branding: brandingRouter,
  backOfficeDictionary: backOfficeDictionaryRouter,
  clientAppDictionary: clientAppDictionaryRouter,
  country: countryRouter,
  genre: genreRouter,
  image: imageRouter,
  invoice: invoiceRouter,
  invoiceType: invoiceTypeRouter,
  invoiceTemplate: invoiceTemplateRouter,
  mediaList: mediaListRouter,
  mediaListType: mediaListTypeRouter,
  mediaListMedia: mediaListMediaRouter,
  menu: menuRouter,
  menuLink: menuLinkRouter,
  menuType: menuTypeRouter,
  menuLinkImage: menuLinkImageRouter,
  platform: platformRouter,
  menuPlatform: menuPlatformRouter,
  purchase: purchaseRouter,
  purchaseItem: purchaseItemRouter,
  purchaseType: purchaseTypeRouter,
  screen: screenRouter,
  screenType: screenTypeRouter,
  video: videoRouter,
  vodScreen: vodScreenRouter,
  vodScreenType: vodScreenTypeRouter,
  vodScreenMediaList: vodScreenMediaListRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
