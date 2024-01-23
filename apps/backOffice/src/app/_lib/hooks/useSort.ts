import { useCallback, useState } from "react";

import type { HeadersConfig } from "~/app/_components/TableView";
import { SortTypes } from "~/app/_components/TableView";

export function useSort(
  setHeadersConfig: React.Dispatch<React.SetStateAction<HeadersConfig>>,
) {
  const [sort, setSort] = useState<
    | {
        column: string;
        direction: "desc" | "asc";
      }[]
    | undefined
  >([]);

  const onSortByColumn = useCallback(
    (column: string, sortDirection: SortTypes) => {
      let direction: "asc" | "desc" = "asc";
      if (sortDirection === SortTypes.Asc) {
        direction = "desc";
      } else if (sortDirection === SortTypes.Desc) {
        direction = "asc";
      }
      setHeadersConfig((current) => {
        if (current?.[column]) {
          //@ts-expect-error
          current[column].sortDirection = sortDirection;
        }
        return current;
      });
      setSort([{ column, direction }]);
    },
    [setHeadersConfig, setSort],
  );

  return { sort, onSortByColumn };
}
