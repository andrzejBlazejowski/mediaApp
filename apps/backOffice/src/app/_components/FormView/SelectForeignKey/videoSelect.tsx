"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";

interface Props {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export default function VideoSelect(props: Props) {
  const videos = api.video.all.useQuery();
  const options = useMemo(
    () =>
      !videos.data || videos.data.length === 0
        ? []
        : videos.data.map((video) => {
            return {
              value: video.id.toString(),
              name: video.name ?? video.url,
            };
          }),
    [videos],
  );

  return <SelectUi {...props} placeholder="select video" options={options} />;
}
