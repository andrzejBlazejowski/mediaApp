"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { useRedirectOnUnauthorized } from "../../_lib/hooks";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.menuLink.all.useQuery();
  const deleteRow = api.menuLink.delete.useMutation();
  const invalidate = utils.menuLink.all.invalidate;

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
    description: {
      orderNumber: 2,
      name: "description",
      label: "description",
      classNames: "w-[100px]",
      sortable: true,
    },
    menu: {
      orderNumber: 3,
      name: "menu",
      label: "menu",
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
              description: { value: row.description },
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
          toast({
            variant: "destructive",
            title: "Action not permited",
            description: "You can not delete.",
          });
        }
      },
    } as TableViewProps;
  }, [rawData]);

  return <TableView {...mediaIndexProps}></TableView>;
}
