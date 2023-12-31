import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
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

export function useEditForm<InsertSchemaType extends ZodType<any, any, any>>({
  insertSchema,
  title,
  uiSchema,
}: Props<InsertSchemaType>) {
  const type = "edit";
  const routeParams = useParams<{ id: string }>();
  const id = useMemo(() => parseInt(routeParams.id), [routeParams.id]);
  const videoContent = api.videoContent.byId.useQuery({ id });
  const utils = api.useUtils();

  const form = useForm<z.infer<InsertSchemaType>>({
    resolver: zodResolver(insertSchema),
  });

  useEffect(() => {
    if (videoContent.data) form.reset(videoContent.data);
  }, [videoContent.data]);

  const { mutateAsync, error } = api.videoContent.update.useMutation({
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
