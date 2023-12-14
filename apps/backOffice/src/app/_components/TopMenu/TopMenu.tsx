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
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
      href: "screens/vod",
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
};

export function TopMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.entries(menuComponents).map(([key, components]) => (
          <NavigationMenuItem key={key}>
            <NavigationMenuTrigger>{key}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
