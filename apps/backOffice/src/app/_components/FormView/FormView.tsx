import React, { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";

import { FormFieldItem } from "../FormFieldItem";
import { Form } from "../ui/form";
import { hiddenFeilds } from "./FormView.constants";
import type { FormViewProps } from "./FormView.types";

export default function FormView({
  type,
  onSubmit,
  uiSchema,
  zSchema,
  title,
  form,
  children,
}: FormViewProps) {
  const pathname = usePathname();
  const Router = useRouter();
  const zShape = Object.entries(zSchema.shape);
  const isAddForm = type === "add";

  const goBack = useCallback(() => {
    if (isAddForm) {
      const desiredPath = pathname.replace("/add", "");
      Router.push(desiredPath);
    } else if (type === "edit") {
      const desiredPath = pathname.split("/edit")[0]!;
      Router.push(desiredPath);
    }
  }, [pathname, Router]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const onValidSubmit = useCallback(
    async (data: any) => {
      if (isAddForm) {
        data.createdAt = new Date();
        data.createdBy = "1";
      }
      data.updatedAt = new Date();
      data.updatedBy = "1";
      data.isDeleted = false;

      if (onSubmit) {
        try {
          const result = await onSubmit(data);
          if (result) goBack();
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
            <FormFieldItem
              uiSchema={uiSchema}
              key={key}
              name={key}
              form={form}
            />
          );
        })}

        <div className="flex justify-around ">
          <Button type="submit">Submit</Button>
          {children && children}
        </div>
      </form>
    </Form>
  );
}
