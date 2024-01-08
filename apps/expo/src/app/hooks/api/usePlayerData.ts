import { useMemo } from "react";

import { api } from "~/utils/api";

export function usePlayerData(id: number | string) {
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

    const title = "movie";
    const content = "some description";
    const url =
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    return { title, content, url };
  }, []);
}
