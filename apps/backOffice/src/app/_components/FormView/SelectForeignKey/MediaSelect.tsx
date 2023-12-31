"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function MediaSelect(props: SelectProps) {
  const medias = api.media.all.useQuery();
  const options = useMemo(
    () =>
      !medias.data || medias.data.length === 0
        ? []
        : medias.data.map((media) => {
            return {
              value: media.id.toString(),
              name: media.name ?? media.id.toString(),
            };
          }),
    [medias],
  );

  return <SelectUi {...props} placeholder="select media" options={options} />;
}
