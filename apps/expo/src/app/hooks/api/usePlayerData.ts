import { useMemo } from "react";

import { api } from "~/utils/api";

export function usePlayerData(id: number | string) {
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.video.byId.useQuery({
    id: typeof id === "string" ? parseInt(id) : id,
  });

  return useMemo(() => {
    const tempStr = "loading...";
    const title = data ? data.name : tempStr;
    const content = data ? data.name : tempStr;
    const url = data
      ? data.url
      : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    return { title, content, url };
  }, [data]);
}
