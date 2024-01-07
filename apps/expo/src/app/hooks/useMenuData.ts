import { useEffect, useMemo } from "react";
import { Platform } from "react-native";

import { api } from "~/utils/api";

export function useMenuData() {
  const platform = Platform.OS;

  const { data } = api.expo.getMenu.useQuery({ platform: platform });

  interface MenuItem {
    name: string;
    id: number;
    url: string;
    type: "article" | "vod/list" | "vod/grid";
  }

  return useMemo(() => {
    const menuItems: MenuItem[] = data?.menuPlatforms[0]
      ? data.menuPlatforms[0].menu.menuLinks.map((menuLink) => {
          return {
            name: menuLink.name ?? menuLink.id.toString(),
            id: menuLink.id,
            url: menuLink.menuLinkImage.image.url,
            type: "article",
          };
        })
      : [];
    const title: string = data?.menuPlatforms[0]?.menu.name ?? "";
    return { menuItems, title };
  }, [data]);
}
