"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import {
  useFilter,
  useHeadersConfig,
  useRedirectOnUnauthorized,
  useSort,
} from "../_lib/hooks";
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
    }),
    [],
  );

  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();

  const rawData = api.branding.all.useQuery({ sort, filter });
  const deleteRow = api.branding.delete.useMutation();
  const invalidate = utils.branding.all.invalidate;
  useRedirectOnUnauthorized(rawData);

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              name: { value: row.name },
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
        try {
          await deleteRow.mutateAsync(id);
          await invalidate();
        } catch (e) {
          alert("Action not permited");
        }
      },
    } as TableViewProps;
  }, [rawData]);

  return <TableView {...mediaIndexProps}></TableView>;
}
