import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { Asset } from "~/app/components/";
import { useGridData } from "../../hooks";

export default function GridPage() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const { assets, title, assetsType } = useGridData(
    typeof id === "string" ? id : "1",
  );

  return (
    <SafeAreaView>
      <Stack.Screen key="grid stack screen" options={{ title: title ?? "" }} />
      <ScrollView>
        {assets && (
          <View style={[styles.grid]}>
            {assets.map((asset) => (
              <View key={asset.id + (id?.toString() ?? "")} style={styles.item}>
                <Asset
                  title={asset.name}
                  url={asset.url ?? ""}
                  type={assetsType}
                  onPress={() => router.push(`/vod/details/${asset.id}`)}
                />
              </View>
            ))}
          </View>
        )}
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
    width: "50%",
    padding: 4,
  },
});
