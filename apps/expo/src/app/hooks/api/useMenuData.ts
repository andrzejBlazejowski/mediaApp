import { useMemo } from "react";
import { Platform } from "react-native";

import { api } from "~/utils/api";

const getScreenUrlByType = (type: string) => {
  switch (type) {
    case "ARTICLE":
      return "article";
    case "VOD_LIST":
      return "vod/list";
    case "VOD_GRID":
      return "vod/grid";
    default:
      return "article";
  }
};

export function useMenuData() {
  const platform = Platform.OS;

  const rawData = api.expo.getMenu.useQuery({ platform: platform });

  interface MenuItem {
    name: string;
    id: number;
    destinationId: number;
    url: string;
    segment: "article" | "vod/list" | "vod/grid";
  }

  return useMemo(() => {
    const menuItems: MenuItem[] = rawData?.data?.menuPlatforms[0]
      ? rawData?.data.menuPlatforms[0].menu.menuLinks.map((menuLink) => {
          menuLink.destinationScreen.screenType.name;

          return {
            name: menuLink.name ?? menuLink.id.toString(),
            id: menuLink.id,
            destinationId: menuLink.destinationScreenId,
            url: menuLink.menuLinkImage.image.url,
            segment: getScreenUrlByType(
              menuLink.destinationScreen?.screenType?.name ?? "",
            ),
          };
        })
      : [];
    const title: string = rawData?.data?.menuPlatforms[0]?.menu.name ?? "";
    return { menuItems, title };
  }, [rawData]);
}
