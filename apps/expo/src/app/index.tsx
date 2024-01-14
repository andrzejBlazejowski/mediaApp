import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Google from "expo-auth-session/providers/google";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  // const [userInfo, setUserInfo] = useState(null);
  // const [request, response, loginRequest] = Google.useAuthRequest({
  //   androidClientId:
  //     "615555735082-c1n2rq3v0id50f2lvgduc4s45l36kjks.apps.googleusercontent.com",
  // });

  AsyncStorage;
  return (
    <SafeAreaView>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        {/* {!userInfo && (
          <Button
            mode="contained"
            icon="google"
            onPress={() => loginRequest({})}
          >
            Please Login
          </Button>
        )} */}
        {<Text variant="displaySmall"> Logged In :D</Text>}
      </View>
    </SafeAreaView>
  );
};

export default Index;
