"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { purchase } from "@media/db";

import FormView from "~/app/_components/FormView/FormView";
import { api } from "~/utils/api";
import { title, uiSchema } from "../constants";

export default function Page() {
  const utils = api.useUtils();

  const schema = purchase.purchaseItemsInsertSchema;
  const route = api.purchaseItem;
  const util = utils.purchaseItem;

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

  const onSubmit = async (values: z.infer<insetType>) => {
    const result = await mutateAsync(values);
    await invalidate();
    return result;
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