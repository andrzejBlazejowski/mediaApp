"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function ScreenSelect(props: SelectProps) {
  const vodRawData = api.vodScreen.all.useQuery();
  const articleRawData = api.articleScreen.all.useQuery();
  const options = useMemo(() => {
    const vodOptions =
      !vodRawData.data || vodRawData.data.length === 0
        ? []
        : vodRawData.data.map((row) => {
            return {
              value: row.id.toString(),
              name: `${row.name} - ${row.id}`,
            };
          });

    const articleOptions =
      !articleRawData.data || articleRawData.data.length === 0
        ? []
        : articleRawData.data.map((row) => {
            return {
              value: row.id.toString(),
              name: `${row.name} - ${row.id}`,
            };
          });

    return articleOptions.concat(vodOptions);
  }, [vodRawData, articleRawData]);

  return (
    <SelectUi {...props} placeholder="select vod Screen" options={options} />
  );
}
