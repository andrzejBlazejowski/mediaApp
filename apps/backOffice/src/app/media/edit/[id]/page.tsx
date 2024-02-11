"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { media } from "@media/db";

import FormView from "~/app/_components/FormView/FormView";
import { TableView } from "~/app/_components/TableView";
import { useToast } from "~/app/_components/ui/use-toast";
import { useMediaCastMembers } from "~/app/cast/media-cast-members/useMediaCastMembers";
import { api } from "~/utils/api";
import { title, uiSchema } from "../../constants";

export default function Page() {
  const utils = api.useUtils();

  const schema = media.mediasInsertSchema;
  const route = api.media;
  const util = utils.media;

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

  const { mediaIndexProps } = useMediaCastMembers(true);

  return (
    <FormView
      type="edit"
      title={title}
      form={form}
      onSubmit={onSubmit}
      uiSchema={uiSchema}
      zSchema={schema}
    >
      <>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="soft">manage cast members</Button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: "80%" }}>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button>Save</Button>
              </Dialog.Close>
            </Flex>
            <Dialog.Title>manage cast members</Dialog.Title>
            <TableView {...mediaIndexProps} />
          </Dialog.Content>
        </Dialog.Root>

        <Button variant="soft">manage video contents</Button>
        <Button variant="soft">manage images</Button>
        <Button variant="soft">manage media lists</Button>
      </>
    </FormView>
  );
}
