import React from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Pressable, Dimensions, Image } from "react-native"

import { VideoModel } from "../../data/models/video.model"

const VideoCard: React.FC<{ cardData: VideoModel }> = ({ cardData }) => {
  const [opacity, setOpacity] = React.useState(1)
  const navigation = useNavigation()

  const { dateTime, fileName, videoUrl, thumbnailUrl } = cardData

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
        <Image source={{ uri: thumbnailUrl }} style={styles.image} />
      </View>
    </Pressable>
  )
}

export default VideoCard

/* const styles = StyleSheet.create({
  container: {
    height: 256.0,
    backgroundColor: 'white',
    borderRadius: 12.0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    padding: 24.0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12.0,
  },
}); */

const margin = 24
const borderRadius = 12
const width = Dimensions.get("window").width - margin * 2

const styles = StyleSheet.create({
  container: {
    borderRadius,
    height: (width * 9) / 16,
    marginTop: 16,
    width,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,
    height: undefined,
    resizeMode: "cover",
    width: undefined,
  },
})
