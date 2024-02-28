"use client";

import React, { useMemo } from "react";

import { InputTypes } from "~/app/_components/FormView/FormView.types";
import type { TableViewProps } from "~/app/_components/TableView";
import { SortTypes, TableView } from "~/app/_components/TableView";
import {
  useFilter,
  useHeadersConfig,
  useRedirectOnUnauthorized,
  useSort,
} from "~/app/_lib/hooks";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

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

        filterable: true,
        sortDirection: SortTypes.None,
      },
      type: {
        orderNumber: 0,
        name: "type",
        label: "type",
        classNames: "w-[100px]",

        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "brandingImageTypeId",
        type: InputTypes.foreignKey,
      },
      branding: {
        orderNumber: 0,
        name: "branding",
        label: "branding",
        classNames: "w-[100px]",

        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "brandingId",
        type: InputTypes.foreignKey,
      },
      image: {
        orderNumber: 0,
        name: "image",
        label: "image",
        classNames: "w-[100px]",

        filterable: true,
        sortDirection: SortTypes.None,
        foreignKey: "imageId",
        type: InputTypes.foreignKey,
      },
    }),
    [],
  );
  const { headersConfig, setHeadersConfig } =
    useHeadersConfig(initialHeadersConfig);
  const { sort, onSortByColumn } = useSort(setHeadersConfig);
  const { filter, onFilter, onFilterClear } = useFilter();

  const rawData = api.brandingImage.all.useQuery({ sort, filter });
  const deleteRow = api.brandingImage.delete.useMutation();
  const invalidate = utils.brandingImage.all.invalidate;
  useRedirectOnUnauthorized(rawData);

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              name: { value: row.name },
              branding: {
                value: row?.branding?.name ?? row?.branding?.id ?? "",
              },
              type: {
                value:
                  row?.brandingImageType?.name ??
                  row?.brandingImageType?.id ??
                  "",
              },
              image: { value: row?.image?.name ?? row?.image?.id ?? "" },
            };
          });
    return {
      title: title + " list",
      data: data,
      headersConfig,

      onSortByColumn,
      onFilter,
      onFilterClear,

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

  return <TableView {...mediaIndexProps}></TableView>;
}
