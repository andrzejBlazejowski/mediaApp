import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "media.app.pinz",
  slug: "media.app.pinz",
  scheme: "mediaApp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/mediaAppLogoExtended.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/mediaAppLogoExtended.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "media.app.pinz",
    supportsTablet: true,
  },
  android: {
    //client id : 615555735082-c1n2rq3v0id50f2lvgduc4s45l36kjks.apps.googleusercontent.com
    package: "media.app.pinz",
    adaptiveIcon: {
      foregroundImage: "./assets/mediaAppLogoExtended.png",
      backgroundColor: "#1F104A",
    },
  },
  // extra: {
  //   eas: {
  //     projectId: "b65799ea-8718-42d5-8a97-4040b2f44c10",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
