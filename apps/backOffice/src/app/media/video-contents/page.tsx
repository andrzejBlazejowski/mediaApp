"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../../_components/TableView";
import { TableView } from "../../_components/TableView";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.videoContent.all.useQuery();
  const deleteRow = api.videoContent.delete.useMutation();
  const invalidate = utils.videoContent.all.invalidate;
  const headersConfig = {
    mediaId: {
      orderNumber: 0,
      name: "mediaId",
      label: "mediaId",
      classNames: "w-[100px]",
      sortable: true,
    },
    videoId: {
      orderNumber: 1,
      name: "videoId",
      label: "videoId",
      classNames: "w-[100px]",
      sortable: true,
    },
    type: {
      orderNumber: 2,
      name: "type",
      label: "type",
      classNames: "w-[100px]",
      sortable: true,
    },
  };

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              mediaId: { value: row.mediaId.toString() },
              videoId: { value: row.videoId.toString() },
              type: { value: row.videoContentTypeId.toString() },
              id: { value: row.id.toString() },
            };
          });
    return {
      title: title + " list",
      data: data,
      headersConfig,
      onDeleteRow: async (id) => {
        await deleteRow.mutateAsync(id);
        await invalidate();
      },
    } as TableViewProps;
  }, [rawData]);

  return <TableView {...mediaIndexProps}></TableView>;
}
