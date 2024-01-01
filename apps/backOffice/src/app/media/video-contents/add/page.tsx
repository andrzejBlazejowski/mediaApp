"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { media } from "@media/db";

import FormView from "~/app/_components/FormView/FormView";
import { api } from "~/utils/api";
import { uiSchema } from "../videoContents.constants";

export default function Page() {
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof media.videoContentsInsertSchema>>({
    resolver: zodResolver(media.videoContentsInsertSchema),
  });

  const { mutateAsync, error } = api.videoContent.create.useMutation({
    async onSuccess() {
      await utils.videoContent.all.invalidate();
    },
  });

  const onSubmit = async (
    values: z.infer<typeof media.videoContentsInsertSchema>,
  ) => {
    const result = await mutateAsync(values);
    await utils.videoContent.all.invalidate();
    return result;
  };

  return (
    <FormView
      type="add"
      title="Video Content"
      form={form}
      onSubmit={onSubmit}
      uiSchema={uiSchema}
      zSchema={media.videoContentsInsertSchema}
    />
  );
}
