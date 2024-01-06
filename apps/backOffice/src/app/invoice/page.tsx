"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.invoice.all.useQuery();
  const deleteRow = api.invoice.delete.useMutation();
  const invalidate = utils.invoice.all.invalidate;
  const headersConfig = {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[100px]",
      sortable: true,
    },
    type: {
      orderNumber: 1,
      name: "type",
      label: "type",
      classNames: "w-[100px]",
      sortable: true,
    },
    media: {
      orderNumber: 2,
      name: "media",
      label: "media",
      classNames: "w-[100px]",
      sortable: true,
    },
    user: {
      orderNumber: 3,
      name: "user",
      label: "user",
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
              type: {
                value:
                  row?.invoiceType?.name ?? row.invoiceTypeId.toString() ?? "",
              },
              media: { value: row?.media?.name ?? row.media.toString() ?? "" },
              user: { value: row?.user?.email ?? row?.userId ?? "" },
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
