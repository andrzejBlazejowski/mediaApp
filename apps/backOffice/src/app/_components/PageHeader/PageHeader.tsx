"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { ArrowRightIcon, Link } from "lucide-react";
import Balance from "react-wrap-balancer";

function AppHeader() {
  return (
    <PageHeader className="page-header pb-8">
      <Link
        href="/docs/changelog"
        className="bg-muted inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium"
      >
        🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span className="sm:hidden">Style, a new CLI and more.</span>
        <span className="hidden sm:inline">
          Introducing Style, a new CLI and more.
        </span>
        <ArrowRightIcon className="ml-1 h-4 w-4" />
      </Link>
      <PageHeaderHeading className="hidden md:block">
        Check out some examples.
      </PageHeaderHeading>
      <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
      <PageHeaderDescription>
        Dashboard, cards, authentication. Some examples built using the
        components. Use this as a guide to build your own.
      </PageHeaderDescription>
      <section className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
        <Link href="/docs" className={cn(buttonVariants(), "rounded-[6px]")}>
          Get Started
        </Link>
        <Link
          href="/components"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-[6px]",
          )}
        >
          Components
        </Link>
      </section>
    </PageHeader>
  );
}

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]",
        className,
      )}
      {...props}
    />
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn(
        "text-muted-foreground max-w-[750px] text-lg sm:text-xl",
        className,
      )}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription, AppHeader };
