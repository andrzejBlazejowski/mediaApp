import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import * as Crypto from "expo-crypto";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { Asset } from "~/app/components/";
import { useListData } from "~/app/hooks/";

export default function ListPage() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const { lists, title } = useListData(typeof id === "string" ? id : "1");
  return (
    <SafeAreaView>
      <Stack.Screen key="list stack screen" options={{ title: title ?? "" }} />
      <ScrollView key="list scroll view">
        {lists?.map(({ assets, type, title, listId }) => {
          return (
            <>
              <Text key="list title" variant="bodyLarge">
                {title}
              </Text>
              <ScrollView
                horizontal={true}
                key={listId + title + type + Crypto.randomUUID()}
                style={[styles.grid]}
              >
                {assets.map(({ name, url, id }) => {
                  return (
                    <View
                      key={listId + title + name + id + Crypto.randomUUID()}
                      style={styles.item}
                    >
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
