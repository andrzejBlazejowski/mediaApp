"use client";

import React, { useMemo } from "react";

import type { TableViewProps } from "~/app/_components/TableView";
import { TableView } from "~/app/_components/TableView";
import { api } from "~/utils/api";
import { title } from "./constants";

export default function Page() {
  const utils = api.useUtils();

  const rawData = api.castMember.all.useQuery();
  const deleteRow = api.castMember.delete.useMutation();
  const invalidate = utils.castMember.all.invalidate;
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
    lastName: {
      orderNumber: 2,
      name: "lastName",
      label: "lastName",
      classNames: "w-[100px]",
      sortable: true,
    },
    role: {
      orderNumber: 3,
      name: "role",
      label: "role",
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
              firstName: { value: row.person?.firstName },
              lastName: { value: row.person?.lastName },
              role: { value: row.castRole?.name },
              id: { value: row.id.toString() },
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
