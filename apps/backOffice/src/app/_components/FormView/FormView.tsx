import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { media } from "@media/db";

import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { hiddenFeilds } from "./FormView.constants";
import { FormViewProps, IFeield } from "./FormView.types";
import { FormViewItem } from "./FormViewItem";

export default function FormView({ type, onSubmit, uiSchema }: FormViewProps) {
  const form = useForm<z.infer<typeof media.mediasInsertSchema>>({
    resolver: zodResolver(media.mediasInsertSchema),
  });

  return (
    <Form {...form}>
      <h1>{type}</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.entries(media.mediasInsertSchema.shape).map(([key]) => {
          if (hiddenFeilds.includes(key)) {
            return null;
          }

          return (
            <FormField
              control={form.control}
              //@ts-ignore
              name={key}
              render={({ field }) => {
                return FormViewItem(
                  field as unknown as IFeield,
                  //@ts-ignore
                  uiSchema[field.name] && uiSchema[field.name]?.classes
                    ? //@ts-ignore
                      uiSchema[field.name]?.clases
                    : "",
                );
              }}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
