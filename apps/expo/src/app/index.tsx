import React, { useMemo } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Badge, Drawer, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

const Index = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        {/* Changes page title visible on the header */}
        <Stack.Screen options={{ title: "Home Page" }} />
        <View className="h-full w-full p-4">
          <Text>index</Text>
          <Badge>4</Badge>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Index;
