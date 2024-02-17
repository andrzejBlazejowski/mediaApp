"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { useToast } from "~/app/_components/ui/use-toast";
import {
  useFilter,
  useHeadersConfig,
  useRedirectOnUnauthorized,
  useSort,
} from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const { toast } = useToast();

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
      firstName: {
        orderNumber: 1,
        name: "firstName",
        label: "firstName",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      middleName: {
        orderNumber: 2,
        name: "middleName",
        label: "middleName",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      lastName: {
        orderNumber: 3,
        name: "lastName",
        label: "lastName",
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

  const rawData = api.people.all.useQuery({ sort, filter });
  const deleteRow = api.people.delete.useMutation();
  const invalidate = utils.people.all.invalidate;
  useRedirectOnUnauthorized(rawData);

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              firstName: { value: row.firstName },
              lastName: { value: row.lastName },
              middleName: { value: row.middleName },
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
          toast({
            variant: "destructive",
            title: "Action not permited",
            description: "You can not delete.",
          });
        }
      },
    } as TableViewProps;
  }, [rawData]);

  return <TableView {...mediaIndexProps}></TableView>;
}
