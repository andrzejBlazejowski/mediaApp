import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@media/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@media/api";
