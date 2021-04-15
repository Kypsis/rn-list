import React, { memo } from "react"
import LinearGradient from "react-native-linear-gradient"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Pressable, ImageBackground } from "react-native"

import CardInfo from "./card-info"
import { radius } from "../../theme"
import { DataModel } from "../../data/models/video.model"

const VideoCard: React.FC<{ cardData: DataModel }> = ({ cardData }) => {
  const navigation = useNavigation()
  const [opacity, setOpacity] = React.useState(1)

  const { dateTime, fileName, videoUrl, thumbnailUrl, durationInSeconds } = cardData

  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1)
    }
  })

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        setOpacity(0)
        navigation.navigate("Video", { dateTime, fileName, videoUrl })
      }}
    >
      <View style={[styles.container, { opacity }]}>
        <ImageBackground
          source={{ uri: thumbnailUrl }}
          style={styles.image}
          borderRadius={radius.large}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
            style={styles.gradient}
          >
            <CardInfo
              fileName={fileName}
              dateTime={dateTime}
              durationInSeconds={durationInSeconds}
            />
          </LinearGradient>
        </ImageBackground>
      </View>
    </Pressable>
  )
}

export default memo(VideoCard)

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.large,
    height: 220,
  },

  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    resizeMode: "cover",
    width: undefined,
  },
})
