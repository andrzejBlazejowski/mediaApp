import type { ReactNode } from "react";
import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import { useBrandingData } from "~/app/hooks";

export function ThemeProvider({ children }: { children?: ReactNode }) {
  const { images, colors } = useBrandingData("client #1 summer theme");

  console.warn(DefaultTheme.colors.primary);
  console.warn(colors.primary);
  console.warn(colors);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
    },
    images,
  };

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
