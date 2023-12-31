"use client";

import FormView from "~/app/_components/FormView/FormView";
import { useEditForm } from "~/app/_lib/useEditForm";
import { formConfig } from "../../constants";

export default function Page() {
  const form = useEditForm(formConfig);

  return <FormView {...form} />;
}
