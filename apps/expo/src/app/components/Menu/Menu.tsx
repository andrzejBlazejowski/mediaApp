import React, { useMemo } from "react";
import { Drawer } from "react-native-paper";
import { useRouter } from "expo-router";

import { api } from "~/utils/api";

export default function Menu() {
  const router = useRouter();
  const menuLinks = api.menuLink.all.useQuery();
  const menuItems = useMemo(
    () =>
      menuLinks?.data
        ? menuLinks.data.map((menuLink) => {
            return {
              name: menuLink.name ?? menuLink.id.toString(),
              id: menuLink.id,
            };
          })
        : [],
    [menuLinks],
  );
  return (
    <Drawer.Section title="title">
      {menuItems?.map((menuLink) => (
        <Drawer.CollapsedItem
          focusedIcon="inbox"
          unfocusedIcon="inbox-outline"
          key={menuLink.id}
          label={menuLink.name}
          onPress={() => router.replace("/article/1")}
        />
      ))}
    </Drawer.Section>
  );
}
