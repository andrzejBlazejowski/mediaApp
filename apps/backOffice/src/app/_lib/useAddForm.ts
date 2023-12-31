import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ZodType } from "zod";

import { IuiSchema } from "~/app/_components/FormView/FormView.types";
import { api } from "~/utils/api";

interface Props<InsertSchemaType> {
  insertSchema: InsertSchemaType;
  title?: string;
  uiSchema: IuiSchema;
}

export function useAddForm<InsertSchemaType extends ZodType<any, any, any>>({
  insertSchema,
  title,
  uiSchema,
}: Props<InsertSchemaType>) {
  const utils = api.useUtils();
  const type = "add";

  const form = useForm<z.infer<InsertSchemaType>>({
    resolver: zodResolver(insertSchema),
  });

  const { mutateAsync, error } = api.videoContent.create.useMutation({
    async onSuccess() {
      await utils.videoContent.all.invalidate();
    },
  });

  const onSubmit = async (values: z.infer<InsertSchemaType>) => {
    const result = await mutateAsync(values);
    await utils.videoContent.all.invalidate();
    return result;
  };

  return { onSubmit, form, type, title, uiSchema, zSchema: insertSchema };
}
