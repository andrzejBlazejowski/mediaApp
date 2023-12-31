"use client";

import { FormView } from "~/app/_components/";
import { useAddForm } from "~/app/_lib/";
import { api } from "~/utils/api";
import { formConfig } from "../constants";

export default function Page() {
  const utils = api.useUtils();
  const invalidate = utils.videoContent.all.invalidate;

  const { mutateAsync, error } = api.videoContent.create.useMutation({
    async onSuccess() {
      await invalidate();
    },
  });

  const form = useAddForm({
    ...formConfig,
    invalidate,
    mutateAsync,
  });

  return <FormView {...form} />;
}
