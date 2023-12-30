"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../../_components/TableView";
import { TableView } from "../../_components/TableView";

export default function Page() {
  const videoContents = api.videoContent.all.useQuery();
  const deleteRow = api.videoContent.delete.useMutation();
  const utils = api.useUtils();

  const mediaIndexProps = useMemo(() => {
    const data =
      !videoContents.data || videoContents.data.length === 0
        ? []
        : videoContents.data.map((videoContent) => {
            return {
              mediaId: { value: videoContent.mediaId.toString() },
              videoId: { value: videoContent.videoId.toString() },
              type: { value: videoContent.videoContentTypeId.toString() },
              id: { value: videoContent.id.toString() },
            };
          });
    return {
      title: "video content list",
      data: data,
      headersConfig: {
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
      },
      onDeleteRow: async (id) => {
        console.log(id, "on delete row");
        await deleteRow.mutateAsync(id);
        await utils.videoContent.all.invalidate();
      },
    } as TableViewProps;
  }, [videoContents, deleteRow, utils]);

  return <TableView {...mediaIndexProps}></TableView>;
}
