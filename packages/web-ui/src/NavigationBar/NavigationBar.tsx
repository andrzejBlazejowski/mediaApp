import React from "react";

import NavigationItems from "./components/NavigationItems";
import { NavigationBarProps } from "./NavigationBar.types";

export function NavigationBar({ items, variant }: NavigationBarProps) {
  return (
    <nav className="relative z-10 flex max-w-max flex-1 items-center justify-center">
      <div>{<NavigationItems items={items} variant={variant} />}</div>
    </nav>
  );
}
