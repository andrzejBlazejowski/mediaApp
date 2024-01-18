import { auth } from "@media/auth";

import { SignIn, SignOut } from "~/components/auth";

export async function AuthButtons() {
  const session = await auth();

  if (!session) {
    return (
      <SignIn
        provider="discord"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        Sign in with Discord
      </SignIn>
    );
  }

  return (
    <SignOut className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
      Sign out
    </SignOut>
  );
}
