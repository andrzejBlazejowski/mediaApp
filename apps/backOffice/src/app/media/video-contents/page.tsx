"use client";

import React, { useMemo } from "react";

import { useFilter, useHeadersConfig, useSort } from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import type { TableViewProps } from "../../_components/TableView";
import { SortTypes, TableView } from "../../_components/TableView";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();
  const initialHeadersConfig = useMemo(
    () => ({
      id: {
        orderNumber: 0,
        name: "id",
        label: "id",
        classNames: "w-[20px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      media: {
        orderNumber: 1,
        name: "media",
        label: "media",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      video: {
        orderNumber: 2,
        name: "video",
        label: "video",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
      },
      type: {
        orderNumber: 3,
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

  const rawData = api.videoContent.all.useQuery({ sort, filter });
  const deleteRow = api.videoContent.delete.useMutation();
  const invalidate = utils.videoContent.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              media: { value: row.media.name },
              video: { value: row.video.name },
              type: { value: row.videoContentType.name },
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
        await deleteRow.mutateAsync(id);
        await invalidate();
      },
    } as TableViewProps;
  }, [rawData]);

  return <TableView {...mediaIndexProps}></TableView>;
}
