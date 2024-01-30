import React from "react";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";

import { SortTypes } from "../TableView.types";

export function SortIcon({ sortDirection }: { sortDirection: SortTypes }) {
  switch (sortDirection) {
    case SortTypes.Asc:
      return <ArrowUpNarrowWide />;
    case SortTypes.Desc:
      return <ArrowDownNarrowWide />;
    case SortTypes.None:
    default:
      return <ArrowDownUp />;
  }
}
