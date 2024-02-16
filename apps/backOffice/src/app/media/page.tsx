"use client";

import React from "react";

import { TableView } from "~/app/_components/TableView";
import { useMedia } from "./useMedia";

export default function Page() {
  const { mediaIndexProps } = useMedia({});

  return <TableView {...mediaIndexProps}></TableView>;
}
