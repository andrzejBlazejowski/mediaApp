"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function PurchaseSelect(props: SelectProps) {
  const rawData = api.purchase.all.useQuery({});
  const options = useMemo(
    () =>
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            console.log(row);
            return {
              value: row.id.toString(),
              name:
                (row.user?.name ?? row.user?.id.toString()) +
                " - " +
                (row.media.name ?? row.media.id.toString() ?? ""),
            };
          }),
    [rawData],
  );

  return (
    <SelectUi {...props} placeholder="select purchase" options={options} />
  );
}
