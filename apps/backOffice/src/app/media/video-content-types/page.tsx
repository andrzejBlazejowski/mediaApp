"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../../_components/TableView";
import { TableView } from "../../_components/TableView";

export default function Page() {
  const videoContentTypes = api.videoContentType.all.useQuery();

  const mediaIndexProps = useMemo(() => {
    const data =
      !videoContentTypes.data || videoContentTypes.data.length === 0
        ? []
        : videoContentTypes.data.map((videoContentType) => {
            return {
              name: { value: videoContentType.name },
              description: { value: videoContentType.description },
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
          orderNumber: 1,
          name: "description",
          label: "description",
          classNames: "w-[200px]",
          sortable: true,
        },
      },
    } as TableViewProps;
  }, [videoContentTypes]);

  return <TableView {...mediaIndexProps}></TableView>;
}
