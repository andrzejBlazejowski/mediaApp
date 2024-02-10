import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { auth } from "@media/auth";

import { AuthButtons, TopMenu } from "./_components/";
import { ThemeProvider } from "./_providers/themeProvider";
import { TRPCReactProvider } from "./_providers/trpcProviders";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <TRPCReactProvider headers={headers()}>
              <TopMenu>
                <AuthButtons />
              </TopMenu>

              {session ? (
                children
              ) : (
                <h1 className="ml-36 mt-36 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Please log in.
                </h1>
              )}
            </TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
