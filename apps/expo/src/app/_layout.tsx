import React from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";
import { Menu, ThemeProvider } from "./components/";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <TRPCProvider>
      <ThemeProvider>
        {/*
        The Stack component displays the current page.
        It also allows you to configure your screens 
      */}
        <View style={styles.container}>
          <View style={styles.content}>
            <Stack />
          </View>
          <View style={styles.menu}>
            <Menu />
          </View>
        </View>
        <StatusBar />
      </ThemeProvider>
    </TRPCProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 0.8,
  },
  menu: {
    flex: 0.2,
  },
});
