import { ComponentVariants } from "../types";

export type TextType =
  | "lead"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "base"
  | "sm"
  | "lg"
  | "xl"
  | "2xl";

export interface TextProps {
  variant?: ComponentVariants;
  children: React.ReactNode;
  type: TextType;
}
