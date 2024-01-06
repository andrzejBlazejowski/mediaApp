"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function MenuTypeSelect(props: SelectProps) {
  const rawData = api.menuType.all.useQuery();
  const options = useMemo(
    () =>
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((menuType) => {
            return {
              value: menuType.id.toString(),
              name: menuType.name ?? menuType.id.toString(),
            };
          }),
    [rawData],
  );

  return (
    <SelectUi {...props} placeholder="select menu type" options={options} />
  );
}
