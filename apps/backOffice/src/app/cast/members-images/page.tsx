"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";
import { useHeadersConfig, useSort, useFilter } from "~/app/_lib/hooks";

export default function Page() {
  const utils = api.useUtils();
  const initialHeadersConfig = useMemo(
    () => (  {
      id: {
        orderNumber: 0,
        name: "id",
        label: "id",
        classNames: "w-[100px]",
        
  filterable: true,
  sortDirection: SortTypes.None,
      },
      name: {
        orderNumber: 1,
        name: "name",
        label: "name",
        classNames: "w-[100px]",
        
  filterable: true,
  sortDirection: SortTypes.None,
      },
      media: {
        orderNumber: 1,
        name: "media",
        label: "media",
        classNames: "w-[100px]",
        
  filterable: true,
  sortDirection: SortTypes.None,
      },
      image: {
        orderNumber: 2,
        name: "image",
        label: "image",
        classNames: "w-[100px]",
        
  filterable: true,
  sortDirection: SortTypes.None,
      },
    } ),
    [],
  );

  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();



  

  const rawData = api.castMemberImage.all.useQuery(  { sort, filter });
  const deleteRow = api.castMemberImage.delete.useMutation();
  const invalidate = utils.castMemberImage.all.invalidate;
  const headersConfig =;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              name: { value: row.name },
              cast: { value: `${row.castMember?.id}  ` },
              image: { value: row?.image?.name ?? "" },
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
