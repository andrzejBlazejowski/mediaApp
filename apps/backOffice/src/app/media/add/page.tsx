"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { media } from "@media/db";

import FormView from "~/app/_components/FormView/FormView";
import {
  InputTypes,
  IuiSchema,
} from "~/app/_components/FormView/FormView.types";

export default function Page() {
  const form = useForm<z.infer<typeof media.mediasInsertSchema>>({
    resolver: zodResolver(media.mediasInsertSchema),
  });

  function onSubmit(values: z.infer<typeof media.mediasInsertSchema>) {
    console.log(values);
  }

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
  } as unknown as IuiSchema;

  return <FormView type="add" onSubmit={onSubmit} uiSchema={uiSchema} />;
}
