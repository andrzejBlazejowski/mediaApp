"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { useFilter, useHeadersConfig, useSort } from "../_lib/hooks";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();
  const initialHeadersConfig = useMemo(
    () => ({
      id: {
        orderNumber: 0,
        name: "id",
        label: "id",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      platform: {
        orderNumber: 1,
        name: "platform",
        label: "platform",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      type: {
        orderNumber: 2,
        name: "type",
        label: "type",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
    }),
    [],
  );

  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();

  const rawData = api.menu.all.useQuery({ sort, filter });
  const deleteRow = api.menu.delete.useMutation();
  const invalidate = utils.menu.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              platform: {
                value: row.menuPlatformId.toString(),
              },
              type: { value: row?.menuType?.name ?? row.menuTypeId },
            };
          });
    return {
      title: title + " list",
      data: data,
      headersConfig,
      onSortByColumn,
      onFilter,
      onFilterClear,
      onDeleteRow: async (id) => {
        await deleteRow.mutateAsync(id);
        await invalidate();
      },
    } as TableViewProps;
  }, [rawData]);

  return <TableView {...mediaIndexProps}></TableView>;
}
