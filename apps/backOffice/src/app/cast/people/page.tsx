"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.people.all.useQuery();
  const deleteRow = api.people.delete.useMutation();
  const invalidate = utils.people.all.invalidate;
  const headersConfig = {
    id: {
      orderNumber: 0,
      name: "id",
      label: "id",
      classNames: "w-[100px]",
      sortable: true,
    },
    firstName: {
      orderNumber: 1,
      name: "firstName",
      label: "firstName",
      classNames: "w-[100px]",
      sortable: true,
    },
    middleName: {
      orderNumber: 2,
      name: "middleName",
      label: "middleName",
      classNames: "w-[100px]",
      sortable: true,
    },
    lastName: {
      orderNumber: 3,
      name: "lastName",
      label: "lastName",
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
              firstName: { value: row.firstName },
              lastName: { value: row.lastName },
              middleName: { value: row.middleName },
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
