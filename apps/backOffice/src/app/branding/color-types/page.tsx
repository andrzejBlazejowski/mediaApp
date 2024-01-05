"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.brandingColorType.all.useQuery();
  const deleteRow = api.brandingColorType.delete.useMutation();
  const invalidate = utils.brandingColorType.all.invalidate;
  const headersConfig = {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[100px]",
      sortable: true,
    },
    key: {
      orderNumber: 1,
      name: "key",
      label: "key",
      classNames: "w-[100px]",
      sortable: true,
    },
    name: {
      orderNumber: 2,
      name: "name",
      label: "name",
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
              key: { value: row.key },
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
