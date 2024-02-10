"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { articleScreen } from "@media/db";

import FormView from "~/app/_components/FormView/FormView";
import { useToast } from "~/app/_components/ui/use-toast";
import { api } from "~/utils/api";
import { title, uiSchema } from "../constants";

export default function Page() {
  const utils = api.useUtils();

  const route = api.articleScreenImage;
  const schema = articleScreen.articleScreenImagesInsertSchema;
  const util = utils.articleScreenImage;

  const invalidate = util.all.invalidate;
  type insetType = typeof schema;
  const form = useForm<z.infer<insetType>>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, error } = route.create.useMutation({
    async onSuccess() {
      await invalidate();
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<insetType>) => {
    try {
      const result = await mutateAsync(values);
      await invalidate();
      return result;
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Action not permited",
        description: "You can not save.",
      });
    }
  };

  return (
    <FormView
      type="add"
      title={title}
      form={form}
      onSubmit={onSubmit}
      uiSchema={uiSchema}
      zSchema={schema}
    />
  );
}
