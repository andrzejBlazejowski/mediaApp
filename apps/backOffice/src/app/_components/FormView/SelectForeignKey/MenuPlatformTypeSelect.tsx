"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function MenuPlatformTypeSelect(props: SelectProps) {
  const rawData = api.menuPlatform.all.useQuery();
  const options = useMemo(
    () =>
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((menuPlatform) => {
            return {
              value: menuPlatform.id.toString(),
              name: `${
                menuPlatform?.platform.name ??
                menuPlatform.platformId.toString()
              } - ${menuPlatform?.menu.name ?? menuPlatform.menuId.toString()}`,
            };
          }),
    [rawData],
  );

  return (
    <SelectUi {...props} placeholder="select menu type" options={options} />
  );
}
