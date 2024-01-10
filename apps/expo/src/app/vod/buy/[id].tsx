import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Stack, useGlobalSearchParams } from "expo-router";

export default function DetailsPage() {
  const { id } = useGlobalSearchParams();

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "buy video" }} />
      <ScrollView>
        <Text>buy video id: {id}</Text>
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
