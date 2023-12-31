"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../../_components/TableView";
import { TableView } from "../../_components/TableView";
import { listConfig } from "./constants";

export default function Page() {
  const rawData = api.videoContent.all.useQuery();
  const deleteRow = api.videoContent.delete.useMutation();
  const utils = api.useUtils();

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((videoContent) => {
            return {
              media: { value: videoContent.media.name },
              video: { value: videoContent.video.name },
              type: { value: videoContent.videoContentType.name },
              id: { value: videoContent.id.toString() },
            };
          });
    return {
      ...listConfig,
      data: data,
      onDeleteRow: async (id) => {
        await deleteRow.mutateAsync(id);
        await utils.videoContent.all.invalidate();
      },
    } as TableViewProps;
  }, [rawData, deleteRow, utils]);

  return <TableView {...mediaIndexProps}></TableView>;
}
