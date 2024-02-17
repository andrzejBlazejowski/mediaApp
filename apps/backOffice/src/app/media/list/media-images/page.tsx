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

export default function Page() {
  const utils = api.useUtils();

  const { toast } = useToast();

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
  useRedirectOnUnauthorized(mediaImages);

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
      headersConfig,
    } as TableViewProps;
  }, [mediaImages]);

  return <TableView {...mediaIndexProps}></TableView>;
}
