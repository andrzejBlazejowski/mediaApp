import React from "react";
import { Text, View } from "react-native";
import { Badge } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Index = () => {
  return (
    <SafeAreaView>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text>index</Text>
        <Badge>4</Badge>
      </View>
    </SafeAreaView>
  );
};

export default Index;
