"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ControllerRenderProps } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { media } from "@media/db";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";

type IFeield = ControllerRenderProps<Record<string, string>, string>;
enum InputTypes {
  text = "text",
  textArea = "textArea",
  foreignKey = "foreignKey",
  date = "date",
  image = "image",
  colorPicker = "colorPicker",
  checkbox = "checkbox",
}

export default function Page() {
  const form = useForm<z.infer<typeof media.mediasInsertSchema>>({
    resolver: zodResolver(media.mediasInsertSchema),
  });

  function onSubmit(values: z.infer<typeof media.mediasInsertSchema>) {
    console.log(values);
  }

  const getTypeBasedOnZod = (zodType: string, zodObj: {}): string => {
    switch (zodType) {
      case "ZodNumber":
        return "number";
      case "ZodBoolean":
        return "checkbox";
      case "ZodOptional":
        //@ts-ignore
        return getTypeBasedOnZod(zodObj.innerType._def.typeName);
      case "ZodString":
        //@ts-ignore
        if (
          //@ts-ignore
          zodObj.checks.reduce(
            //@ts-ignore
            (accumulator, currentValue) => currentValue.max || accumulator,
            0,
          ) > 255
        )
          return "textArea";
        else return "input";
      default:
        return "input";
    }
  };

  const hiddenFeilds = [
    "isDeleted",
    "updatedBy",
    "updatedAt",
    "createdBy",
    "createdAt",
    "id",
  ];

  const uiSchema = {
    name: {
      clases: "w-1/4 ",
      type: InputTypes.text,
    },
    shortDescription: {
      clases: "w-1/2 ",
      type: InputTypes.textArea,
    },
    description: {
      clases: "w-1/2 ",
      type: InputTypes.textArea,
    },
    type: {
      clases: "w-1/4 ",
      type: InputTypes.foreignKey,
    },
    isFree: {
      clases: "w-1/4 ",
      type: InputTypes.checkbox,
    },
    mediaCategoyId: {
      clases: "w-1/4 ",
      type: InputTypes.foreignKey,
    },
  };

  const Item = (field: IFeield) => (
    <FormItem
      className={
        //@ts-ignore
        typeof uiSchema[field.name] === "string"
          ? //@ts-ignore
            uiSchema[field.name].clases
          : ""
      }
    >
      <FormLabel>{field.name}</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.entries(media.mediasInsertSchema.shape).map(([key, value]) => {
          if (hiddenFeilds.includes(key)) {
            return null;
          }

          return (
            <FormField
              control={form.control}
              //@ts-ignore
              name={key}
              render={({ field }) => Item(field as unknown as IFeield)}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
