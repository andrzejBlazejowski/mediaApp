"use-client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function PeopleSelect(props: SelectProps) {
  const rawData = api.people.all.useQuery();
  const options = useMemo(
    () =>
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              value: row.id.toString(),
              name: `${row.firstName} ${row.lastName}`,
            };
          }),
    [rawData],
  );

  return <SelectUi {...props} placeholder="select person" options={options} />;
}
