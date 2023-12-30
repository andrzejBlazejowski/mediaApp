"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../_components/TableView";
import { TableView } from "../_components/TableView";

export default function Page() {
  const casts = api.castMember.all.useQuery();

  const mediaIndexProps = useMemo(() => {
    const data =
      !casts.data || casts.data.length === 0
        ? []
        : casts.data.map((cast) => {
            return {
              firstName: { value: cast.person?.firstName },
              lastName: { value: cast.person?.lastName },
              role: { value: cast.castRole?.name },
              id: { value: cast.id.toString() },
            };
          });
    return {
      title: "video content list",
      data: data,
      headersConfig: {
        firstName: {
          orderNumber: 0,
          name: "firstName",
          label: "firstName",
          classNames: "w-[100px]",
          sortable: true,
        },
        lastName: {
          orderNumber: 1,
          name: "lastName",
          label: "lastName",
          classNames: "w-[100px]",
          sortable: true,
        },
        role: {
          orderNumber: 2,
          name: "role",
          label: "role",
          classNames: "w-[100px]",
          sortable: true,
        },
      },
    } as TableViewProps;
  }, [casts]);

  return <TableView {...mediaIndexProps}></TableView>;
}
