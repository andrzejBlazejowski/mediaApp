import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { useDetailsData } from "../../hooks";

export default function DetailsPage() {
  const { id } = useGlobalSearchParams();
  const router = useRouter();
  const {
    imgUrl,
    videoId,
    trailerId,
    mediaId,
    title,
    content,
    castMembers,
    isFree,
    isBought,
  } = useDetailsData(typeof id === "string" ? id : "1");

  const buy = () => {
    router.push(`/vod/buy/${mediaId}/${title}`);
  };
  const watchMain = () => {
    router.push(`/vod/player/${videoId}`);
  };
  const watchTrailer = () => {
    router.push(`/vod/player/${trailerId}`);
  };

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: title }} />
      <ScrollView>
        <Card>
          {imgUrl && <Card.Cover key="cover" source={{ uri: imgUrl }} />}
          <Card.Title titleVariant="displaySmall" key="title" title={title} />
          <Card.Actions>
            {!isFree && !isBought && <Button onPress={buy}>Buy</Button>}
            {trailerId && <Button onPress={watchTrailer}>Watch Trailer</Button>}
            {(isFree || isBought) && videoId && (
              <Button onPress={watchMain}>Watch Main</Button>
            )}
          </Card.Actions>
          <Card.Content key="castMembers">
            <Text variant="bodyMedium">{content}</Text>
            {castMembers && (
              <View style={[styles.grid]}>
                {castMembers.map((castMember) => (
                  <Card key={castMember.id} style={styles.castCard}>
                    {castMember.image && (
                      <Card.Cover
                        key="cover"
                        source={{ uri: castMember.image }}
                      />
                    )}
                    <Card.Title
                      titleVariant="titleSmall"
                      key="title"
                      title={castMember.name}
                    />
                    <Card.Content>
                      {castMember.role && (
                        <Text variant="bodySmall">{castMember.role}</Text>
                      )}
                      {castMember.gender && (
                        <Text variant="bodySmall">
                          {castMember.gender === "1" ? "female" : "male"}
                        </Text>
                      )}
                      {castMember.birthDate && (
                        <Text variant="bodySmall">{castMember.birthDate}</Text>
                      )}
                      {castMember.deathDate && (
                        <Text variant="bodySmall">{castMember.deathDate}</Text>
                      )}
                      {castMember.country && (
                        <Text variant="bodySmall">{castMember.country}</Text>
                      )}
                    </Card.Content>
                  </Card>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>
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
  castCard: {
    width: "46%",
    padding: 4,
    margin: "1%",
  },
});
