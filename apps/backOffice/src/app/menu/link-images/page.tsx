"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { useRedirectOnUnauthorized } from "../../_lib/hooks";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();
  const toast = useToast();

  const rawData = api.menuLinkImage.all.useQuery();
  const deleteRow = api.menuLinkImage.delete.useMutation();
  const invalidate = utils.menuLinkImage.all.invalidate;
  useRedirectOnUnauthorized(rawData);

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
    image: {
      orderNumber: 3,
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
              image: {
                value: row.imageId.toString() ?? "",
              },
            };
          });
    return {
      title: title + " list",
      data: data,
      headersConfig,
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
