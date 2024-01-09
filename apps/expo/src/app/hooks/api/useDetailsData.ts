import { useMemo } from "react";

import { api } from "~/utils/api";

export function useDetailsData(id: number | string) {
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
    const title = "thor 10";
    const content =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus eu augue nec venenatis. Nullam posuere risus sollicitudin nibh fermentum tincidunt. In hac habitasse platea dictumst. Nullam in aliquam est, commodo feugiat mauris. Nullam nec venenatis libero. Etiam non pellentesque ex. Ut quis dolor malesuada, volutpat urna eu, pellentesque tortor. Nunc sed auctor nisl. Donec convallis condimentum metus, et lacinia arcu euismod sit amet.";
    const imgUrl = "thor 10";
    const videoId = 1;
    const trailerId = 1;
    const mediaId = 1;

    return { imgUrl, videoId, trailerId, mediaId, title, content };
  }, [data]);
}
