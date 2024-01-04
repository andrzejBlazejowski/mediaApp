"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function CastMemberSelect(props: SelectProps) {
  const rawData = api.castMember.all.useQuery();
  const options = useMemo(
    () =>
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              value: row.id.toString(),
              name: `${row.castRole?.name ?? row.id.toString()} ${row.person
                ?.firstName} ${row.person?.lastName}`,
            };
          }),
    [rawData],
  );

  return (
    <SelectUi {...props} placeholder="select image type" options={options} />
  );
}
