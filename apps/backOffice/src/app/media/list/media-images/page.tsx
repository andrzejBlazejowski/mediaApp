"use client";

import React, { useMemo } from "react";

import { useFilter, useHeadersConfig, useSort } from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import type { TableViewProps } from "../../../_components/TableView";
import { SortTypes, TableView } from "../../../_components/TableView";

export default function Page() {
  const utils = api.useUtils();
  const initialHeadersConfig = useMemo(
    () => ({
      name: {
        orderNumber: 0,
        name: "name",
        label: "name",
        classNames: "w-[100px]",
        filterable: true,
        sortable: true,
        sortDirection: SortTypes.None,
      },
      mediaId: {
        orderNumber: 1,
        name: "mediaId",
        label: "mediaId",
        classNames: "w-[100px]",
        filterable: true,
        sortable: true,
        sortDirection: SortTypes.None,
      },
      imageId: {
        orderNumber: 2,
        name: "imageId",
        label: "imageId",
        classNames: "w-[100px]",
        filterable: true,
        sortable: true,
        sortDirection: SortTypes.None,
      },
    }),
    [],
  );

  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();

  const mediaImages = api.mediaImage.all.useQuery({ sort, filter });
  const deleteRow = api.mediaImage.delete.useMutation();
  const invalidate = utils.mediaImage.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !mediaImages.data || mediaImages.data.length === 0
        ? []
        : mediaImages.data.map((mediaImage) => {
            return {
              name: { value: mediaImage.name },
              mediaId: { value: mediaImage.mediaId.toString() },
              imageId: { value: mediaImage.imageId.toString() },
            };
          });
    return {
      title: "medias list media images",
      data: data,
      onSortByColumn,
      onFilter,
      onFilterClear,

      onDeleteRow: async (id) => {
        await deleteRow.mutateAsync(id);
        await invalidate();
      },
      headersConfig,
    } as TableViewProps;
  }, [mediaImages]);

  return <TableView {...mediaIndexProps}></TableView>;
}
