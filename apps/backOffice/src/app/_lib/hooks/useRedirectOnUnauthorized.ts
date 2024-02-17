import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TRPCClientError, TRPCClientErrorLike } from "@trpc/client";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";

export function useRedirectOnUnauthorized(
  rawData: UseTRPCQueryResult<any, TRPCClientErrorLike<any>>,
) {
  const router = useRouter();

  useEffect(() => {
    if (rawData?.error?.data?.httpStatus === 500) {
      router.push("/not_authorized");
    }
  }, [rawData]);
}
