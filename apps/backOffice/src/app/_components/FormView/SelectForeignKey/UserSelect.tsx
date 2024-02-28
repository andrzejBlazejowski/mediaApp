"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function UserSelect(props: SelectProps) {
  const rawData = api.user.all.useQuery();
  const options = useMemo(
    () =>
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              value: row.id.toString(),
              name: row.name ?? row.email ?? "",
            };
          }),
    [rawData],
  );

  return (
    <SelectUi
      {...props}
      type="string"
      placeholder="select user"
      options={options}
    />
  );
}
