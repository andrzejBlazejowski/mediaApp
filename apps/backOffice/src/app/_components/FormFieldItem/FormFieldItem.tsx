import React from "react";
import { UseFormReturn } from "react-hook-form";

import { IFeield, IuiSchema } from "../FormView/FormView.types";
import { FormViewItem } from "../FormViewItem";
import { FormField } from "../ui/form";

export function FormFieldItem({
  uiSchema,
  key,
  form,
}: {
  uiSchema: IuiSchema;
  key: string;
  form?: UseFormReturn<any>;
}) {
  return (
    <FormField
      {...(typeof form !== "undefined" ? { control: form.control } : {})}
      name={key}
      key={key}
      render={({ field }) => {
        const ui = uiSchema[field.name];
        const classes =
          typeof ui !== "undefined" && typeof ui.classes === "string"
            ? ui.classes
            : "";
        return FormViewItem({
          field: field as unknown as IFeield,
          classes: classes,
          type: uiSchema[field.name]?.type,
          register: form?.register,
        });
      }}
    />
  );
}
