import { useMemo } from "react";

import { api } from "~/utils/api";
import { GridAssetTypeEnum } from "../utils";

export function useArticleData(id: number | string) {
  if (!id || typeof id !== "string") throw new Error("unreachable");
  // const { data } = api.expo.getArticle.useQuery({
  //   id: typeof id === "string" ? parseInt(id) : id,
  // });

  return useMemo(() => {
    // const { title, content } = data ?? { title: "loading", content: "loading" };
    // const name = data ? data.name ?? data?.id?.toString() : "";
    // const images = data
    //   ? data.articleScreenImages.map((image) => image?.image?.url ?? "")
    //   : [];

    // const firstImageUrl = images.length > 0 ? images[0] : null;
    // const isMoreThanOneImage = images.length >= 1;
    const assets = [
      {
        id: 4,
        name: "John Wick 10",
        url: "https://unsplash.com/photos/va9218QJFAk/download?ixid=M3wxMjA3fDF8MXxhbGx8MXx8fHx8fDJ8fDE3MDQ2Mzc4NDh8&force=true&w=640",
      },
      {
        id: 3,
        name: "Wonder Woman",
        url: "https://unsplash.com/photos/WpOMM4uE-F8/download?ixid=M3wxMjA3fDF8MXxhbGx8Nnx8fHx8fDJ8fDE3MDQ2Mzc4NDh8&force=true&w=640",
      },
    ];
    const title = " grid";
    const assetsType = GridAssetTypeEnum.FRAME;
    return { assets, title, assetsType };
  }, []);
}
