import React from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";

import { useLookup } from "~/app/_lib/hooks/useLookup";
import { useMediaList } from "~/app/media/list/useMediaList";
import { api } from "~/utils/api";
import { TableView } from "../TableView";

export function MediaListLookup({
  invalidate,
  id,
  mainKey,
}: {
  invalidate: any;
  id: number;
  mainKey: string;
}) {
  const LinkRoute = api.mediaListMedia;
  const title = "manage Media Lists";

  const { lookupData, setLookupData, onSaveLookupLinks } = useLookup({
    key: mainKey,
    lookupKey: "mediaListId",
    id: id.toString(),
    route: LinkRoute,
    invalidate,
  });

  const { mediaIndexProps } = useMediaList({
    isLookupMode: true,
    defaultValues: lookupData,
    setLookupData,
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft">{title}</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: "80%" }}>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={onSaveLookupLinks}>Save</Button>
          </Dialog.Close>
        </Flex>
        <Dialog.Title>{title}</Dialog.Title>
        <TableView {...mediaIndexProps} />
      </Dialog.Content>
    </Dialog.Root>
  );
}
