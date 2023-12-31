"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function VideoContentTypeSelect(props: SelectProps) {
  const videoContentTypes = api.videoContentType.all.useQuery();
  const options = useMemo(
    () =>
      !videoContentTypes.data || videoContentTypes.data.length === 0
        ? []
        : videoContentTypes.data.map((videoContentType) => {
            return {
              value: videoContentType.id.toString(),
              name: videoContentType.name ?? videoContentType.id.toString(),
            };
          }),
    [videoContentTypes],
  );

  return (
    <SelectUi {...props} placeholder="select content Type" options={options} />
  );
}
