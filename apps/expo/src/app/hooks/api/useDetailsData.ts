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
    const imgUrl =
      "https://unsplash.com/photos/QUyKkfjt_Rs/download?ixid=M3wxMjA3fDB8MXxhbGx8MTV8fHx8fHwyfHwxNzA0ODE2MDQ3fA&force=true&w=640";
    const videoId = 1;
    const trailerId = 1;
    const mediaId = 1;
    const castMembers = [
      {
        name: "Francis Ford Coppola",
        role: "Director",
        image:
          "https://image.tmdb.org/t/p/w500/6TjllWT3cGrPFyqDXurVZ3L8bBi.jpg",
        birthDate: "1952.03.06",
        deathDate: "2002.01.08",
        geneder: "male",
        country: "Italy",
      },
      {
        name: "Mario Puzo",
        role: "screenwriter",
        image:
          "https://unsplash.com/photos/vOGENinKryI/download?ixid=M3wxMjA3fDB8MXxhbGx8MTh8fHx8fHwyfHwxNzA0ODE2MDQ3fA&force=true&w=640",
        birthDate: "1952.03.06",
        geneder: "male",
        country: "Poland",
      },
      {
        name: "Marlon Brandon",
        role: "Actor",
        image:
          "https://unsplash.com/photos/GoLWB4p8JXw/download?ixid=M3wxMjA3fDF8MXxhbGx8MjZ8fHx8fHwyfHwxNzA0ODE3ODU2fA&force=true&w=640",
        birthDate: "1952.03.06",
        geneder: "male",
        country: "Italy",
      },
    ];

    return { imgUrl, videoId, trailerId, mediaId, title, content, castMembers };
  }, []);
}
