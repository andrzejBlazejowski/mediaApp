import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

export interface FormViewProps {
  type: "add" | "edit";
  title?: string;
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  uiSchema: IuiSchema;
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
}
