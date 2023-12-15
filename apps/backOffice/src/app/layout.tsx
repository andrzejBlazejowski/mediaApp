import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { TopMenu } from "./_components/";
import { ThemeProvider } from "./_providers/themeProvider";
import { TRPCReactProvider } from "./_providers/trpcProviders";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const dynamic = "force-dynamic";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TRPCReactProvider headers={headers()}>
            <TopMenu />
            {props.children}
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
