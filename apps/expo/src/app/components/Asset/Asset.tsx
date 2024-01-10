import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import { GridAssetTypeEnum } from "~/app/utils";
import type { ListAssetTypeEnum } from "~/app/utils";

interface props {
  url: string;
  title: string;
  type: GridAssetTypeEnum | ListAssetTypeEnum;
  onPress?: () => void;
  isInList?: boolean;
}

export function Asset({ url, title, onPress, type, isInList }: props) {
  return (
    <Card onPress={onPress}>
      {url && (
        <Card.Cover
          key="cover"
          style={
            type === GridAssetTypeEnum.COVER
              ? styles.coverImage
              : styles.frameImage
          }
          source={{ uri: url }}
        />
      )}
      <Card.Title titleVariant="titleMedium" key="title" title={title} />
    </Card>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 4,
  },
  coverImage: {
    height: (Dimensions.get("window").width / 2 - 40) * 0.75,
    padding: 4,
  },
  frameImage: {
    height: (Dimensions.get("window").width / 2 - 40) * 1.41,
    padding: 4,
  },
  ListCoverImage: {
    height: (Dimensions.get("window").width / 2 - 60) * 0.75,
    padding: 4,
  },
  ListFrameImage: {
    height: (Dimensions.get("window").width / 2 - 60) * 1.41,
    padding: 4,
  },
});
