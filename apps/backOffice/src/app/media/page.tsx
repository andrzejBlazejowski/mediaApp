"use client";

import React, { useMemo } from "react";

import { api } from "~/utils/api";
import type { TableViewProps } from "../_components/TableView";
import { TableView } from "../_components/TableView";

export default function Page() {
  const medias = api.media.all.useQuery();

  const mediaIndexProps = useMemo(() => {
    const data =
      !medias.data || medias.data.length === 0
        ? []
        : medias.data.map((media) => {
            return {
              name: { value: media.name },
              type: { value: media.type },
              isFree: {
                value: media.isFree.toString(),
              },
              category: {
                value: media.mediaCategoryId.toString(),
              },
            };
          });

    return {
      title: "media list",
      data: data,
      headersConfig: {
        name: {
          orderNumber: 0,
          name: "name",
          label: "Name",
          classNames: "w-[100px]",
          sortable: true,
        },
        type: {
          orderNumber: 0,
          name: "type",
          label: "Type",
          classNames: "w-[50px]",
          sortable: true,
        },
        isFree: {
          orderNumber: 0,
          name: "isFree",
          label: "IsFree",
          classNames: "w-[50px]",
          sortable: true,
        },
        category: {
          orderNumber: 0,
          name: "Category",
          label: "Category",
          classNames: "w-[100px]",
          sortable: true,
        },
      },
    } as TableViewProps;
  }, []);

  return <TableView {...mediaIndexProps}></TableView>;
}
