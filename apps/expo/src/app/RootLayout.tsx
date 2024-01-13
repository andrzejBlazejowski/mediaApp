import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";
import { Menu } from "./components/";

// This is the main layout of the app
// It wraps your pages with the providers they need
export const RootLayout = () => {
  return (
    <TRPCProvider>
      {/*
              The Stack component displays the current page.
              It also allows you to configure your screens
            */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f472b6",
          },
        }}
      />
      <Menu />
      <StatusBar />
    </TRPCProvider>
  );
};
