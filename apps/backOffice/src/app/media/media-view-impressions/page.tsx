"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.mediaViewImpression.all.useQuery();
  const deleteRow = api.mediaViewImpression.delete.useMutation();
  const invalidate = utils.mediaViewImpression.all.invalidate;
  const headersConfig = {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[100px]",
      sortable: true,
    },
    progress: {
      orderNumber: 1,
      name: "progress",
      label: "progress",
      classNames: "w-[100px]",
      sortable: true,
    },
    media: {
      orderNumber: 0,
      name: "media",
      label: "media",
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
              media: { value: `${row.media.name}  ${row.media.type}` },
              progress: { value: `${row.progress} ` },
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
