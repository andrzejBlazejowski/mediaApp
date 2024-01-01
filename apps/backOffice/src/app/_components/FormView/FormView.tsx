import React, { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { hiddenFeilds } from "./FormView.constants";
import { FormViewProps, IFeield } from "./FormView.types";
import { FormViewItem } from "./FormViewItem";

export default function FormView({
  type,
  onSubmit,
  uiSchema,
  zSchema,
  title,
  form,
}: FormViewProps) {
  const pathname = usePathname();
  const Router = useRouter();
  const zShape = Object.entries(zSchema.shape);

  const goBack = useCallback(() => {
    if (type === "add") {
      const desiredPath = pathname.replace("/add", "");
      Router.push(desiredPath);
    } else if (type === "edit") {
      const desiredPath = pathname.split("/edit")[0] as string;
      Router.push(desiredPath);
    }
  }, [pathname, Router]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const onValidSubmit = useCallback(
    async (data: any) => {
      if (type === "add") {
        data.createdAt = new Date();
        data.createdBy = "1";
      }
      data.updatedAt = new Date();
      data.updatedBy = "1";
      data.isDeleted = false;

      if (onSubmit) {
        try {
          const result = await onSubmit(data);
          goBack();
        } catch (error) {
          alert("Error submitting data.");
        }
      } else {
        goBack();
      }
    },
    [onSubmit, type, goBack],
  );

  return (
    <Form {...form}>
      <div className="mb-4 flex items-center justify-evenly">
        <Button className=" ml-6" onClick={onBack}>
          <ArrowLeft />
          Back
        </Button>
        <h2 className="mt-6 scroll-m-20 border-b pb-2 text-center text-3xl font-semibold tracking-tight first:mt-0">
          {title}
          {type && title && " - "}
          {type}
        </h2>
      </div>
      <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-8">
        {zShape.map(([key]) => {
          if (hiddenFeilds.includes(key)) {
            return null;
          }
          return (
            <FormField
              control={form.control}
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
                  register: form.register,
                });
              }}
            />
          );
        })}
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
