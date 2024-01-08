import { useEffect, useRef } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Stack, useGlobalSearchParams } from "expo-router";

import { usePlayerData } from "~/app/hooks/";

export default function PlayerPage() {
  const videoRef = useRef(null);
  const { id } = useGlobalSearchParams();
  const { title, url } = usePlayerData(typeof id === "string" ? id : "1");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
      videoRef.current.playAsync();
    }
  }, [videoRef]);

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title }} />
      <View>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{
            uri: url,
          }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 4,
  },
  item: {
    height: Dimensions.get("window").width / 2,
    width: "50%",
    padding: 4,
  },
  photo: {
    height: "100%",
    width: "100%",
    padding: 4,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
