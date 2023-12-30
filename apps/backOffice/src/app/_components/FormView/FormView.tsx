import React, { MouseEventHandler, useCallback, useState } from "react";
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
  const [values, setValues] = useState(
    zShape.reduce(
      (acc, [key]) => {
        acc[key] = "";
        return acc;
      },
      {} as Record<string, any>,
    ),
  );

  const onBack = useCallback(() => {
    if (type === "add") {
      const desiredPath = pathname.replace("/add", "");
      Router.push(desiredPath);
    } else if (type === "edit") {
      const desiredPath = pathname.split("/edit")[0] as string;
      Router.push(desiredPath);
    }
  }, [pathname, Router]);

  const submit: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (type === "add") {
        values.createdAt = new Date().getTime();
        values.createdBy = 1;
      }
      values.updatedAt = new Date().getTime();
      values.updatedBy = 1;
      values.isDeleted = false;

      if (onSubmit) {
        const result = await onSubmit(values);
        debugger;
        if (result.name === "TRPCClientError"){

        }else if(result.name === "TRPCClientError"){
          alert("Error submitting data.");
        }
      } else {
        onBack();
      }
    },
    [onBack, values],
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {zShape.map(([key]) => {
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
                return FormViewItem({
                  field: field as unknown as IFeield,
                  classes: classes,
                  setValue: (nextValue) => {
                    setValues((prev) => {
                      return { ...prev, [key]: nextValue };
                    });
                  },
                });
              }}
            />
          );
        })}
        <Button type="submit" onClick={submit}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
