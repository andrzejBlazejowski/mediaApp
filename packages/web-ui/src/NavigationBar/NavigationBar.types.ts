import { ComponentVariants } from "../types";

export type NavigationItems = RootNavigationItem[];

export type RootNavigationItem = NavigationItem & {
  childs?: NavigationItems;
};

//TODO: change icons
export type NavigationIcons = "add" | "edit" | "delete" | "search" | "filter";

export type NavigationItem = {
  id: string;
  name: string;
  icon?: NavigationIcons;
  disabled?: boolean;
  variant?: ComponentVariants;
  expandable?: boolean;
  href?: string;
  onClick?: () => {};
  expanded?: boolean;
};

export interface NavigationBarProps {
  variant?: ComponentVariants;
  items: NavigationItems;
}
