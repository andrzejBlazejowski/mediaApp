"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { useFilter, useHeadersConfig, useSort } from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import { Toaster } from "../_components/ui/toaster";
import { useToast } from "../_components/ui/use-toast";
import { title } from "./constants";

export default function Page() {
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
      name: {
        orderNumber: 1,
        name: "name",
        label: "name",
        classNames: "w-[100px]",

        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      email: {
        orderNumber: 1,
        name: "email",
        label: "email",
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

  const rawData = api.user.all.useQuery({ sort, filter });

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              name: { value: row?.name ?? "" },
              email: { value: row.email },
            };
          });
    return {
      title: title + " list",
      data: data,
      headersConfig,

      onSortByColumn,
      onFilter,
      onFilterClear,

      onDeleteRow: (id) => {
        toast({
          variant: "destructive",
          title: "Action not permited",
          description:
            "You can not delete users, instead, please remove privilages for the user.",
        });
      },
    } as TableViewProps;
  }, [rawData]);

  return (
    <>
      <Toaster />
      <TableView {...mediaIndexProps} isAddButtonVisible={false}></TableView>
    </>
  );
}
