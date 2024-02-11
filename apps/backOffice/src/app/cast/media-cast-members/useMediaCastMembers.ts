"use client";

import { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes } from "~/app/_components/TableView";
import { useToast } from "~/app/_components/ui/use-toast";
import { useFilter, useHeadersConfig, useSort } from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import { title } from "./constants";

export const useMediaCastMembers = (isLookupMode = false) => {
  const utils = api.useUtils();

  const { toast } = useToast();

  const initialHeadersConfig = useMemo(
    () => ({
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

  const rawData = api.mediaCastMember.all.useQuery({ sort, filter });
  const deleteRow = api.mediaCastMember.delete.useMutation();
  const invalidate = utils.mediaCastMember.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              mediaId: { value: row.media.name },
              castMemberId: { value: row.castMember.id.toString() },
            };
          });
    return {
      title: title + " list",
      data: data,
      headersConfig,
      isLookupMode,
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

  return { mediaIndexProps };
};
