"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.media.all.useQuery();
  const deleteRow = api.media.delete.useMutation();
  const invalidate = utils.media.all.invalidate;
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
      label: "Name",
      classNames: "w-[100px]",
      sortable: true,
    },
    type: {
      orderNumber: 2,
      name: "type",
      label: "Type",
      classNames: "w-[50px]",
      sortable: true,
    },
    isFree: {
      orderNumber: 3,
      name: "isFree",
      label: "IsFree",
      classNames: "w-[50px]",
      sortable: true,
    },
    category: {
      orderNumber: 4,
      name: "Category",
      label: "Category",
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
              name: { value: row.name ?? "" },
              type: { value: row.type ?? "" },
              isFree: { value: row.isFree.toString() ?? "" },
              category: { value: row.mediaCategory.name ?? "" },
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
