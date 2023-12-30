"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { media } from "@media/db";

import FormView from "~/app/_components/FormView/FormView";
import { uiSchema } from "../../media.constants";

export default function Page() {
  const form = useForm<z.infer<typeof media.videoContentsInsertSchema>>({
    resolver: zodResolver(media.videoContentsInsertSchema),
  });

  function onSubmit(values: z.infer<typeof media.videoContentsInsertSchema>) {
    console.log(values);
  }

  return (
    <FormView
      type="edit"
      form={form}
      onSubmit={onSubmit}
      uiSchema={uiSchema}
      zSchema={media.videoContentTypesInsertSchema}
    />
  );
}
