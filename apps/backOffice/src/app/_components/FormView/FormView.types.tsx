import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { AnyZodObject } from "zod";

export interface FormViewProps {
  type: "add" | "edit";
  title?: string;
  form: UseFormReturn<any>;
  onSubmit: (values: any) => any;
  uiSchema: IuiSchema;
  zSchema: AnyZodObject;
}

export type IuiSchema = Record<string, { classes: string; type: InputTypes }>;

export type IFeield = ControllerRenderProps<Record<string, string>, string>;

export enum InputTypes {
  text = "text",
  textArea = "textArea",
  foreignKey = "foreignKey",
  date = "date",
  image = "image",
  colorPicker = "colorPicker",
  checkbox = "checkbox",
  number = "number",
}
