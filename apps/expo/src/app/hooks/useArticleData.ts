import { useMemo } from "react";

import { api } from "~/utils/api";

export function useArticleData(id: number | string) {
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.expo.getArticle.useQuery({
    id: typeof id === "string" ? parseInt(id) : id,
  });

  return useMemo(() => {
    const { title, content } = data ?? { title: "loading", content: "loading" };
    const name = data ? data.name ?? data?.id?.toString() : "";
    const images = data
      ? data.articleScreenImages.map((image) => image?.image?.url ?? "")
      : [];
    console.log(images.length);
    const firstImageUrl = images.length > 0 ? images[0] : null;
    const isMoreThanOneImage = images.length >= 1;
    return { images, firstImageUrl, isMoreThanOneImage, name, title, content };
  }, [data]);
}
