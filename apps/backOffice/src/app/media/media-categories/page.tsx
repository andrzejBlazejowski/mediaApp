"use client";

import React from "react";

import { TableView } from "~/app/_components/TableView";
import { useMediaCategoty } from "./useMediaCategory";

export default function Page() {
  const { mediaIndexProps } = useMediaCategoty({});

  return <TableView {...mediaIndexProps}></TableView>;
}
