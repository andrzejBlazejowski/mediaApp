"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../_components/TableView";
import { TableView } from "../_components/TableView";

export default function Page() {
  const videos = api.video.all.useQuery();

  const mediaIndexProps = useMemo(() => {
    const data =
      !videos.data || videos.data.length === 0
        ? []
        : videos.data.map((video) => {
            return {
              url: { value: video.url },
              id: { value: video.id.toString() },
            };
          });
    return {
      title: "media video content list",
      data: data,
      headersConfig: {
        url: {
          orderNumber: 0,
          name: "url",
          label: "url",
          classNames: "w-[100px]",
          sortable: true,
        },
        id: {
          orderNumber: 0,
          name: "id",
          label: "id",
          classNames: "w-[100px]",
          sortable: true,
        },
      },
    } as TableViewProps;
  }, [videos]);

  return <TableView {...mediaIndexProps}></TableView>;
}
