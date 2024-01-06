"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function VideoSelect(props: SelectProps) {
  const videos = api.video.all.useQuery();
  const options = useMemo(
    () =>
      !videos.data || videos.data.length === 0
        ? []
        : videos.data.map((row) => {
            return {
              value: row.id.toString(),
              name: row.name ?? row.url,
            };
          }),
    [videos],
  );

  return <SelectUi {...props} placeholder="select video" options={options} />;
}
