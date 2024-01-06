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
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[20px]",
      sortable: true,
    },
    media: {
      orderNumber: 1,
      name: "media",
      label: "media",
      classNames: "w-[100px]",
      sortable: true,
    },
    video: {
      orderNumber: 2,
      name: "video",
      label: "video",
      classNames: "w-[100px]",
      sortable: true,
    },
    type: {
      orderNumber: 3,
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
              media: { value: row.media.name },
              video: { value: row.video.name },
              type: { value: row.videoContentType.name },
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
