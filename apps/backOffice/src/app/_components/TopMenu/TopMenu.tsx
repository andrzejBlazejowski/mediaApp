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
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { api } from "~/utils/api";
import { ThemeToggle } from "../ThemeToggle";

type MenuComponents = Record<string, MenuComponent[]>;

interface MenuComponent {
  title: string;
  href: string;
  description: string;
}

const menuComponents = {
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
};

export function useMenuData() {
  const platform = "android";

  const rawData = api.expo.getMenu.useQuery({ platform });
  const { data } = rawData;

  interface MenuItem {
    name: string;
    id: number;
    url: string;
    type: "article" | "vod/list" | "vod/grid";
  }

  return React.useMemo(() => {
    const menuItems: MenuItem[] = data?.menuPlatforms[0]
      ? data.menuPlatforms[0].menu.menuLinks.map((menuLink) => {
          return {
            name: menuLink.name ?? menuLink.id.toString(),
            id: menuLink.id,
            url: menuLink.menuLinkImage.image.url,
            type: "article",
          };
        })
      : [];
    const title: string = data?.menuPlatforms[0]?.menu.name ?? "";
    return { menuItems, title };
  }, [data]);
}

export function TopMenu({ children }: { children: JSX.Element }) {
  const { menuItems, title } = useMenuData();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.entries(menuComponents).map(([key, components]) => (
          <NavigationMenuItem key={key}>
            <NavigationMenuTrigger className="text-foreground">
              {key}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
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
    <li>
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
