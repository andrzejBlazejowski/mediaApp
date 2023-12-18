import { ComponentTypes, ComponentVariants } from "../types";

export type ButtonLayouts =
  | "plain-text"
  | "icon-text"
  | "icon"
  | "icon-rounded"
  | "navigation"
  | "icon-navigation";

export type ButtonIcons =
  | "add"
  | "edit"
  | "delete"
  | "search"
  | "filter"
  | "chevronDown"
  | "chevronUp";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ComponentVariants;
  type?: ComponentTypes;
  layout?: ButtonLayouts;
  icon?: ButtonIcons;
  disabled?: boolean;
}
