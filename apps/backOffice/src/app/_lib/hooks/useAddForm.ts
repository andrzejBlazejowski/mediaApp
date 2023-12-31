import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ZodType } from "zod";

import { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { api } from "~/utils/api";

interface Props<InsertSchemaType extends ZodType<any, any, any>> {
  insertSchema: InsertSchemaType;
  title?: string;
  uiSchema: IuiSchema;
  invalidate: () => Promise<void>;
  mutateAsync: (values: z.infer<InsertSchemaType>) => Promise<any>;
}

export function useAddForm<InsertSchemaType extends ZodType<any, any, any>>({
  insertSchema,
  title,
  uiSchema,
  invalidate,
  mutateAsync,
}: Props<InsertSchemaType>) {
  const utils = api.useUtils();
  const type = "add";

  const form = useForm<z.infer<InsertSchemaType>>({
    resolver: zodResolver(insertSchema),
  });

  const onSubmit = async (values: z.infer<InsertSchemaType>) => {
    const result = await mutateAsync(values);
    await invalidate();
    return result;
  };
  return { onSubmit, form, type, title, uiSchema, zSchema: insertSchema };
}
