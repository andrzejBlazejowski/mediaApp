"use client";

import React from "react";

import { TableView } from "~/app/_components/TableView";
import { useVideoContents } from "./useVideoContents";

export default function Page() {
  const { mediaIndexProps } = useVideoContents({});

  return <TableView {...mediaIndexProps}></TableView>;
}
