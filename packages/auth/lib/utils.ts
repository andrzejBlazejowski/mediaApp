import { accesses, privilagesAreas } from "./types";

export const isReadAccess = (val = 0) => {
  return (val & accesses.read) === accesses.read;
};
export const isWriteAccess = (val = 0) => {
  return (val & accesses.write) === accesses.write;
};
export const isDeleteAccess = (val = 0) => {
  return (val & accesses.delete) === accesses.delete;
};

export const getAccessIntValue = ({
  read,
  write,
  deleteAcc,
}: {
  read: boolean;
  write: boolean;
  deleteAcc: boolean;
}) => {
  let value = 0;
  if (read) value += accesses.read;
  if (write) value += accesses.write;
  if (deleteAcc) value += accesses.delete;
  return value;
};

export const privilagesHeaders = [
  "media",
  "branding",
  "cast",
  "screens",
  "dictionary",
  "menu",
  "purchase",
];

export const getPrivilageArea = (path: string) => {
  const router = path.split(".")[0] || "";
  const medias = [
    "media",
    " videoContent",
    "videoContentType",
    "mediaCategory",
    "mediaImage",
    "mediaImageType",
    "mediaViewImpression",
    "mediaList",
    "mediaListMedia",
    "mediaListType",
    "video",
    "image",
  ];
  if (medias.includes(router)) return privilagesAreas.media;
  const brandings = [
    "branding",
    "brandingColor",
    "brandingColorType",
    "brandingImage",
    "brandingImageType",
  ];
  if (brandings.includes(router)) return privilagesAreas.branding;
  const cast = [
    "castMember",
    "castMemberImage",
    "castRole",
    "mediaCastMember",
    "people",
  ];
  if (cast.includes(router)) return privilagesAreas.cast;
  const screen = [
    "screen",
    "screenType",
    "articleScreen",
    "articleScreenImage",
    "vodScreen",
    "vodScreenType",
    "vodScreenMediaList",
  ];
  if (screen.includes(router)) return privilagesAreas.screens;
  const dictionary = [
    "clientAppDictionary",
    "backOfficeDictionary",
    "country",
    "platform",
    "menuPlatform",
  ];
  if (dictionary.includes(router)) return privilagesAreas.dictionary;
  const menu = ["menu", "menuLink", "menuType", "menuLinkImage"];
  if (menu.includes(router)) return privilagesAreas.menu;
  const purchase = [
    "purchase",
    "purchaseItem",
    "invoice",
    "invoiceType",
    "invoiceTemplate",
  ];
  if (purchase.includes(router)) return privilagesAreas.purchase;
  return privilagesAreas.media;
};
