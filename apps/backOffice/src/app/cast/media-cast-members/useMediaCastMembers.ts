"use client";

import type { Dispatch } from "react";
import { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes } from "~/app/_components/TableView";
import { useToast } from "~/app/_components/ui/use-toast";
import { useFilter, useHeadersConfig,useRedirectOnUnauthorized, useSort } from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import { title } from "./constants";

export const useMediaCastMembers = ({
  isLookupMode = false,
  defaultValues = [],
  setLookupData,
}: {
  isLookupMode?: boolean;
  defaultValues?: number[];
  setLookupData?: Dispatch<any>;
}) => {
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
      media: {
        orderNumber: 1,
        name: "media",
        label: "media",
        classNames: "w-[100px]",
        foreginKey: "mediaId",
        sortable: true,
        filterable: true,
        sortDirection: SortTypes.None,
      },
      castMember: {
        orderNumber: 2,
        name: "castMember",
        label: "cast member",
        classNames: "w-[100px]",
        foreginKey: "castMemberId",
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
  useRedirectOnUnauthorized(rawData);

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              mediaId: { value: row.media?.name ?? "" },
              castMemberId: {
                value: `${row.castMember?.person?.firstName || ""} ${
                  row.castMember?.person?.lastName || ""
                }`,
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
      isLookupMode,
      defaultValues,
      setLookupData,

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
