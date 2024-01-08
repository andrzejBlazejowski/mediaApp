import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { Stack, useGlobalSearchParams } from "expo-router";

import Asset from "~/app/components/Asset/Asset";
import { useListData } from "~/app/hooks/";

export default function Post() {
  const { id } = useGlobalSearchParams();
  const { images, firstImageUrl, isMoreThanOneImage, name, title, content } =
    useArticleData(typeof id === "string" ? id : "1");

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: name }} />
      <ScrollView>
        {lists?.map(({ assets, type, title, listId }) => (
          <>
            <Text variant="">{title}</Text>
            <ScrollView
              horizontal={true}
              key={listId + title + type}
              style={[styles.grid]}
            >
              {assets.map(({ name, url, id }) => {
                return (
                  <View key={listId + title + name + id} style={styles.item}>
                    <Asset
                      title={name}
                      url={url}
                      isInList
                      type={type}
                      onPress={() => router.replace(`/vod/player/${id}`)}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </>
        ))}
      </ScrollView>
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
});
