import { useEffect, useMemo } from "react";

import { api } from "~/utils/api";

export function useBrandingData(client: string) {
  if (!client) throw new Error("unreachable");
  const { data } = api.expo.getBranding.useQuery({
    client,
  });
  return useMemo(() => {
    const colors = data
      ? data.brandingColors.reduce(
          (accumulator, color) => {
            const key = color?.brandingColorType?.name ?? color.id.toString();

            accumulator[key] = color.value ?? "white";
            return accumulator;
          },
          {} as Record<string, string>,
        )
      : {};
    const images = data
      ? data.brandingImages.reduce(
          (accumulator, image) => {
            const key = image.brandingImageType?.name ?? image.id.toString();

            accumulator[key] = image?.image?.url ?? "none";
            return accumulator;
          },
          {} as Record<string, string>,
        )
      : {};
    return { colors, images };
  }, [data]);
}
