import type { ComponentProps } from "react";

import type { OAuthProviders } from "@media/auth";
import { CSRF_experimental } from "@media/auth";

export function SignIn({
  provider,
  ...props
}: { provider: OAuthProviders } & ComponentProps<"button">) {
  return (
    <form className="" action={`/api/auth/signin/${provider}`} method="post">
      <button {...props} />
      <CSRF_experimental />
    </form>
  );
}

export function SignOut(props: ComponentProps<"button">) {
  return (
    <form action="/api/auth/signout" method="post">
      <button {...props} />
      <CSRF_experimental />
    </form>
  );
}
