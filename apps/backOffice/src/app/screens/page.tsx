"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.screen.all.useQuery();
  const deleteRow = api.screen.delete.useMutation();
  const invalidate = utils.screen.all.invalidate;
  const headersConfig = {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[100px]",
      sortable: true,
    },
    name: {
      orderNumber: 1,
      name: "name",
      label: "name",
      classNames: "w-[100px]",
      sortable: true,
    },
    type: {
      orderNumber: 2,
      name: "type",
      label: "type",
      classNames: "w-[100px]",
      sortable: true,
    },
    article: {
      orderNumber: 3,
      name: "article",
      label: "article",
      classNames: "w-[100px]",
      sortable: true,
    },
    vod: {
      orderNumber: 4,
      name: "vod",
      label: "vod",
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
              name: { value: row.name ?? row.id },
              type: {
                value: row?.screenType?.name ?? row?.screenType?.id ?? "",
              },
              vod: { value: row?.vodScreen?.name ?? "" },
              article: { value: row?.articleScreen?.name ?? "" },
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
