"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../../_components/TableView";
import { TableView } from "../../_components/TableView";

export default function Page() {
  const mediaImageTypes = api.mediaImageType.all.useQuery();

  const mediaIndexProps = useMemo(() => {
    const data =
      !mediaImageTypes.data || mediaImageTypes.data.length === 0
        ? []
        : mediaImageTypes.data.map((mediaImageType) => {
            return {
              name: { value: mediaImageType.name },
              description: { value: mediaImageType.description },
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
  }, [mediaImageTypes]);

  return <TableView {...mediaIndexProps}></TableView>;
}
