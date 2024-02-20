import React from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";

import { useLookup } from "~/app/_lib/hooks/useLookup";
import { useVideoContents } from "~/app/media/video-contents/useVideoContents";
import { api } from "~/utils/api";
import { TableView } from "../TableView";

export function VideoContentLookup({
  invalidate,
  id,
  mainKey,
}: {
  invalidate: any;
  id: number;
  mainKey: string;
}) {
  const title = "manage video contents";
  const LinkRoute = api.videoContent;
  const lookupKey = "videoId";

  const { lookupData, setLookupData, onSaveLookupLinks } = useLookup({
    key: mainKey,
    lookupKey,
    id: id.toString(),
    route: LinkRoute,
    invalidate,
  });

  const { mediaIndexProps } = useVideoContents({
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
