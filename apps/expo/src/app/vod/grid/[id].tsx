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

import { useArticleData } from "../../hooks";

export default function Post() {
  const { id } = useGlobalSearchParams();
  const { assets, title } = useGridData(typeof id === "string" ? id : "1");

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: name }} />
      <ScrollView>
        {images && isMoreThanOneImage && (
          <View style={[styles.grid]}>
            {images.map((uri) => (
              <View key={uri} style={styles.item}>
                <Card>
                  {firstImageUrl && (
                    <Card.Cover key="cover" source={{ uri: firstImageUrl }} />
                  )}
                  <Card.Title
                    titleVariant="displaySmall"
                    key="title"
                    title={title}
                  />
                  <Card.Content key="cover">
                    <Text variant="bodyMedium">{content}</Text>
                  </Card.Content>
                </Card>
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
