"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.brandingImage.all.useQuery();
  const deleteRow = api.brandingImage.delete.useMutation();
  const invalidate = utils.brandingImage.all.invalidate;
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
      orderNumber: 0,
      name: "type",
      label: "type",
      classNames: "w-[100px]",
      sortable: true,
    },
    branding: {
      orderNumber: 0,
      name: "branding",
      label: "branding",
      classNames: "w-[100px]",
      sortable: true,
    },
    image: {
      orderNumber: 0,
      name: "image",
      label: "image",
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
      onDeleteRow: async (id) => {
        await deleteRow.mutateAsync(id);
        await invalidate();
      },
    } as TableViewProps;
  }, [rawData]);

  return <TableView {...mediaIndexProps}></TableView>;
}
