import { useMemo } from "react";

import { api } from "~/utils/api";

export function useDetailsData(id: number | string) {
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.expo.getMediaDetails.useQuery({
    id: typeof id === "string" ? parseInt(id) : id,
  });

  return useMemo(() => {
    const title = data?.name;
    const content = data?.shortDescription;
    const imgUrl = data?.mediaImages[0]?.image?.url ?? "";
    const videoId = data?.videoContents.filter(
      (videoContent) => videoContent.videoContentType.name === "main",
    )[0]?.id;
    const trailerId = data?.videoContents.filter(
      (videoContent) => videoContent.videoContentType.name === "trailer",
    )[0]?.id;
    const mediaId = data?.id;
    const castMembers = data?.mediaCastMembers.map((mediaCastMember) => {
      const { id, castMember } = mediaCastMember;
      const { firstName, middleName, lastName, birthDate, deathDate, sex } =
        castMember.person ?? {};
      return {
        name: `${firstName}, ${middleName}, ${lastName}`,
        id: id,
        role: mediaCastMember?.castMember?.castRole?.name,
        image: castMember?.castMemberImage.image.url ?? "",
        birthDate,
        deathDate,

        gender: sex,
        country:
          castMember?.country?.name ?? castMember?.country?.id.toString() ?? "",
      };
    });
    const isFree = data?.isFree;
    const isBought = false;

    return {
      imgUrl,
      videoId,
      trailerId,
      mediaId,
      title,
      content,
      castMembers,
      isFree,
      isBought,
    };
  }, [data]);
}
