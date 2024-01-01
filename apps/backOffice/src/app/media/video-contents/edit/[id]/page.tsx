"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { media } from "@media/db";

import FormView from "~/app/_components/FormView/FormView";
import { api } from "~/utils/api";
import { uiSchema } from "../../constants";

export default function Page() {
  const routeParams = useParams<{ id: string }>();
  const id = useMemo(() => parseInt(routeParams.id), [routeParams.id]);
  const videoContent = api.videoContent.byId.useQuery({ id });
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof media.videoContentsInsertSchema>>({
    resolver: zodResolver(media.videoContentsInsertSchema),
  });

  useEffect(() => {
    if (videoContent.data) form.reset(videoContent.data);
  }, [videoContent.data]);

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
      type="edit"
      title="Video Content"
      form={form}
      onSubmit={onSubmit}
      uiSchema={uiSchema}
      zSchema={media.videoContentsInsertSchema}
    />
  );
}
