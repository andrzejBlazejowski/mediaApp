"use client";

import React from "react";

import { TableView } from "~/app/_components/TableView";
import { useMediaList } from "./useMediaList";

export default function Page() {
  const { mediaIndexProps } = useMediaList({});

  return <TableView {...mediaIndexProps}></TableView>;
}
