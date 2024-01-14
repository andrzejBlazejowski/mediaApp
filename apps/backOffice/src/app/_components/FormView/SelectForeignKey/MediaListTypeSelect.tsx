"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function MediaListTypeSelect(props: SelectProps) {
  const rawData = api.mediaListType.all.useQuery();
  const options = useMemo(() => {
    const options =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              value: row.id.toString(),
              name: `${row.name} - ${row.id}`,
            };
          });

    return options;
  }, [rawData]);

  return (
    <SelectUi {...props} placeholder="select vod Screen" options={options} />
  );
}
