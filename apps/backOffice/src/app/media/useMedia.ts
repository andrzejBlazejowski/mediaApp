import type { Dispatch } from "react";
import { useMemo } from "react";

import { InputTypes } from "~/app/_components/FormView/FormView.types";
import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes } from "~/app/_components/TableView";
import {
  useFilter,
  useHeadersConfig,
  useRedirectOnUnauthorized,
  useSort,
} from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import { title, uiSchema } from "./constants";

export const useMedia = ({
  isLookupMode = false,
  defaultValues = [],
  setLookupData,
}: {
  isLookupMode?: boolean;
  defaultValues?: number[];
  setLookupData?: Dispatch<any>;
}) => {
  const utils = api.useUtils();

  const initialHeadersConfig = useMemo(
    () => ({
      id: {
        orderNumber: 0,
        name: "id",
        label: "id",
        classNames: "w-[100px]",
        sortable: true,
        sortDirection: SortTypes.None,
      },
      name: {
        orderNumber: 1,
        name: "name",
        label: "name",
        classNames: "w-[100px]",
        sortable: true,
        sortDirection: SortTypes.None,
      },
      type: {
        orderNumber: 2,
        name: "type",
        label: "Type",
        classNames: "w-[50px]",
        sortable: true,
        filterable: false,
        sortDirection: SortTypes.None,
      },
      isFree: {
        orderNumber: 3,
        name: "isFree",
        label: "IsFree",
        classNames: "w-[50px]",
        sortable: false,
        type: InputTypes.checkbox,
        sortDirection: SortTypes.None,
      },
      category: {
        orderNumber: 4,
        name: "category",
        label: "Category",
        classNames: "w-[100px]",
        sortable: true,
        foreignKey: "mediaCategoryId",
        sortDirection: SortTypes.None,
        type: InputTypes.foreignKey,
      },
    }),
    [],
  );

  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();

  const rawData = api.media.all.useQuery({ sort, filter });
  const deleteRow = api.media.delete.useMutation();
  const invalidate = utils.media.all.invalidate;
  useRedirectOnUnauthorized(rawData);

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              name: { value: row.name ?? "" },
              type: { value: row.type ?? "" },
              isFree: { value: row.isFree.toString() ?? "" },
              category: { value: row.mediaCategory.name ?? "" },
            };
          });
    return {
      title: title + " list",
      data: data,
      headersConfig,
      uiSchema: uiSchema,

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
          alert("You can not delete.");
        }
      },
    } as TableViewProps;
  }, [rawData, headersConfig]);

  return { mediaIndexProps };
};
