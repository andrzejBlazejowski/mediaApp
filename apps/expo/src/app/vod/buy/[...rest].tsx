import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { api } from "~/utils/api";

export default function DetailsPage() {
  const router = useRouter();
  const utils = api.useUtils();
  const invalidate = utils.expo.getMediaDetails.invalidate;
  const { mutateAsync, error } = api.expo.buyMedia.useMutation({
    async onSuccess() {
      await invalidate();
      onCancel();
    },
  });
  const { rest } = useGlobalSearchParams();
  const [id, name, price] =
    rest?.length && rest.length >= 1 ? rest : ["1", "", ""];

  const onBuy = async () => {
    await mutateAsync({ mediaId: parseInt(id ?? "1") });
  };
  const onCancel = () => {
    router.push(`/vod/details/${id}`);
  };
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "buy video" }} />
      <View style={styles.container}>
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
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    height: "100%",
    gap: 25,
  },
});
