"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { useSession } from "next-auth/react";

import { cn } from "~/app/_lib";
import { api } from "~/utils/api";
import { ThemeToggle } from "../ThemeToggle";
import { Toaster } from "../ui/toaster";

export type MenuComponents = Record<string, MenuComponent[]>;

export interface MenuComponent {
  title: string;
  href: string;
  description: string;
}

const menuItems: MenuComponents = {
  media: [
    {
      title: "media",
      href: "/media",
      description: "loream ipsum",
    },
    {
      title: "video contents",
      href: "/media/video-contents",
      description: "loream ipsum",
    },
    {
      title: "video content types",
      href: "/media/video-content-types",
      description: "loream ipsum",
    },
    {
      title: "media categoriess",
      href: "/media/media-categories",
      description: "loream ipsum",
    },
    {
      title: "media images",
      href: "/media/media-images",
      description: "loream ipsum",
    },
    {
      title: "media images types",
      href: "/media/media-image-types",
      description: "loream ipsum",
    },
    {
      title: "media view Impresions",
      href: "/media/media-view-impressions",
      description: "loream ipsum",
    },
    {
      title: "media list",
      href: "/media/list",
      description: "loream ipsum",
    },
    {
      title: "media list medias",
      href: "/media/list/medias",
      description: "loream ipsum",
    },
    {
      title: "media list medias type",
      href: "/media/list/medias-type",
      description: "loream ipsum",
    },
    {
      title: "video",
      href: "/video",
      description: "loream ipsum",
    },
    {
      title: "image",
      href: "/dictionary/image",
      description: "loream ipsum",
    },
  ],
  branding: [
    {
      title: "brandings",
      href: "/branding",
      description: "loream ipsum",
    },
    {
      title: "branding colors",
      href: "/branding/colors",
      description: "loream ipsum",
    },
    {
      title: "branding color types",
      href: "/branding/color-types",
      description: "loream ipsum",
    },
    {
      title: "branding images",
      href: "/branding/images",
      description: "loream ipsum",
    },
    {
      title: "branding image types",
      href: "/branding/image-types",
      description: "loream ipsum",
    },
  ],
  cast: [
    {
      title: "cast members",
      href: "/cast/members",
      description: "loream ipsum",
    },
    {
      title: "cast member images",
      href: "/cast/members-images",
      description: "loream ipsum",
    },
    {
      title: "cast roles",
      href: "/cast/roles",
      description: "loream ipsum",
    },
    {
      title: "media cast memberss",
      href: "/cast/media-cast-members",
      description: "loream ipsum",
    },
    {
      title: "people",
      href: "/cast/people",
      description: "loream ipsum",
    },
  ],
  screens: [
    {
      title: "screens",
      href: "/screens",
      description: "loream ipsum",
    },
    {
      title: "screens types",
      href: "/screens/types",
      description: "loream ipsum",
    },
    {
      title: "article screens",
      href: "/screens/article",
      description: "loream ipsum",
    },
    {
      title: "article ccreen images",
      href: "/screens/article/images",
      description: "loream ipsum",
    },
    {
      title: "vod screenss",
      href: "/screens/vod",
      description: "loream ipsum",
    },
    {
      title: "vod screen types",
      href: "/screens/vod/types",
      description: "loream ipsum",
    },
    {
      title: "vodScreenMediaLists",
      href: "/screens/vod/media-lists",
      description: "loream ipsum",
    },
  ],
  dictionary: [
    {
      title: "client app",
      href: "/dictionary/client-app",
      description: "loream ipsum",
    },
    {
      title: "back office",
      href: "/dictionary/back-app",
      description: "loream ipsum",
    },
    {
      title: "countries",
      href: "/dictionary/countries",
      description: "loream ipsum",
    },
    {
      title: "genres",
      href: "/dictionary/genres",
      description: "loream ipsum",
    },
    {
      title: "platforms",
      href: "/platforms",
      description: "loream ipsum",
    },
    {
      title: "platform menus",
      href: "/platforms/menu",
      description: "loream ipsum",
    },
  ],
  menu: [
    {
      title: "menu",
      href: "/menu",
      description: "loream ipsum",
    },
    {
      title: "menu links",
      href: "/menu/links",
      description: "loream ipsum",
    },
    {
      title: "menu types",
      href: "/menu/types",
      description: "loream ipsum",
    },
    {
      title: "menu link images",
      href: "/menu/link-images",
      description: "loream ipsum",
    },
  ],
  purcchase: [
    {
      title: "purcchase",
      href: "/purcchase",
      description: "loream ipsum",
    },
    {
      title: "purcchase items",
      href: "/purcchase/items",
      description: "loream ipsum",
    },
    {
      title: "purcchase types",
      href: "/purcchase/types",
      description: "loream ipsum",
    },
    {
      title: "invoice",
      href: "/invoice",
      description: "loream ipsum",
    },
    {
      title: "invoice types",
      href: "/invoice/type",
      description: "loream ipsum",
    },
    {
      title: "invoice templates",
      href: "/invoice/templates",
      description: "loream ipsum",
    },
  ],
} as MenuComponents;

enum accesses {
  read = 1,
  write = 2,
  delete = 4,
}

const isReadAccess = (val = 0) => {
  return (val & accesses.read) === accesses.read;
};

export function TopMenu({ children }: { children: JSX.Element }) {
  const { data: session, status } = useSession();
  const userId = session?.user.id ?? "";
  const rawUser = api.user.byId.useQuery({ id: userId });
  const userMenuItems = React.useMemo(() => {
    const privilages = !rawUser.data?.privilage
      ? {
          media: 1,
          screens: 1,
          branding: 1,
          cast: 1,
          dictionary: 1,
          menu: 1,
          purcchase: 1,
        }
      : rawUser.data.privilage;
    const menuItem: MenuComponents = {};

    if (isReadAccess(privilages.media)) menuItem.media = menuItems.media || [];
    if (isReadAccess(privilages.branding))
      menuItem.branding = menuItems.branding || [];
    if (isReadAccess(privilages.cast)) menuItem.cast = menuItems.cast || [];
    if (isReadAccess(privilages.screens))
      menuItem.screens = menuItems.screens || [];
    if (isReadAccess(privilages.dictionary))
      menuItem.dictionary = menuItems.dictionary || [];
    if (isReadAccess(privilages.menu)) menuItem.menu = menuItems.menu || [];
    if (isReadAccess(privilages.purcchase))
      menuItem.purcchase = menuItems.purcchase || [];

    return menuItem;
  }, [rawUser]);

  return (
    <NavigationMenu className="relative z-[1] flex w-screen justify-center">
      <Toaster />

      <NavigationMenuList className="center shadow-blackA4 m-0 flex list-none rounded-[6px] bg-white p-1 shadow-[0_2px_10px]">
        {Object.entries(userMenuItems).map(([key, components]) => (
          <NavigationMenuItem key={key}>
            <NavigationMenuTrigger className="text-foreground hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              {key}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-background data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute left-0 top-0 w-full sm:w-auto">
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <ThemeToggle />
        {children}
        {/* <AuthButtons /> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  const href = props.href || "/";
  return (
    <li className="bg-background">
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
          {...props}
          href={href}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
