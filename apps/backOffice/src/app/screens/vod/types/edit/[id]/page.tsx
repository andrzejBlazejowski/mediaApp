"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { vodScreen } from "@media/db";

import { api } from "~/utils/api";
import { title, uiSchema } from "../../constants";

export default function Page() {
  const utils = api.useUtils();

  const route = api.vodScreenType;
  const schema = vodScreen.vodScreenTypesInsertSchema;
  const util = utils.vodScreenType;

  const invalidate = util.all.invalidate;
  type insetType = typeof schema;
  const routeParams = useParams<{ id: string }>();
  const id = useMemo(() => parseInt(routeParams.id), [routeParams.id]);
  const rawData = route.byId.useQuery({ id });

  const form = useForm<z.infer<insetType>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (rawData.data) form.reset(rawData.data);
  }, [rawData.data]);

  const { mutateAsync, error } = route.update.useMutation({
    async onSuccess() {
      await invalidate();
    },
  });

  const onSubmit = async (values: z.infer<insetType>) => {
    try {
      const result = await mutateAsync(values);
      await invalidate();
      return result;
    } catch (e) {
      alert("You can not save.");
    }
  };

  return (
    <FormView
      type="edit"
      title={title}
      form={form}
      onSubmit={onSubmit}
      uiSchema={uiSchema}
      zSchema={schema}
    />
  );
}
