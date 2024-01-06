"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function VodScreenTypeSelect(props: SelectProps) {
  const rawData = api.vodScreenType.all.useQuery();
  const options = useMemo(
    () =>
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              value: row.id.toString(),
              name: `${row.name} - ${row.id}`,
            };
          }),
    [rawData],
  );

  return (
    <SelectUi
      {...props}
      placeholder="select vod Screen type"
      options={options}
    />
  );
}
