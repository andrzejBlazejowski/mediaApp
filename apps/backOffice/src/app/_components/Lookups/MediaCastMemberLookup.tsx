import React from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";

import { useLookup } from "~/app/_lib/hooks/useLookup";
import { useCastMembers } from "~/app/cast/members/useCastMembers";
import { api } from "~/utils/api";
import { TableView } from "../TableView";

export function MediaCastMemberLookup({
  invalidate,
  id,
}: {
  invalidate: any;
  id: number;
}) {
  const key = "mediaId";
  const LinkRoute = api.mediaCastMember;

  const { lookupData, setLookupData, onSaveLookupLinks } = useLookup({
    key,
    lookupKey: "castMemberId",
    id: id.toString(),
    route: LinkRoute,
    invalidate,
  });

  const { mediaIndexProps } = useCastMembers({
    isLookupMode: true,
    defaultValues: lookupData,
    setLookupData,
  });

  return (
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
            <Button onClick={onSaveLookupLinks}>Save</Button>
          </Dialog.Close>
        </Flex>
        <Dialog.Title>manage cast members</Dialog.Title>
        <TableView {...mediaIndexProps} />
      </Dialog.Content>
    </Dialog.Root>
  );
}
