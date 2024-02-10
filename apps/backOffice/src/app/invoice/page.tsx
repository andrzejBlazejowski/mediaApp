"use client";

import React, { useMemo } from "react";

import { InputTypes } from "~/app/_components/FormView/FormView.types";
import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { useToast } from "~/app/_components/ui/use-toast";
import { api } from "~/utils/api";
import { useFilter, useHeadersConfig, useSort } from "../_lib/hooks";
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
      type: {
        orderNumber: 1,
        name: "type",
        label: "type",
        classNames: "w-[100px]",
        sortable: true,
        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "invoiceTypeId",
        type: InputTypes.foreignKey,
      },
      media: {
        orderNumber: 2,
        name: "media",
        label: "media",
        classNames: "w-[100px]",
        filterable: true,
        sortable: true,
        sortDirection: SortTypes.None,
        foreignKey: "mediaId",
        type: InputTypes.foreignKey,
      },
      user: {
        orderNumber: 3,
        name: "user",
        label: "user",
        classNames: "w-[100px]",
        sortable: true,
        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "UserId",
        type: InputTypes.foreignKey,
      },
    }),
    [],
  );

  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();

  const rawData = api.invoice.all.useQuery({ sort, filter });
  const deleteRow = api.invoice.delete.useMutation();
  const invalidate = utils.invoice.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              type: {
                value:
                  row?.invoiceType?.name ?? row.invoiceTypeId.toString() ?? "",
              },
              media: { value: row?.media?.name ?? row.media.toString() ?? "" },
              user: { value: row?.user?.email ?? row?.userId ?? "" },
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
