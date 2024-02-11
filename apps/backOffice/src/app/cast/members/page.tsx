"use client";

import React from "react";

import { TableView } from "~/app/_components/TableView";
import { useCastMembers } from "./useCastMembers";

export default function Page() {
  const { mediaIndexProps } = useCastMembers({});

  return <TableView {...mediaIndexProps}></TableView>;
}
