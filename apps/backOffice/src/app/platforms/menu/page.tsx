"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "../constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.menuPlatform.all.useQuery();
  const deleteRow = api.menuPlatform.delete.useMutation();
  const invalidate = utils.menuPlatform.all.invalidate;
  const headersConfig = {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[100px]",
      sortable: true,
    },
    platform: {
      orderNumber: 1,
      name: "platform",
      label: "platform",
      classNames: "w-[100px]",
      sortable: true,
    },
    menu: {
      orderNumber: 2,
      name: "menu",
      label: "menu",
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
              platform: { value: row?.platform?.name ?? row.platformId ?? "" },
              menu: { value: row?.menu?.name ?? row.menuId ?? "" },
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
