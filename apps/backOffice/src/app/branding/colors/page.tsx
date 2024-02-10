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
      value: {
        orderNumber: 1,
        name: "value",
        label: "value",
        classNames: "w-[100px]",
        sortable: true,
        filterable: true,
        sortDirection: SortTypes.None,
      },
      branding: {
        orderNumber: 2,
        name: "branding",
        label: "branding",
        classNames: "w-[100px]",
        sortable: true,
        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "brandingId",
        type: InputTypes.foreignKey,
      },
      type: {
        orderNumber: 3,
        name: "type",
        label: "type",
        classNames: "w-[100px]",
        sortable: true,
        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "brandingColorTypeId",
        type: InputTypes.foreignKey,
      },
    }),
    [],
  );

  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();

  const rawData = api.brandingColor.all.useQuery({ sort, filter });
  const deleteRow = api.brandingColor.delete.useMutation();
  const invalidate = utils.brandingColor.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              values: { value: row.value },
              branding: {
                value: row?.branding?.name ?? row?.branding?.id ?? "",
              },
              type: {
                value:
                  row?.brandingColorType?.name ??
                  row?.brandingColorType?.name ??
                  "",
              },
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
