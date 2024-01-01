"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../../_components/TableView";
import { TableView } from "../../_components/TableView";

export default function Page() {
  const mediaImages = api.mediaImage.all.useQuery();

  const mediaIndexProps = useMemo(() => {
    const data =
      !mediaImages.data || mediaImages.data.length === 0
        ? []
        : mediaImages.data.map((mediaImage) => {
            return {
              name: { value: mediaImage.name },
              mediaId: { value: mediaImage.mediaId.toString() },
              imageId: { value: mediaImage.imageId.toString() },
            };
          });
    return {
      title: "media images ",
      data: data,
      headersConfig: {
        name: {
          orderNumber: 0,
          name: "name",
          label: "name",
          classNames: "w-[100px]",
          sortable: true,
        },
        mediaId: {
          orderNumber: 1,
          name: "mediaId",
          label: "mediaId",
          classNames: "w-[100px]",
          sortable: true,
        },
        imageId: {
          orderNumber: 2,
          name: "imageId",
          label: "imageId",
          classNames: "w-[100px]",
          sortable: true,
        },
      },
    } as TableViewProps;
  }, [mediaImages]);

  return <TableView {...mediaIndexProps}></TableView>;
}
