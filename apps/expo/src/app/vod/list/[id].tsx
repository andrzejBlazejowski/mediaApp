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

  console.log("lists");
  console.log(lists);

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: title ?? "" }} />
      <ScrollView>
        {lists?.map(({ assets, type, title, listId }) => {
          console.log("assets : ");
          console.log(assets);
          return (
            <>
              <Text variant="bodyLarge">{title}</Text>
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
                        url={url ?? ""}
                        isInList
                        type={type}
                        onPress={() => router.push(`/vod/details/${id}`)}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </>
          );
        })}
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
