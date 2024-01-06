"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.mediaImage.all.useQuery();
  const deleteRow = api.mediaImage.delete.useMutation();
  const invalidate = utils.mediaImage.all.invalidate;
  const headersConfig = {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[100px]",
      sortable: true,
    },
    name: {
      orderNumber: 1,
      name: "name",
      label: "name",
      classNames: "w-[100px]",
      sortable: true,
    },
    media: {
      orderNumber: 1,
      name: "media",
      label: "media",
      classNames: "w-[100px]",
      sortable: true,
    },
    image: {
      orderNumber: 2,
      name: "image",
      label: "image",
      classNames: "w-[100px]",
      sortable: true,
    },
    imageType: {
      orderNumber: 2,
      name: "imageType",
      label: "imageType",
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
              id: { value: row.id.toString() },
              name: { value: row.name },
              media: { value: `${row.media.name}  ${row.media.type}` },
              image: { value: row?.image?.name ?? "" },
              imageType: { value: row?.mediaImageType?.name ?? "" },
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
