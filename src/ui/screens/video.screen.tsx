import React from "react"
import { StyleSheet, View } from "react-native"
import Video from "react-native-video"
import { VideoModel } from "../../data/models/video.model"

const VideoScreen: React.FC<{
  route: any
  navigation: any
}> = ({ route }) => {
  const { videoUrl } = route.params as VideoModel

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Video
        source={{
          uri: videoUrl,
        }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
      />
    </View>
  )
}

export default VideoScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  },
})
