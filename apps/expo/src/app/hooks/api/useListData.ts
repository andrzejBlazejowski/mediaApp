import { useMemo } from "react";

import { api } from "~/utils/api";
import { ListAssetTypeEnum } from "../../utils";

const getAssetsType = (type: string | null | undefined) => {
  switch (type) {
    case "COVER":
      return ListAssetTypeEnum.COVER;
    case "FRAME":
      return ListAssetTypeEnum.FRAME;
    default:
      return ListAssetTypeEnum.COVER;
  }
};

export function useListData(id: number | string) {
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.expo.getVodScreenDetails.useQuery({
    id: typeof id === "string" ? parseInt(id) : id,
  });

  return useMemo(() => {
    const { name, vodScreen } = data ?? { name: "loading" };
    const title = name;
    const lists = vodScreen?.vodScreenMediaLists?.map((vodScreenMediaList) => {
      const { name, id } = vodScreenMediaList;

      const mediaList = vodScreenMediaList?.mediaList;
      const assetsType = getAssetsType(mediaList?.mediaListType?.name);
      const assets =
        mediaList?.mediaListMedias.map(({ media }) => {
          return {
            id: media.id,
            name: media.name,
            url: media.mediaImages.reduce(
              (acc, current) => {
                return getAssetsType(current?.mediaImageType.name) ===
                  assetsType
                  ? current?.image.url
                  : acc;
              },
              media.mediaImages[0]?.image?.url,
            ),
          };
        }) ?? [];
      return {
        title: name ?? "list " + id,
        listId: id,
        type: assetsType,
        assets,
      };
    });
    return { lists, title };
  }, [data]);
}
