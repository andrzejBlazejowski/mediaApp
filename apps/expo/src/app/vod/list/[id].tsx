import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { Asset } from "~/app/components/";
import { useListData } from "~/app/hooks/";

export default function ListPage() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const { lists, title } = useListData(typeof id === "string" ? id : "1");

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title }} />
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
                      onPress={() => router.replace(`/vod/details/${id}`)}
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
    width: Dimensions.get("window").width / 2 - 55,
    padding: 4,
  },
});
