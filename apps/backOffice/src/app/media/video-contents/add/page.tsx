"use client";

import FormView from "~/app/_components/FormView/FormView";
import { useAddForm } from "~/app/_lib/useAddForm";
import { formConfig } from "../constants";

export default function Page() {
  const form = useAddForm(formConfig);

  return <FormView {...form} />;
}
