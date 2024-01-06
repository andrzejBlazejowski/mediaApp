"use-client";

import React, { useMemo } from "react";

import { SelectUi } from ".";
import { SelectProps } from "./select.types";

export default function SexKeySelect(props: SelectProps) {
  const options = useMemo(
    () => [
      {
        value: "0",
        name: "male",
      },
      {
        value: "1",
        name: "female",
      },
      {
        value: "2",
        name: "unknown",
      },
    ],
    [],
  );

  return (
    <SelectUi
      {...props}
      type="string"
      placeholder="select image type"
      options={options}
    />
  );
}
