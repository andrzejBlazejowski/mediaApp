"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../../_components/TableView";
import { TableView } from "../../_components/TableView";

export default function Page() {
  const mediaViewImpressions = api.mediaViewImpression.all.useQuery();

  const mediaIndexProps = useMemo(() => {
    const data =
      !mediaViewImpressions.data || mediaViewImpressions.data.length === 0
        ? []
        : mediaViewImpressions.data.map((mediaViewImpression) => {
            return {
              progress: { value: mediaViewImpression.progress.toString() },
              mediaId: { value: mediaViewImpression.mediaId.toString() },
            };
          });
    return {
      title: "video content types list",
      data: data,
      headersConfig: {
        progress: {
          orderNumber: 0,
          name: "progress",
          label: "progress",
          classNames: "w-[100px]",
          sortable: true,
        },
        mediaId: {
          orderNumber: 0,
          name: "mediaId",
          label: "mediaId",
          classNames: "w-[100px]",
          sortable: true,
        },
      },
    } as TableViewProps;
  }, [mediaViewImpressions]);

  return <TableView {...mediaIndexProps}></TableView>;
}
