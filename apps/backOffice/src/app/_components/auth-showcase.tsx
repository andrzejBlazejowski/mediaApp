import Link from "next/link";

import { auth } from "@media/auth";

import { SignIn, SignOut } from "~/components/auth";

export async function AuthButtons() {
  const session = await auth();

  if (!session) {
    return (
      <SignIn
        provider="discord"
        className="rounded-full bg-white/10 py-3 no-underline transition hover:bg-white/20"
      >
        <div className="text-sm font-medium leading-none">
          {" "}
          Sign in with Discord
        </div>
      </SignIn>
    );
  }

  return (
    <>
      {session.user.id === "c5637392-fc8c-48a6-a61f-3f2e0d80fcca" && (
        <Link
          className="text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
          href="/privilages"
        >
          <div className="text-sm font-medium leading-none">privilages</div>
        </Link>
      )}
      <SignOut className="rounded-full bg-white/10  py-3  no-underline transition hover:bg-white/20">
        <div className="text-sm font-medium leading-none">Sign out</div>
      </SignOut>
    </>
  );
}
