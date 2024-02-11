"use client";

import React from "react";

import { TableView } from "~/app/_components/TableView";
import { useMediaCastMembers } from "./useMediaCastMembers";

export default function Page() {
  const { mediaIndexProps } = useMediaCastMembers({});

  return <TableView {...mediaIndexProps}></TableView>;
}
