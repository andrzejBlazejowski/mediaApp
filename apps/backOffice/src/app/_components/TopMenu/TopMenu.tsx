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
import { useTheme } from "next-themes";

import { cn } from "~/app/_lib";
import { api } from "~/utils/api";
import { ThemeToggle } from "../ThemeToggle";
import { Toaster } from "../ui/toaster";

export type MenuComponents = Record<string, MenuComponent[]>;

export interface MenuComponent {
  title: string;
  href: string;
  description?: string;
}

const menuItems: MenuComponents = {
  media: [
    {
      title: "media",
      href: "/media",
    },
    {
      title: "video contents",
      href: "/media/video-contents",
    },
    {
      title: "video content types",
      href: "/media/video-content-types",
    },
    {
      title: "media categoriess",
      href: "/media/media-categories",
    },
    {
      title: "media images",
      href: "/media/media-images",
    },
    {
      title: "media images types",
      href: "/media/media-image-types",
    },
    {
      title: "media view Impresions",
      href: "/media/media-view-impressions",
    },
    {
      title: "media list",
      href: "/media/list",
    },
    {
      title: "media list medias",
      href: "/media/list/medias",
    },
    {
      title: "media list medias type",
      href: "/media/list/medias-type",
    },
    {
      title: "video",
      href: "/video",
    },
    {
      title: "image",
      href: "/dictionary/image",
    },
  ],
  branding: [
    {
      title: "brandings",
      href: "/branding",
    },
    {
      title: "branding colors",
      href: "/branding/colors",
    },
    {
      title: "branding color types",
      href: "/branding/color-types",
    },
    {
      title: "branding images",
      href: "/branding/images",
    },
    {
      title: "branding image types",
      href: "/branding/image-types",
    },
  ],
  cast: [
    {
      title: "cast members",
      href: "/cast/members",
    },
    {
      title: "cast member images",
      href: "/cast/members-images",
    },
    {
      title: "cast roles",
      href: "/cast/roles",
    },
    {
      title: "media cast memberss",
      href: "/cast/media-cast-members",
    },
    {
      title: "people",
      href: "/cast/people",
    },
  ],
  screens: [
    {
      title: "screens",
      href: "/screens",
    },
    {
      title: "screens types",
      href: "/screens/types",
    },
    {
      title: "article screens",
      href: "/screens/article",
    },
    {
      title: "article ccreen images",
      href: "/screens/article/images",
    },
    {
      title: "vod screenss",
      href: "/screens/vod",
    },
    {
      title: "vod screen types",
      href: "/screens/vod/types",
    },
    {
      title: "vodScreenMediaLists",
      href: "/screens/vod/media-lists",
    },
  ],
  dictionary: [
    {
      title: "client app",
      href: "/dictionary/client-app",
    },
    {
      title: "back office",
      href: "/dictionary/back-app",
    },
    {
      title: "countries",
      href: "/dictionary/countries",
    },
    {
      title: "genres",
      href: "/dictionary/genres",
    },
    {
      title: "platforms",
      href: "/platforms",
    },
    {
      title: "platform menus",
      href: "/platforms/menu",
    },
  ],
  menu: [
    {
      title: "menu",
      href: "/menu",
    },
    {
      title: "menu links",
      href: "/menu/links",
    },
    {
      title: "menu types",
      href: "/menu/types",
    },
    {
      title: "menu link images",
      href: "/menu/link-images",
    },
  ],
  purcchase: [
    {
      title: "purcchase",
      href: "/purcchase",
    },
    {
      title: "purcchase items",
      href: "/purcchase/items",
    },
    {
      title: "purcchase types",
      href: "/purcchase/types",
    },
    {
      title: "invoice",
      href: "/invoice",
    },
    {
      title: "invoice types",
      href: "/invoice/type",
    },
    {
      title: "invoice templates",
      href: "/invoice/templates",
    },
    {
      title: "generate invoice",
      href: "/generate/invoice",
      description: "generate invoice",
    },
    {
      title: "download summary",
      href: "/generate/purchase-list",
      description: "generate purchase list and summary",
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
  const { theme, setTheme } = useTheme();

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

      <NavigationMenuList className="center shadow-blackA4 rounded-[6px]p-1 m-0 flex list-none shadow-[0_2px_10px]">
        {Object.entries(userMenuItems).map(([key, components]) => (
          <NavigationMenuItem key={key}>
            <NavigationMenuTrigger className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              {key}
            </NavigationMenuTrigger>
            <NavigationMenuContent className=" absolute left-0 top-0 w-full sm:w-auto">
              <ul
                className={
                  (theme === "dark"
                    ? "bg-black text-white "
                    : "bg-slate-50 text-black ") +
                  "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] "
                }
              >
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
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
          {...props}
          href={href}
        >
          <div className="text-sm font-medium leading-none ">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
