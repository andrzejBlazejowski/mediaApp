import { ComponentTypes, ComponentVariants } from "../types";

export type ButtonLayouts =
  | "plain-text"
  | "icon-text"
  | "icon"
  | "icon-rounded";

export type ButtonIcons = "add" | "edit" | "delete" | "search" | "filter";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ComponentVariants;
  type?: ComponentTypes;
  layout?: ButtonLayouts;
  icon?: ButtonIcons;
  disabled?: boolean;
}
