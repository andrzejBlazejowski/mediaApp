"use client";

import React, { useMemo, useState } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { InputTypes } from "../_components/FormView/FormView.types";
import { title, uiSchema } from "./constants";

export default function Page() {
  const utils = api.useUtils();
  const [filter, setFilter] = useState<
    { value: string; column: string } | undefined
  >(undefined);
  const [sort, setSort] = useState<
    | {
        column: string;
        direction: "desc" | "asc";
      }[]
    | undefined
  >([]);

  const rawData = api.media.all.useQuery({ sort, filter });
  const deleteRow = api.media.delete.useMutation();
  const invalidate = utils.media.all.invalidate;
  const [headersConfig, setHeadersConfig] = useState({
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
      label: "Name",
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
      name: "Category",
      label: "Category",
      classNames: "w-[100px]",
      sortable: true,
      foreignKey: "mediaCategoryId",
      sortDirection: SortTypes.None,
      type: InputTypes.foreignKey,
    },
  });

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
      onSortByColumn: (column: string, sortDirection: SortTypes) => {
        console.log(`sort by column : ${column} direction : ${sortDirection}`);
        let direction: "asc" | "desc" = "asc";
        if (sortDirection === SortTypes.Asc) {
          direction = "desc";
        } else if (sortDirection === SortTypes.Desc) {
          direction = "asc";
        }
        setHeadersConfig((current) => {
          current[column].sortDirection = sortDirection;
          return current;
        });
        setSort([{ column, direction }]);
      },
      onFilter: (column: string, value: string) => {
        setFilter({ value, column });
      },
      onFilterClear: () => {
        setFilter(undefined);
      },
      onDeleteRow: async (id) => {
        await deleteRow.mutateAsync(id);
        await invalidate();
      },
    } as TableViewProps;
  }, [rawData, headersConfig]);

  return <TableView {...mediaIndexProps}></TableView>;
}
