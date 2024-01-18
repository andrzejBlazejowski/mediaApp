import React, { useDeferredValue, useEffect } from "react";
import { Drawer } from "react-native-paper";
import { useRouter } from "expo-router";

import { useMenuData } from "~/app/hooks/";

export function Menu() {
  const router = useRouter();
  const { menuItems, title } = useMenuData();
  const deferredMenuItems = useDeferredValue(menuItems);

  useEffect(() => {
    if (deferredMenuItems.length === 0 && menuItems.length > 0) {
      const route = menuItems[0];
      route && router.replace(`/${route.segment}/${route.destinationId}`);
    }
  }, [menuItems, deferredMenuItems, router]);

  return (
    <Drawer.Section title={title}>
      {menuItems?.map((menuLink) => (
        <Drawer.CollapsedItem
          focusedIcon={{ uri: menuLink.url }}
          key={menuLink.id}
          label={menuLink.name}
          onPress={() =>
            router.push(`/${menuLink.segment}/${menuLink.destinationId}`)
          }
        />
      ))}
    </Drawer.Section>
  );
}
