import React from "react";

import { api } from "~/utils/api";
import { SelectForeignKey } from "./";

interface Props {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export default function videoSelect({ defaultValue, onValueChange }: Props) {
  const videos = api.video.all.useQuery();
  const options =
    !videos.data || videos.data.length === 0
      ? []
      : videos.data.map((video) => {
          return {
            value: video.id.toString(),
            name: video.url,
          };
        });

  return (
    <SelectForeignKey
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      placeholder="select video"
      options={options}
    />
  );
}
