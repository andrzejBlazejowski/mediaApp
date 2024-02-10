"use client";

import React, { useMemo } from "react";

import { InputTypes } from "~/app/_components/FormView/FormView.types";
import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { useToast } from "~/app/_components/ui/use-toast";
import { useFilter, useHeadersConfig, useSort } from "~/app/_lib/hooks";
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
        foreignKey: "countryId",
        type: InputTypes.foreignKey,
      },
      lastName: {
        orderNumber: 2,
        name: "lastName",
        label: "lastName",
        classNames: "w-[100px]",
        hidden: true,

        sortable: true,
        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "countryId",
        type: InputTypes.foreignKey,
      },
      role: {
        orderNumber: 3,
        name: "role",
        label: "role",
        classNames: "w-[100px]",

        sortable: true,
        filterable: true,
        sortDirection: SortTypes.None,

        foreignKey: "castRoleId",
        type: InputTypes.foreignKey,
      },
    }),
    [],
  );
  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();

  const rawData = api.castMember.all.useQuery({ sort, filter });
  const deleteRow = api.castMember.delete.useMutation();
  const invalidate = utils.castMember.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              firstName: { value: row.person?.firstName },
              lastName: { value: row.person?.lastName },
              role: { value: row.castRole?.name },
              id: { value: row.id.toString() },
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
