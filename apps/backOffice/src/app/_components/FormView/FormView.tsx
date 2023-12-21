import React from "react";

import { media } from "@media/db";

import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { hiddenFeilds } from "./FormView.constants";
import { FormViewProps, IFeield } from "./FormView.types";
import { FormViewItem } from "./FormViewItem";

export default function FormView({
  type,
  onSubmit,
  uiSchema,
  title,
  form,
}: FormViewProps) {
  return (
    <Form {...form}>
      <h1>{title || type}</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.entries(media.mediasInsertSchema.shape).map(([key]) => {
          if (hiddenFeilds.includes(key)) {
            return null;
          }

          return (
            <FormField
              control={form.control}
              name={key}
              render={({ field }) => {
                const ui = uiSchema[field.name];
                const classes =
                  typeof ui !== "undefined" && typeof ui.classes === "string"
                    ? ui.classes
                    : "";
                return FormViewItem(field as unknown as IFeield, classes);
              }}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
