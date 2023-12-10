import React from "react";

import { NavigationBarProps } from "../NavigationBar.types";
import NavigationItem from "./NavigationItem";

export default function NavigationItems({
  items,
  variant,
}: NavigationBarProps) {
  return (
    <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
      {items.map((item) => {
        return (
          <NavigationItem
            {...item}
            defaultVariant={variant}
            expandable={!!item.childs}
          />
        );
      })}
    </ul>
  );
}
