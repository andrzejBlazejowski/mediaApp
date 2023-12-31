"use client";

import {FormView} from "~/app/_components/";
import { useEditForm } from "~/app/_lib/";
import { formConfig } from "../../constants";

export default function Page() {
  const form = useEditForm(formConfig);

  return <FormView {...form} />;
}
