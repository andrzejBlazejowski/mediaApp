"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { useFilter, useHeadersConfig, useSort } from "~/app/_lib/hooks";
import { api } from "~/utils/api";
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
      name: {
        orderNumber: 1,
        name: "name",
        label: "name",
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
      article: {
        orderNumber: 3,
        name: "article",
        label: "article",
        classNames: "w-[100px]",

        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      vod: {
        orderNumber: 4,
        name: "vod",
        label: "vod",
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

  const rawData = api.screen.all.useQuery({ sort, filter });
  const deleteRow = api.screen.delete.useMutation();
  const invalidate = utils.screen.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              name: { value: row.name ?? row.id },
              type: {
                value: row?.screenType?.name ?? row?.screenType?.id ?? "",
              },
              vod: { value: row?.vodScreen?.name ?? "" },
              article: { value: row?.articleScreen?.name ?? "" },
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
