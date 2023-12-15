import React from "react";

import { api } from "~/utils/api";
import { TableView } from "../_components/TableView";

export default function page() {
  const mediaIndexProps = {
    title: "media list",
    data: [],
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
  };
  const [medias] = api.media.all.useSuspenseQuery();
  return <TableView {...mediaIndexProps} />;
}
