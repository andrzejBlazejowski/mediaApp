"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.brandingColor.all.useQuery();
  const deleteRow = api.brandingColor.delete.useMutation();
  const invalidate = utils.brandingColor.all.invalidate;
  const headersConfig = {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[100px]",
      sortable: true,
    },
    value: {
      orderNumber: 1,
      name: "value",
      label: "value",
      classNames: "w-[100px]",
      sortable: true,
    },
    branding: {
      orderNumber: 2,
      name: "branding",
      label: "branding",
      classNames: "w-[100px]",
      sortable: true,
    },
    type: {
      orderNumber: 3,
      name: "type",
      label: "type",
      classNames: "w-[100px]",
      sortable: true,
    },
  };

  const mediaIndexProps = useMemo(() => {
    const data =
      !rawData.data || rawData.data.length === 0
        ? []
        : rawData.data.map((row) => {
            return {
              id: { value: row.id.toString() },
              values: { value: row.value },
              branding: {
                value: row?.branding?.name ?? row?.branding?.id ?? "",
              },
              type: {
                value:
                  row?.brandingColorType?.name ??
                  row?.brandingColorType?.name ??
                  "",
              },
            };
          });
    return {
      title: title + " list",
      data: data,
      headersConfig,
      onDeleteRow: async (id) => {
        await deleteRow.mutateAsync(id);
        await invalidate();
      },
    } as TableViewProps;
  }, [rawData]);

  return <TableView {...mediaIndexProps}></TableView>;
}
