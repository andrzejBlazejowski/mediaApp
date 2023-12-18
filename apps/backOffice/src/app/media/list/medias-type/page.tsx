"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../../../_components/TableView";
import { TableView } from "../../../_components/TableView";

export default function Page() {
  const mediaListTypes = api.mediaListType.all.useQuery();

  const mediaIndexProps = useMemo(() => {
    const data =
      !mediaListTypes.data || mediaListTypes.data.length === 0
        ? []
        : mediaListTypes.data.map((mediaListType) => {
            return {
              name: { value: mediaListType.name },
              description: { value: mediaListType.description },
            };
          });
    return {
      title: "video content types list",
      data: data,
      headersConfig: {
        name: {
          orderNumber: 0,
          name: "name",
          label: "name",
          classNames: "w-[100px]",
          sortable: true,
        },
        description: {
          orderNumber: 0,
          name: "description",
          label: "description",
          classNames: "w-[100px]",
          sortable: true,
        },
      },
    } as TableViewProps;
  }, [mediaListTypes]);

  return <TableView {...mediaIndexProps}></TableView>;
}
