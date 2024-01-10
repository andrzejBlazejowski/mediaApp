import React from "react";
import { Drawer } from "react-native-paper";
import { useRouter } from "expo-router";

import { useMenuData } from "~/app/hooks/";

export function Menu() {
  const router = useRouter();
  const { menuItems, title } = useMenuData();

  return (
    <Drawer.Section title={title}>
      {menuItems?.map((menuLink) => (
        <Drawer.CollapsedItem
          focusedIcon={{ uri: menuLink.url }}
          key={menuLink.id}
          label={menuLink.name}
          onPress={() => router.replace(`/vod/details/${menuLink.id}`)}
        />
      ))}
    </Drawer.Section>
  );
}
