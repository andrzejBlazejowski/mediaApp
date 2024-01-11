import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

export default function DetailsPage() {
  const router = useRouter();
  const { rest } = useGlobalSearchParams();
  const [id, name, price] =
    rest?.length && rest.length >= 1 ? rest : ["1", "", ""];

  const onBuy = () => {
    router.replace(`/vod/buy/${mediaId}/${title}`);
  };
  const onCancel = () => {
    router.replace(`/vod/buy/${mediaId}/${title}`);
  };
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "buy video" }} />
      <View>
        <Text variant="titleLarge">
          Are you sure you want to buy access to {name ? name : "this"} video
          {price ? `, for ${price} usd` : ""}?
        </Text>
        <Button mode="contained" onPress={onBuy}>
          Yes, I want to buy
        </Button>
        <Button mode="elevated" onPress={onCancel}>
          Cancel
        </Button>
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
});
