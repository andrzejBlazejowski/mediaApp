import type { Dispatch } from "react";
import { useMemo } from "react";

import { InputTypes } from "~/app/_components/FormView/FormView.types";
import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes } from "~/app/_components/TableView";
import { useToast } from "~/app/_components/ui/use-toast";
import { useFilter, useHeadersConfig, useSort } from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import { title } from "../constants";

export const useMediaList = ({
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

        sortable: true,

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
      description: {
        orderNumber: 2,
        name: "description",
        label: "description",
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

  const rawData = api.mediaList.all.useQuery({ sort, filter });
  const deleteRow = api.mediaList.delete.useMutation();
  const invalidate = utils.mediaList.all.invalidate;

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              name: { value: row.name },
              description: { value: row.description },
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
