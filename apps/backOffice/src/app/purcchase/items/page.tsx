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
      purchase: {
        orderNumber: 1,
        name: "purchase",
        label: "purchase",
        classNames: "w-[100px]",

        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      media: {
        orderNumber: 2,
        name: "media",
        label: "media",
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

  const rawData = api.purchaseItem.all.useQuery({ sort, filter });
  const deleteRow = api.purchaseItem.delete.useMutation();
  const invalidate = utils.purchaseItem.all.invalidate;
  useRedirectOnUnauthorized(rawData);

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              purchase: { value: row.purchaseId.toString() },
              media: {
                value: row?.media?.name ?? row.mediaId.toString() ?? "",
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
