"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function MenuLinkImageTypeSelect(props: SelectProps) {
  const rawData = api.menuLinkImage.all.useQuery();
  const options = useMemo(
    () =>
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              value: row.id.toString(),
              name: row.name ?? row.id.toString(),
            };
          }),
    [rawData],
  );

  return (
    <SelectUi
      {...props}
      placeholder="select menu link image"
      options={options}
    />
  );
}