import { useMemo } from "react";

import { api } from "~/utils/api";
import { GridAssetTypeEnum } from "../../utils";

const getAssetsType = (type: string | null | undefined) => {
  switch (type) {
    case "COVER":
      return GridAssetTypeEnum.COVER;
    case "FRAME":
      return GridAssetTypeEnum.FRAME;
    default:
      return GridAssetTypeEnum.COVER;
  }
};

export function useGridData(id: number | string) {
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.expo.getVodScreenDetails.useQuery({
    id: typeof id === "string" ? parseInt(id) : id,
  });

  console.log(id);
  console.log(data);

  return useMemo(() => {
    const { name, vodScreen } = data ?? { name: "loading" };
    const title = name;
    const mediaList = vodScreen?.vodScreenMediaLists?.[0]?.mediaList;
    const assetsType = getAssetsType(mediaList?.mediaListType?.name);
    const assets =
      mediaList?.mediaListMedias.map(({ media }) => {
        return {
          id: media.id,
          name: media.name,
          url: media.mediaImages.reduce(
            (acc, current) => {
              return getAssetsType(current?.mediaImageType.name) === assetsType
                ? current?.image.url
                : acc;
            },
            media.mediaImages[0]?.image?.url,
          ),
        };
      }) ?? [];
    return { assets, title, assetsType };
  }, [data]);
}
