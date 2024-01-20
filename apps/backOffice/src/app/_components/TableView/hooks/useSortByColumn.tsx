import { useCallback } from "react";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";

import { SortTypes } from "../TableView.types";

export const useSortByColumn = (
  onSortByColumn?: (column: string, sortDirection: SortTypes) => void,
) => {
  const toggleSortValue = useCallback((sortDirection: SortTypes) => {
    switch (sortDirection) {
      case SortTypes.Asc:
        return SortTypes.Desc;
      case SortTypes.None:
      case SortTypes.Desc:
      default:
        return SortTypes.Asc;
    }
  }, []);

  const sortByColumn = useCallback(
    ({
      name,
      sortDirection,
      sortable,
    }: {
      name: string;
      sortDirection: SortTypes;
      sortable?: boolean;
    }) => {
      if (sortable && onSortByColumn) {
        onSortByColumn(name, toggleSortValue(sortDirection));
      }
    },
    [onSortByColumn, toggleSortValue],
  );

  return sortByColumn;
};
