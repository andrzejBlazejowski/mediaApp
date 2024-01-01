"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { media } from "@media/db";

import FormView from "~/app/_components/FormView/FormView";
import { uiSchema } from "../media.constants";

export default function Page() {
  const form = useForm<z.infer<typeof media.mediasInsertSchema>>({
    resolver: zodResolver(media.mediasInsertSchema),
  });

  function onSubmit(values: z.infer<typeof media.mediasInsertSchema>) {
    console.log(values);
  }

  return (
    <FormView type="add" form={form} onSubmit={onSubmit} uiSchema={uiSchema} />
  );
}
