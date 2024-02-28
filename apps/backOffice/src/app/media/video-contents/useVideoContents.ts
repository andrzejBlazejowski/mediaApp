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
import { title } from "../constants";

export const useVideoContents = ({
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
        foreignKey: "mediaId",
        type: InputTypes.foreignKey,
      },
      video: {
        orderNumber: 2,
        name: "video",
        label: "video",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "videoId",
        type: InputTypes.foreignKey,
      },
      type: {
        orderNumber: 3,
        name: "type",
        label: "type",
        classNames: "w-[100px]",
        sortable: true,

        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "videoContentTypeId",
        type: InputTypes.foreignKey,
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
  useRedirectOnUnauthorized(rawData);

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              media: { value: row.media?.name },
              video: { value: row.video?.name },
              type: { value: row.videoContentType?.name },
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
  }, [rawData]);

  return { mediaIndexProps };
};
